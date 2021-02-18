let base, randomized, dragging, draggedOver;
function onInit(){
    let prefEmails = []
    currentUser.preferences.forEach( p =>{
        prefEmails.push(p.email);
    })
    users.forEach(u =>{
        if(!prefEmails.includes(u.email) && u.email !== currentUser.email){
            currentUser.preferences.push({name:u.name, email:u.email})
        } 
    });
    db.collection("users").doc(currentUser.email).update({preferences: currentUser.preferences}).then(function(){
        console.log("updated!");
        fillTable(currentUser.preferences);
    })
    
}

function fillTable(list){
    //currentUser.preferences.forEach(u => us)
    console.log("bitch")
    let table = document.getElementById('slotting');
    table.innerHTML = '<li>Preferences</li>'
    let i = 0
    list.forEach(user => {
        console.log(user)
        let li = document.createElement('li');
        li.draggable = true;
        li.id = i
        li.addEventListener('drag', setDragging); 
        li.addEventListener('dragover', setDraggedOver);
        li.addEventListener('drop', move);
        li.innerHTML = 
            '<div class="row">' + user.name + '<button onClick="scratchUser(this)" value=' +user.email+' id=' +user.email+'>' + scratched(currentUser, user.email) + '</button></div>';
        table.appendChild(li);
        i++
    });
}

const setDragging = (e) =>{
    e.preventDefault();
    dragging = parseInt(e.target.id)
}

function setDraggedOver(e) {
    e.preventDefault();
    draggedOver = parseInt(e.path[1].id)
}

const move = (e) =>{
    console.log("hello")
    console.log("--", currentUser.preferences[dragging], currentUser.preferences[draggedOver]);
    let temp = currentUser.preferences[dragging]
    currentUser.preferences.splice(dragging, 1)
    currentUser.preferences.splice(draggedOver, 0, temp)
    
    db.collection("users").doc(currentUser.email).update({preferences: currentUser.preferences}).then(function(){
        console.log("hello")
        fillTable(currentUser.preferences)
    })
    
  };



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
}
