function onInit(){
    console.log("Homepage:", currentUser);
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

function signOut(){
    firebase.auth().signOut().then(() => {
        window.location = 'index.html';
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


