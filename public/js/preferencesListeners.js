function onInit(){
    console.log(currentUser)
    fillTable(users);
}

function fillTable(users){
    console.log(users.length);
    let table = document.getElementById('slotting');
    users.forEach(function(user) {
        
        let tr = document.createElement('tr');
        tr.innerHTML = 
            '<td>' + user.name + '</td>' +
            '<td>' + user.email + '</td>' +
            '<td> <button onClick="scratchUser(this)" value=' +user.email+' id=' +user.email+'>' + scratched(currentUser, user.email) + '</button></td>';
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
