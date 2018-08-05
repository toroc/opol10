const WAVEBOX_CONTENT_IMPL_ENDPOINTS = {
  NOTIFICATION: 'Notification.js',
  CHROME: 'Chrome.js',
  NAVIGATOR: 'Navigator.js',
  WAVEBOX_API: 'WaveboxApi.js',
  WINDOW_DIALOGS: 'NativeWindowDialogs.js',

  ONEDRIVE_WINDOW_OPEN: 'OnedriveWindowOpen.js',
  GOOGLE_MAIL_WINDOW_OPEN: 'GoogleMailWindowOpen.js',
  GOOGLE_CHAT_WINDOW_OPEN: 'GoogleChatWindowOpen.js'
}
const VALID_WAVEBOX_CONTENT_IMPL_ENDPOINTS = new Set(Array.from(Object.keys(WAVEBOX_CONTENT_IMPL_ENDPOINTS).map((k) => WAVEBOX_CONTENT_IMPL_ENDPOINTS[k])))

module.exports = {
  // Wavebox API Implementations
  WAVEBOX_CONTENT_IMPL_ENDPOINTS: WAVEBOX_CONTENT_IMPL_ENDPOINTS,
  VALID_WAVEBOX_CONTENT_IMPL_ENDPOINTS: VALID_WAVEBOX_CONTENT_IMPL_ENDPOINTS,

  // Chrome
  CR_EXTENSION_PROTOCOL: 'chrome-extension',
  CR_EXTENSION_BG_PARTITION_PREFIX: 'persist:__chrome_extension:',
  CR_RUNTIME_ENVIRONMENTS: {
    CONTENTSCRIPT: 'CONTENTSCRIPT',
    BACKGROUND: 'BACKGROUND',
    HOSTED: 'HOSTED'
  },
  CR_STORAGE_TYPES: {
    LOCAL: 'LOCAL',
    SYNC: 'SYNC'
  },
  CR_CONTENT_SCRIPT_XHR_ACCEPT_PREFIX: 'x-wb-crx-cs/'
}