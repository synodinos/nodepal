// On this file you can define profiles that include settings for DB and settings.

// This is the default profile "test". BE SURE TO CHANGE THESE TO YOUR OWN SETTINGS!!!
exports.test = {
	host: 'localhost',
	port: 3306,
	user: 'root',   // The username to access the Drupal DB
	password: '', // The password to access the Drupal DB. It shouldn't be empty in production
	db: 'nodepal',               // The Drupal DB name
  // You can find the value of your sssion by looking into the Drupal session cookie.
  session: 'SESS421aa90e079fa326b6494f812ad13e79'
}