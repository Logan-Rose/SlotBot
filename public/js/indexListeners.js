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
            console.log('Logged in');
            window.location.href = 'home.html';
            
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
});