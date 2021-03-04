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

document.getElementById("generate").addEventListener("click", function(){  
    if(numBpRooms*8+numCpRooms*4 > numberOfDebaters){
        console.log("Not enough debaters")
        return
    } else{
        console.log(numBpRooms*8+numCpRooms*4);
        console.log(numberOfDebaters)
    }
    let userRatings = {}

    users.forEach(u => {
        userRatings[u.email] = 0
    });

    users.forEach(u =>{
        for(let i =0; i < u.preferences.length; i++){
            let prefEmail = u.preferences[i].email
            userRatings[prefEmail] = userRatings[prefEmail] + i
        }
    })
    console.log(userRatings)
    activeUsers.sort((a,b) => userRatings[a.email] - userRatings[b.email])
    console.log(activeUsers)

    //assign pairings randomly for now
    //assign them based on algorithm later
    let teams = []
    let extra;
    if(activeUsers.length % 2 !== 0){
        extra = activeUsers.pop();
        if(allowIronman){
            teams.push([extra, extra]);
        }
    }
    console.log(activeUsers)
    for(let i =0; i < activeUsers.length; i = i + 2){
        teams.push([activeUsers[i], activeUsers[i+1]])
    }
    console.log(teams)
    
    let bpRooms = [];
    for(let i =0; i < numBpRooms; i++){
        bpRooms.push([...teams.splice(0, 4)])
    }

    let cpRooms = [];
    for(let i =0; i < numCpRooms; i++){
        cpRooms.push([...teams.splice(0, 2)])
    }
    
    console.log("BP rooms:", bpRooms)
    console.log("CP rooms:", cpRooms)

    listRooms(bpRooms, cpRooms);

    
    writeBpRooms(bpRooms);
    writeCpRooms(cpRooms);
    
    let rooms = [...bpRooms, ...cpRooms]
    console.log(rooms);   

})

function writeBpRooms(bpRooms){
    for(let i=0; i< bpRooms.length; i++){
        let currentRoom = {
            og: [bpRooms[i][0][0].email, bpRooms[i][0][1].email],
            oo: [bpRooms[i][1][0].email, bpRooms[i][1][1].email],
            cg: [bpRooms[i][2][0].email, bpRooms[i][2][1].email],
            co: [bpRooms[i][3][0].email, bpRooms[i][3][1].email]
        }
        db.collection('bpRooms').doc(i.toString()).set(currentRoom).then(function() {
           console.log("room ", i, " written")
        });
    }
    
    db.collection('bpRooms').get().then(snap => {
        length = snap.size 
        for(let i = bpRooms.length; i < length; i++){
            db.collection('bpRooms').doc(i + "").delete()
        }
     });
    //const res = await db.collection('bpRooms').doc(i + "").delete()
    //delete rooms with index greater than bpRooms.length
}

function writeCpRooms(cpRooms){
    for(let i=0; i< cpRooms.length; i++){
        let currentRoom = {
            og: [cpRooms[i][0][0].email, cpRooms[i][0][1].email],
            oo: [cpRooms[i][1][0].email, cpRooms[i][1][1].email]
        }
        db.collection('cpRooms').doc(i.toString()).set(currentRoom).then(function() {
           console.log("room ", i, " written")
        });
    }
    db.collection('cpRooms').get().then(snap => {
        length = snap.size
        console.log(length, cpRooms.length, ":::;");
        for(let i = cpRooms.length; i < length; i++){
            db.collection('cpRooms').doc(i + "").delete().then(function(){
                console.log("Room ", i, " deleted");
            })
        }
     });
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
        console.log("TOO DAMN HIGH")
    } else{
        numBpRooms = e.target.value
    }
})

document.getElementById("numberOfcpRooms").addEventListener("input", function(e){
    let val = e.target.value*4 + numBpRooms*8
    if(val > numberOfDebaters){
        document.getElementById("numberOfcpRooms").value = numCpRooms;
        console.log("TOO DAMN HIGH")
    } else{
        numCpRooms = e.target.value
    }
})

function listRooms(bpRooms, cpRooms){
    let container = document.getElementById('teams');
    container.innerHTML = '';
    container.append(listbpRooms(bpRooms));
    container.append(listcpRooms(cpRooms));
    
}

function listcpRooms(rooms){
    let cpContainer = document.createElement('div');
    let roomNum = 0;

    rooms.forEach(room => {
        roomNum++;
        let table = document.createElement('table');
        table.innerHTML = '<th colspan=2> CP Room '+ roomNum + '</th> <tr><th>Government</th><th>Opposition</th></tr>'
        let row1 = document.createElement('tr');
        console.log(room)
        row1.innerHTML = '<td>' + room[0][0].name + '</td>' + '<td>' + room[1][0].name + '</td>';
        table.appendChild(row1);
        let row2 = document.createElement('tr');
        row2.innerHTML = '<td>' + room[0][1].name + '</td>' + '<td>' + room[1][1].name + '</td>';
        table.appendChild(row2);
        cpContainer.appendChild(table)
        cpContainer.appendChild(document.createElement('br'));
    })
    return cpContainer;
}

function listbpRooms(rooms){
    let bpContainer = document.createElement('div');
    bpContainer.innerHTML = ''
    let roomNum = 0;
    rooms.forEach(room => {
        roomNum++;
        let table = document.createElement('table');
        table.innerHTML = '<th colspan=2> BP Room '+ roomNum + '</th> <tr><th>Opening Government</th><th>Opening Opposition</th></tr>'
        let row1 = document.createElement('tr');
        row1.innerHTML = '<td>' + room[0][0].name + '</td>' + '<td>' + room[1][0].name + '</td>';
        table.appendChild(row1);
        let row2 = document.createElement('tr');
        row2.innerHTML = '<td>' + room[0][1].name + '</td>' + '<td>' + room[1][1].name + '</td>';
        table.appendChild(row2);

        let title2 = document.createElement('tr');
        title2.innerHTML = '<th>Closing Government</th><th>Closing Opposition</th>'
        table.appendChild(title2)
        let row3 = document.createElement('tr');
        row3.innerHTML = '<td>' + room[2][0].name + '</td>' + '<td>' + room[3][0].name + '</td>';
        table.appendChild(row3);
        let row4 = document.createElement('tr');
        row4.innerHTML = '<td>' + room[2][1].name + '</td>' + '<td>' + room[3][1].name + '</td>';
        table.appendChild(row4);
        bpContainer.appendChild(table)
        bpContainer.appendChild(document.createElement('br'));
    })
    return bpContainer;
}

function tokenize(user) {
    return {email: user.email, name: user.name}
}