function onInit(){
    console.log(currentUser)
    if(!currentUser.admin){
        console.log("frig off Ash");
        window.location = "home.html"
    } else{
        let activeUsers = users.filter(user => user.checkedIn);
        fillTable(activeUsers);
    }

}

function fillTable(users){
    console.log(users.length);
    let table = document.getElementById('slotting');
    users.forEach(function(user) {
        
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + user.name + '</td>';
        table.appendChild(tr);
    });
}

function scratchUser(scratch){
    if(scratched(currentUser, scratch.value)){
        currentUser.scratches = currentUser.scratches.filter(email => email !== scratch.value)
    } else{
        currentUser.scratches.push(scratch.value);
    }
    db.collection("users").doc(currentUser.email).update({scratches: currentUser.scratches}).then(function(){
        console.log("updated!");
    })
    document.getElementById(scratch.value).innerHTML = scratched(currentUser, scratch.value);
    

    
    //currentUser.scratches.push(scratch);
    //db.collection("users").doc(currentUser.email).set(currentUser)
}
