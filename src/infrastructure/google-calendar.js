/* eslint-disable camelcase */
const { google } = require('googleapis')

/**
 * Returns an OAuth2 client with the given credentials and token
 * @param {Object} token The token
 * @param {Object} credentials The authorization client credentials.
 */

const getOAuth2Client = (token, credentials) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0])
  oAuth2Client.setCredentials(token)
  return oAuth2Client
}

/**
 * Returns the events of a google calendar
 * @param {OAuth2Client} auth required to authenticate
 * @param {String} initialTime from when to start looking
 * @param {String} finalTime to when to stop looking
 */
const getCalendarEvents = async (auth, initialTime, finalTime) => {
  const calendar = google.calendar({ version: 'v3', auth })
  const response = await calendar.freebusy.query({
    resource: {
      items: [{ id: 'primary' }],
      timeMin: initialTime,
      timeMax: finalTime,

    },
  })

  return response.data.calendars.primary.busy
}

module.exports = {
  getCalendarEvents,
  getOAuth2Client,
}
