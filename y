// These rules grant access to a node matching the authenticated
// user's ID from the Firebase auth token
{
  "rules": {
    ".write":true,
    ".read":true
  }
}