auth.onAuthStateChanged(function(user) {
    if (user) {
        let users = [];
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
            let currentUser = users.filter(user => user.email == auth.currentUser.email)[0];
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
            '<td> <button onClick="scratchUser(user)">' + user.checked + '</button></td>';
        table.appendChild(tr);
    });
}

function scratchUser(scratch){
    currentUser.scratches.push(scratch);
    db.collection("users").doc(currentUser.email).set(currentUser)
}