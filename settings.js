// On this file you can define profiles that include settings for DB and settings.

// This is the default profile "test". BE SURE TO CHANGE THESE TO YOUR OWN SETTINGS!!!
exports.test = {
	host: 'localhost',
	port: 3306,
	user: 'A_USERNAME_FOR_DRUPAL_DB',
	password: 'A_PASSWD_FOR DRUPAL_DB',
	db: 'DRUPAL_DB_NAME',
  // You can find the value of your sssion by looking into the Drupal session cookie.
  session: 'SESS0000000000000000000000000000000'
}