export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''

// NOTE this is the first thing you should do - make sure sockets are turned on for this project
export const useSockets = true
export const domain = 'abc-towing.us.auth0.com'
export const clientId = 'pECbyD8lsoKeI2mhD1vzWSsIwhZNuO7T'
export const audience = 'https://abc-towing.com'
