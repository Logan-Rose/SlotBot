auth.onAuthStateChanged(user => {
    console.log(user)
})



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
        window.location.href = '/signUp/signUp.html';
    } else{
        auth.signInWithEmailAndPassword(email,password).then(cred => {
            console.log("signed in")
            window.location.href = '/dashboard/home.html';
            console.log(cred)
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
});