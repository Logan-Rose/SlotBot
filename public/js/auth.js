auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("signed in")
        window.location = 'home.html';
        console.log(cred)
    } else {
        console.log("no user")
    }
  });


db.collection('users').get().then(snapshot => {
    console.log(snapshot.docs);
})

let credentialInput = document.getElementById('credentials');
credentialInput.addEventListener('submit', (event) => {
    event.preventDefault();
    let action = event.submitter.id;
    const email = credentialInput['email'].value
    const password = credentialInput['password'].value
    if(action === "signUp"){
        window.location.href = 'signUp.html';
    } else{
        auth.signInWithEmailAndPassword(email,password).then(cred => {
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
});