startApp();
var googleUser = {};
function startApp() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '182323935673-gboaegp9j8rocvumaeqh43i8hero683m.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('googleBtn'));
    });
};

function attachSignin(element) {
    auth2.attachClickHandler(element, {}, function(googleUser) {
        document.getElementById('googleName').innerText = "Signed in: " +
        googleUser.getBasicProfile().getName();
    }, function(error) {
        console.log(JSON.stringify(error, undefined, 2));
    });
}