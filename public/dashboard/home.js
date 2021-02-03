
auth.onAuthStateChanged(function(user) {
    if (user) {
        let users = []
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
            currentUser = users.filter(user => user.email == auth.currentUser.email)[0];
            document.getElementById('welcome').innerHTML = 'Welcome, '+ currentUser.name;
        });
    }else {
      // No user is signed in.
    }
  });
function signOut(){
    firebase.auth().signOut().then(() => {
        window.location = '../index.html';
    }).catch((error) => {
        console.log("Sign out failed");
    });
}

document.getElementById('checkIn').addEventListener("click", function(){
    if(currentUser.checkedIn){
        console.log("checking out");
        db.collection("users").doc(currentUser.email).update({checkedIn: false}).then(function() {
            currentUser.checkedIn = false
            console.log("Document successfully updated!");
            document.getElementById('checkIn').className = "checkedOut"
            document.getElementById('checkIn').innerText = "Checked Out"
        });
    } else{
        console.log("checking in")
        db.collection("users").doc(currentUser.email).update({checkedIn: true}).then(function() {
            currentUser.checkedIn = true
            console.log("Document successfully updated!");
            document.getElementById('checkIn').className = "checkedIn"
            document.getElementById('checkIn').innerText = "Checked In"


        });
    }
});

/**
 * if admin
 * document.getElementById("myP").style.visibility = "visible";
 * else
 * document.getElementById("myP").style.visibility = "hidden";
 * 
 */


