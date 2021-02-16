let base, randomized, dragging, draggedOver;
function onInit(){
    console.log(currentUser)
    fillTable(currentUser.preferences);
}

function fillTable(list){
    //currentUser.preferences.forEach(u => us)
    let table = document.getElementById('slotting');
    table.innerHTML = '<tr><th>Ranking</th><th>Debater</th><th>Scratched</th></tr>'
    let i = 0
    list.forEach(function(user) {
        let tr = document.createElement('tr');
        tr.draggable = true;
        tr.className = "row";
        tr.id = i
        tr.addEventListener('drag', setDragging); 
        tr.addEventListener('dragover', setDraggedOver);
        tr.addEventListener('drop', move);
        tr.innerHTML = 
            '<td>' + i + '</td>' + 
            '<td>' + user.name + '</td>' +
            '<td> <button onClick="scratchUser(this)" value=' +user+' id=' +user+'>' + scratched(currentUser, user) + '</button></td>';
        table.appendChild(tr);
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
    console.log("--", users[dragging], users[draggedOver]);
    let index1 = dragging
    let index2 = draggedOver;
    let temp = currentUser.preferences[index1]
    currentUser.preferences.splice(index1, 1)
    currentUser.preferences.splice(index2, 0, temp)
    //console.log(users)

    //Make a list containing only emails for easier reference
    //console.log(prefs)
    //update preferences in database
    db.collection("users").doc(currentUser.email).update({preferences: currentUser.preferences}).then(function(){
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
