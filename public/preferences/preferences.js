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

let test = [
    {name: "Logan", rank: 1, scratched: false},
    {name: "Vasu", rank: 2, scratched: true},
    {name: "James", rank: 3, scratched: true},
]

let table = document.getElementById('slotting');
test.forEach(function(object) {
    let tr = document.createElement('tr');
    tr.innerHTML = 
        '<td>' + object.name + '</td>' +
        '<td>' + object.rank + '</td>' +
        '<td>' + object.scratched + '</td>';
    table.appendChild(tr);
});


/**
 * if admin
 * document.getElementById("myP").style.visibility = "visible";
 * else
 * document.getElementById("myP").style.visibility = "hidden";
 * 
 */


