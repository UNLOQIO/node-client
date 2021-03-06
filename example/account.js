/**
 * Example usage for account creation. A service may choose to perform the account creation on behalf of the user,
 * therefore it may call the account creation functionality.
 */
var unloq = require('../index'); // this is require('unloq')
var config = require('./config');

var apiObj = new unloq.Api(config);

// Create an UNLOQ account on behalf of the service.
apiObj
  .createAccount({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com11',
    phone_number: '+40740000000'
  })
  .then(function(data) {
    console.log('Account id: ' + data.id);
    setTimeout(function() {
      // Re-send verification information to the given e-mail, if the email was created by the app.
      apiObj.resendAccountVerification(data.id).then(function(message) {
        console.log(message);
        setTimeout(function() {
          // Retrieve the account status (verified or not).
          apiObj.accountStatus(data.id).then(function(statusData) {
            console.log('Account status data:', statusData);
          })
        }, 2000);
      }).error(function(err) {
        console.log('Failed to resend verification:', err);
      });
    }, 2000);
  })
  .error(function(e) {
    console.log("Failed to create account:", e);
  });

