// Initialize Firebase
var config = {
    apiKey: "AIzaSyC6FdN1eU0ibIw_DP-fhOABKH0OS06e-pg",
    authDomain: "what-s-happenin.firebaseapp.com",
    databaseURL: "https://what-s-happenin.firebaseio.com",
    projectId: "what-s-happenin",
    storageBucket: "",
    messagingSenderId: "513910723970"
};
firebase.initializeApp(config);

let database = firebase.database();

// run sign in functino when clicking sign in button
$("#signInBtn").on("click", function (event) {
    event.preventDefault();
    let email = $("#signEmail").val().trim();
    let password = $("#passwordSign").val().trim();
    signIn(email, password);
})

// declaring sign in function
function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (data) {
            let databaseObject = {
                "User ID": data["user"]["uid"],
                "Sign In Time": moment().format("x"),
            }
            database.ref().push(databaseObject);
            $("#signinMessage").append(`<p>${data}</p>`)
        })
        .catch(function (error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            $("#signinMessage").append(`<p>${errorMessage}</p>`)
        });
}

// run sign out function when clicking sign out button
$("#sign-out").on("click", function (event) {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    })
        .then(function (data) {
            let signOutObject = {
                "User ID": data["user"]["uid"],
                "Sign Out Time": moment().format("x")
            }
            database.ref().push(signOutObject);
        })
        .catch(function (error) {
            // An error happened.
        })
});

// register user and automatically log them in
$("#registerSubmit").on("click", function () {
    let email = $("#registerEmail").val().trim();
    let password = $("#passwordRegister").val().trim();
    let first_name = $("#first_name").val().trim()
    let last_name = $("#last_name").val().trim()

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            signIn(email, password);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            $("#registractionMsg").append(`<p>${errorMessage}</p>`)
        })
});

// reset password email
$("#resetBtn").on("click", function () {
let emailAddress = $("#signEmail").val().trim()
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        $("#signinMessage").append(`<p>Please check your email account for a message about resetting your password</p>`)
    }).catch(function (error) {
        // An error happened.
        var errorMessage = error.message;
            $("#signinMessage").append(`<p>${errorMessage}</p>`)
    })
});

// persistence state to log out user upon closing the window
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });