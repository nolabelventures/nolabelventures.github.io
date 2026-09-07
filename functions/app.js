const express = require('express')
const { AuthorizationCode } = require('simple-oauth2')
const randomstring = require('randomstring')

// Netlify/Decap CMS GitHub OAuth provider. `config` is resolved per request
// so that Firebase params/secrets are only read at runtime, never at load.
function getScript(mess, content) {
  return `<!doctype html><html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${mess}:${JSON.stringify(content)}',
        e.origin
      )
      window.removeEventListener("message",receiveMessage,false);
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`
}

function createClient(config) {
  return new AuthorizationCode({
    client: {
      id: config.client_id,
      secret: config.client_secret,
    },
    auth: {
      tokenHost: config.git_hostname || 'https://github.com',
      tokenPath: config.token_path || '/login/oauth/access_token',
      authorizePath: config.authorize_path || '/login/oauth/authorize',
    },
    options: {
      // GitLab wants client credentials in the request body; GitHub accepts either.
      authorizationMethod: config.provider === 'gitlab' ? 'body' : 'header',
    },
  })
}

function createApp(getConfig) {
  const app = express()

  app.get('/auth', (req, res) => {
    const config = getConfig()
    const client = createClient(config)
    const authorizeParams = {
      scope: config.scopes || 'repo,user',
      state: randomstring.generate(32),
    }
    // Only send redirect_uri when configured; GitHub otherwise uses the
    // callback URL registered on the OAuth app.
    if (config.redirect_url) authorizeParams.redirect_uri = config.redirect_url
    const authorizationUri = client.authorizeURL(authorizeParams)
    res.redirect(authorizationUri)
  })

  app.get('/callback', async (req, res) => {
    const config = getConfig()
    const client = createClient(config)
    const provider = config.provider || 'github'
    const tokenParams = { code: req.query.code }
    if (provider === 'gitlab') {
      tokenParams.redirect_uri = config.redirect_url
    }

    try {
      const accessToken = await client.getToken(tokenParams)
      return res.send(getScript('success', {
        token: accessToken.token.access_token,
        provider,
      }))
    } catch (error) {
      console.error('Access Token Error', error.message)
      return res.send(getScript('error', { message: error.message }))
    }
  })

  app.get('/success', (req, res) => {
    res.send('')
  })

  app.get('/', (req, res) => {
    res.redirect(301, '/oauth/auth')
  })

  return app
}

module.exports = { createApp }
