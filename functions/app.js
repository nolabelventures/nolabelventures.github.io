const express = require('express')
const { AuthorizationCode } = require('simple-oauth2')
const randomstring = require('randomstring')

// Netlify/Decap CMS GitHub OAuth provider. `config` is resolved per request
// so that Firebase params/secrets are only read at runtime, never at load.

// The only page allowed to receive a token: the CMS at nolabel.ventures/admin.
const CMS_ORIGIN = 'https://nolabel.ventures'
// Enough for the CMS to edit this public repo; never full `repo` (all private repos).
const SCOPES = 'public_repo,read:user'
// Firebase only forwards a cookie named __session to functions.
const STATE_COOKIE = '__session'
const STATE_MAX_AGE = 10 * 60

// The popup tells the CMS it is ready, and hands over the result only to a reply from the
// CMS window that opened it, on the CMS origin. The message is JSON-encoded with `<` escaped
// so nothing in it can close the script tag.
function getScript(mess, content) {
  const message = JSON.stringify(`authorization:github:${mess}:${JSON.stringify(content)}`)
    .replace(/</g, '\\u003c')
  const origin = JSON.stringify(CMS_ORIGIN)
  return `<!doctype html><html><body><script>
  (function() {
    var origin = ${origin}
    function receiveMessage(e) {
      if (e.origin !== origin || e.source !== window.opener || e.data !== "authorizing:github") return
      window.removeEventListener("message", receiveMessage, false)
      window.opener.postMessage(${message}, origin)
    }
    if (!window.opener) return
    window.addEventListener("message", receiveMessage, false)
    window.opener.postMessage("authorizing:github", origin)
    })()
  </script></body></html>`
}

function readCookie(req, name) {
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim())
  }
  return ''
}

function stateCookie(value, maxAge) {
  return `${STATE_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`
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
    const state = randomstring.generate(32)
    const authorizeParams = { scope: SCOPES, state }
    // Only send redirect_uri when configured; GitHub otherwise uses the
    // callback URL registered on the OAuth app.
    if (config.redirect_url) authorizeParams.redirect_uri = config.redirect_url
    const authorizationUri = client.authorizeURL(authorizeParams)
    res.set('Cache-Control', 'no-store')
    res.set('Set-Cookie', stateCookie(state, STATE_MAX_AGE))
    res.redirect(authorizationUri)
  })

  app.get('/callback', async (req, res) => {
    res.set('Cache-Control', 'no-store')
    res.set('Referrer-Policy', 'no-referrer')
    // Single-use: the state cookie is cleared whatever happens next.
    const expected = readCookie(req, STATE_COOKIE)
    res.set('Set-Cookie', stateCookie('', 0))
    if (!expected || req.query.state !== expected) {
      return res.send(getScript('error', { message: 'Login expired or did not start here. Please try again.' }))
    }
    const config = getConfig()
    const client = createClient(config)
    const provider = config.provider || 'github'
    const tokenParams = { code: req.query.code }
    if (provider === 'gitlab') {
      tokenParams.redirect_uri = config.redirect_url
    }

    try {
      const accessToken = await client.getToken(tokenParams)
      const token = accessToken.token || {}
      // GitHub answers 200 with an error body (e.g. bad_verification_code or
      // incorrect_client_credentials) instead of a 4xx, so check for the token.
      if (!token.access_token) {
        throw new Error(token.error_description || token.error || 'No access token in response')
      }
      return res.send(getScript('success', {
        token: token.access_token,
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
