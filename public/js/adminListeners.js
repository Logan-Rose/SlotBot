let activeUsers;
let allowIronman = false;
let numBpRooms = 0;
let numCpRooms = 0;
function onInit(){    
    console.log(currentUser)
    if(!currentUser.admin){
        console.log("frig off Ash");
        window.location = "home.html"
    } else{
        activeUsers = users.filter(user => user.checkedIn);
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
            teams.push(extra, extra);
        }
    }
    console.log(activeUsers)
    for(let i =0; i < activeUsers.length; i = i + 2){
        teams.push([activeUsers[i], activeUsers[i+1]])
    }
    console.log(teams)
    let cpRooms = [];
    let bpRooms = [];
     
    for(let i =0; i < numBpRooms; i++){
        bpRooms.push([...teams.splice(0, 4)])
    }

    for(let i =0; i < numCpRooms; i++){
        cpRooms.push([...teams.splice(0, 2)])
    }
    
    console.log("BP rooms:", bpRooms)
    console.log("CP rooms:", cpRooms)
    listRooms(bpRooms, cpRooms);


    

})

document.getElementById("allowIronMan").addEventListener("input", function(){
    allowIronman = !allowIronman;
})

document.getElementById("numberOfbpRooms").addEventListener("input", function(e){
    let val = e.target.value*8 + numCpRooms*4
    if(val > activeUsers.length){
        document.getElementById("numberOfbpRooms").value = numBpRooms;
        console.log("TOO DAMN HIGH")
    } else{
        numBpRooms = e.target.value
    }
})

document.getElementById("numberOfcpRooms").addEventListener("input", function(e){
    let val = e.target.value*4 + numBpRooms*8
    if(val > activeUsers.length){
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
    rooms.forEach(room => {
        let table = document.createElement('table');
        table.innerHTML = '<th>Government</th><th>Opposition</th>'
        let row1 = document.createElement('tr');
        row1.innerHTML = '<td>' + room[0][0].name + '</td>' + '<td>' + room[1][0].name + '</td>';
        table.appendChild(row1);
        let row2 = document.createElement('tr');
        row2.innerHTML = '<td>' + room[0][1].name + '</td>' + '<td>' + room[1][1].name + '</td>';
        table.appendChild(row2);
        cpContainer.appendChild(table)
    })
    return cpContainer;
}

function listbpRooms(rooms){
    let bpContainer = document.createElement('div');
    bpContainer.innerHTML = ''
    rooms.forEach(room => {
        let table = document.createElement('table');
        table.innerHTML = '<th>Opening Government</th><th>Opening Opposition</th>'
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
    })
    return bpContainer;
}

function tokenize(user) {
    return {email: user.email, name: user.name}
}