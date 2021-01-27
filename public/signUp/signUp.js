db.collection('users').get().then(snapshot => {
    console.log(snapshot.docs);
})

let credentialInput = document.getElementById('signUp');
credentialInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = credentialInput['email'].value
    const password = credentialInput['password'].value
    const name = credentialInput['name'].value
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log("signed up")
        console.log(cred)

        var userData = {
            email: email,
            name: name,
            preferences: [],
            scratches: []
        };
        db.collection('users').doc(email).set(userData).then(function() {
            console.log("Document successfully written!");
        });
        goBack();
    }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
});

function goBack(){
    window.location.href = '../../';
}