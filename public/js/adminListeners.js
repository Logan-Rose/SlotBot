let activeUsers;
let allowIronman = false;
let numBpRooms = 0;
let numCpRooms = 0;
let numberOfDebaters = 0;
function onInit(){    
    console.log(currentUser)
    if(!currentUser.admin){
        console.log("frig off Ash");
        window.location = "home.html"
    } else{
        activeUsers = users.filter(user => user.checkedIn);
        numberOfDebaters = activeUsers.length;
        fillTable(activeUsers);
    }
}

function fillTable(users){
    console.log(users.length);
    let table = document.getElementById('slotting');
    users.forEach(function(user) {
        
        let tr = document.createElement('tr');
        tr.draggable = true;
        tr.innerHTML = '<td>' + user.name + '</td>';
        table.appendChild(tr);
    });
}

function wants(user1, user2){
    let prefs = []
    user1.preferences.forEach(p => prefs.push(p.email))
    if(prefs.indexOf(user2.email) === -1){
        return -1
    } else{
        return activeUsers.length - prefs.indexOf(user2.email)
    }
    
}

document.getElementById("generate").addEventListener("click", function(){  
    if(numBpRooms*8+numCpRooms*4 > numberOfDebaters){
        console.log("Not enough debaters")
        return
    } else{
        console.log(numBpRooms*8+numCpRooms*4);
        console.log(numberOfDebaters)
    }
    let userRatings = {}
    console.log(userRatings)
    console.log("    sdsdsd    ", activeUsers);
    //activeUsers.sort((a,b) => userRatings[a.email] - userRatings[b.email])


    //assign pairings randomly for now
    console.log('----  ----')
    console.log('assigning pairs ....')
    let table = []
    for(let i =0; i < activeUsers.length; i++){
        let row = []
        for(let j = 0; j < activeUsers.length; j++){
            row.push(wants(activeUsers[i], activeUsers[j]))
        }
        table.push(row)
    }
    let pairingStrengths = []    
    for(let i =0; i < activeUsers.length; i++){
        let row = []
        for(let j = 0; j < activeUsers.length; j++){
            row.push(0)
        }
        pairingStrengths.push(row)
    }

    for(let i =0; i < table.length; i++){
        for(let j = 0; j < table[0].length; j++){
            if(table[i][j] == -1 || table[j][i] == -1){
                pairingStrengths[i][j] = 0
            } else{
                pairingStrengths[i][j] = Math.round(10*( (table[i][j] + table[j][i])/(i + j))) //This line determines the ranking, work opn this formula
            }
         }
    }
    
    console.log(table);
    console.log(pairingStrengths);
    console.log('----  ----')



    //assign them based on algorithm later
    let teams = []
    let extra;
    if(activeUsers.length % 2 !== 0){
        extra = activeUsers.pop();
        if(allowIronman){
            teams.push([extra, extra]);
        }
    }
    for(let i =0; i < activeUsers.length; i = i + 2){
        teams.push([activeUsers[i], activeUsers[i+1]])
    }
    // console.log(teams)
    
    let rooms = [];
    for(let i =0; i < numBpRooms; i++){
        rooms.push([...teams.splice(0, 4)])
    }

    for(let i =0; i < numCpRooms; i++){
        rooms.push([...teams.splice(0, 2)])
    }
    
    // console.log(rooms);
    listRooms(rooms);
    
    writeRooms(rooms);

})

function writeRooms(rooms){
    for(let i=0; i< rooms.length; i++){
        if(rooms[i].length ==4){
            let currentRoom = {
                og: [rooms[i][0][0].email, rooms[i][0][1].email],
                oo: [rooms[i][1][0].email, rooms[i][1][1].email],
                cg: [rooms[i][2][0].email, rooms[i][2][1].email],
                co: [rooms[i][3][0].email, rooms[i][3][1].email]
            }
            db.collection('rooms').doc(i.toString()).set(currentRoom).then(function() {
               // console.log("room ", i, " written")
             });
        } else if(rooms[i].length == 2){
            let currentRoom = {
                og: [rooms[i][0][0].email, rooms[i][0][1].email],
                oo: [rooms[i][1][0].email, rooms[i][1][1].email],
            }
            db.collection('rooms').doc(i.toString()).set(currentRoom).then(function() {
               // console.log("room ", i, " written")
             });
        }

    }
    db.collection('rooms').get().then(snap => {
        length = snap.size 
        for(let i = rooms.length; i < length; i++){
            db.collection('rooms').doc(i + "").delete()
        }
     });
    //const res = await db.collection('bpRooms').doc(i + "").delete()
    //delete rooms with index greater than bpRooms.length
}

document.getElementById("allowIronMan").addEventListener("input", function(){
    if(allowIronman){
        numberOfDebaters--
    } else{
        numberOfDebaters++
    }
    allowIronman = !allowIronman;
    
})

document.getElementById("numberOfbpRooms").addEventListener("input", function(e){
    let val = e.target.value*8 + numCpRooms*4
    if(val > numberOfDebaters){
        document.getElementById("numberOfbpRooms").value = numBpRooms;
        console.log("Not enough Debaters")
    } else{
        numBpRooms = e.target.value
    }
})

document.getElementById("numberOfcpRooms").addEventListener("input", function(e){
    let val = e.target.value*4 + numBpRooms*8
    if(val > numberOfDebaters){
        document.getElementById("numberOfcpRooms").value = numCpRooms;
        console.log("Not enough Debaters")
    } else{
        numCpRooms = e.target.value
    }
})

function listRooms(rooms){


    let container = document.getElementById('teams');
    let roomNum = 0;
    rooms.forEach(room => {
        roomNum++;
        let table = document.createElement('table');
        table.innerHTML = '<th colspan=2>Room '+ roomNum + '</th> <tr><th>Opening Government</th><th>Opening Opposition</th></tr>'

        let row1 = document.createElement('tr');
        row1.innerHTML = '<td>' + room[0][0].name + '</td>' + '<td>' + room[1][0].name + '</td>';
        table.appendChild(row1);
        let row2 = document.createElement('tr');
        row2.innerHTML = '<td>' + room[0][1].name + '</td>' + '<td>' + room[1][1].name + '</td>';
        table.appendChild(row2);

        if(room.length >2){
            let title2 = document.createElement('tr');
            title2.innerHTML = '<th>Closing Government</th><th>Closing Opposition</th>'
            table.appendChild(title2)
            let row3 = document.createElement('tr');
            row3.innerHTML = '<td>' + room[2][0].name + '</td>' + '<td>' + room[3][0].name + '</td>';
            table.appendChild(row3);
            let row4 = document.createElement('tr');
            row4.innerHTML = '<td>' + room[2][1].name + '</td>' + '<td>' + room[3][1].name + '</td>';
            table.appendChild(row4);
        }

        container.appendChild(table)
        container.appendChild(document.createElement('br'));
    })
}

function tokenize(user) {
    return {email: user.email, name: user.name}
}