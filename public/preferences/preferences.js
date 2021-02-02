auth.onAuthStateChanged(function(user) {
    if (user) {
        let users = []
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                users.push(doc.data())
            });
            console.log(users[0])
        });

        
        console.log(users)
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


/**
 * if admin
 * document.getElementById("myP").style.visibility = "visible";
 * else
 * document.getElementById("myP").style.visibility = "hidden";
 * 
 */


