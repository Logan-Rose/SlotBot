var authFlag = true;
let users = []
auth.onAuthStateChanged( user => {
  if(authFlag) {
    authFlag = false;
    if (user) {
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                users.push(
                    {
                        name: doc.data().name,
                        email: doc.data().email,
                        checkedIn: doc.data().checkedIn,
                        preferences: doc.data().preferences,
                        scratches: doc.data().scratches
                    })
            });
            currentUser = users.filter(user => user.email.toLowerCase() == auth.currentUser.email)[0];
            console.log(users);
            onInit();
        });
    }
    else {
        authFlag = true;
    }
  }
});
db.collection('users').get().then(snapshot => {
    //console.log(snapshot.docs);
})

function scratched(user, email){
    console.log(user.email, " - ", email, " - ", user.scratches.includes(email))
    return user.scratches.includes(email)

}
