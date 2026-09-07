const functions = require('firebase-functions/v1')
const { defineString, defineSecret } = require('firebase-functions/params')
const { createApp } = require('./app')

// Configuration moved from the retired functions.config() API to params.
// Set OAUTH_CLIENT_ID (and any overrides) in functions/.env; the client
// secret lives in Secret Manager: `firebase functions:secrets:set OAUTH_CLIENT_SECRET`.
const clientId = defineString('OAUTH_CLIENT_ID')
const clientSecret = defineSecret('OAUTH_CLIENT_SECRET')
const provider = defineString('OAUTH_PROVIDER', { default: 'github' })
const gitHostname = defineString('OAUTH_GIT_HOSTNAME', { default: 'https://github.com' })
const tokenPath = defineString('OAUTH_TOKEN_PATH', { default: '/login/oauth/access_token' })
const authorizePath = defineString('OAUTH_AUTHORIZE_PATH', { default: '/login/oauth/authorize' })
const redirectUrl = defineString('OAUTH_REDIRECT_URL', { default: '' })
const scopes = defineString('OAUTH_SCOPES', { default: 'repo,user' })

const app = createApp(() => ({
  client_id: clientId.value(),
  client_secret: clientSecret.value(),
  provider: provider.value(),
  git_hostname: gitHostname.value(),
  token_path: tokenPath.value(),
  authorize_path: authorizePath.value(),
  redirect_url: redirectUrl.value() || undefined,
  scopes: scopes.value(),
}))

exports.oauth = functions
  .runWith({ secrets: [clientSecret] })
  .https.onRequest(app)
