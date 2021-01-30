auth.onAuthStateChanged(user => {
    console.log(user)
})

db.collection('users').get().then(snapshot => {
    console.log(snapshot.docs);
})

console.log("user", auth.currentUser);
console.log(db.collection("users"));

document.getElementById('welcome').innerHTML = 'Welcome!';