
auth.onAuthStateChanged(function(user) {
    if (user) {
        let users = [];
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                users.push(doc.data())
            });
            fillTable(users);
        })
    }else {
      // No user is signed in.
    }
  });

function fillTable(users){
    console.log(users.length);
    let table = document.getElementById('slotting');
    users.forEach(function(user) {
        
        let tr = document.createElement('tr');
        tr.innerHTML = 
            '<td>' + user.name + '</td>' +
            '<td>' + user.email + '</td>' +
            '<td>' + user.checkedIn + '</td>';
        table.appendChild(tr);
    });
}