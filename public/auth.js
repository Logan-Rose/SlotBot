auth.onAuthStateChanged(user => {
    console.log(user)
})

let credentialInput = document.getElementById('credentials');
credentialInput.addEventListener('submit', (event) => {
    event.preventDefault();
    let action = event.submitter.id;
    const email = credentialInput['email'].value
    const password = credentialInput['password'].value
    if(action === "signUp"){
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            console.log("signed up")
            console.log(cred)
    
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    } else{
        auth.signInWithEmailAndPassword(email,password).then(cred => {
            console.log("signed in")
            console.log(cred)
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
});