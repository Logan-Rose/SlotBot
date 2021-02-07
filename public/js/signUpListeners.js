db.collection('users').get().then(snapshot => {
    console.log(snapshot.docs);
})

let credentialInput = document.getElementById('signUpCredentials');
credentialInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = credentialInput['email'].value
    const password = credentialInput['password'].value
    const name = credentialInput['name'].value
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log("signed up")
        console.log(cred)

        var userData = {
            admin:false,
            email: email,
            name: name,
            preferences: [],
            scratches: [],
            checkedIn: false,
        };
        db.collection('users').doc(email).set(userData).then(function() {
            console.log("Document successfully written!");
            window.location = 'home.html';
        });
        
    }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
});
function goBack(){
    console.log("back")
    window.location = 'index.html';
}
