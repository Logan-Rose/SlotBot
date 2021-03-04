let container = document.getElementById('teams');
container.innerHTML = '';
function onInit(){
    console.log("Homepage:", currentUser);
    document.getElementById('welcome').innerHTML = "Welcome " + currentUser.name; 
    if(currentUser.admin){
        document.getElementById("admin").hidden = false
    }
    getbpRooms();
    getcpRooms();
}


function getbpRooms(){
    let rooms = []
    db.collection("bpRooms").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            rooms.push(
                [
                    doc.data().og,
                    doc.data().oo,
                    doc.data().cg,
                    doc.data().co,
                ])
        });
        container.append(listbpRooms(rooms));
    });   
}

function getcpRooms(){
    let rooms = []
    db.collection("cpRooms").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            rooms.push(
                [
                    doc.data().og,
                    doc.data().oo,
                ])
        });
        console.log(rooms)
        container.append(listcpRooms(rooms));
    });
    
}

function listcpRooms(rooms){
    console.log("reee")
    let cpContainer = document.createElement('div');
    let roomNum = 0;
    rooms.forEach(room => {
        roomNum++;
        let table = document.createElement('table');
        table.innerHTML = '<th colspan=2> CP Room '+ roomNum + '</th> <tr><th>Government</th><th>Opposition</th></tr>'
        let row1 = document.createElement('tr');
        console.log(room)
        row1.innerHTML = '<td>' + room[0][0] + '</td>' + '<td>' + room[1][0] + '</td>';
        table.appendChild(row1);
        let row2 = document.createElement('tr');
        row2.innerHTML = '<td>' + room[0][1] + '</td>' + '<td>' + room[1][1] + '</td>';
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



document.getElementById('checkIn').addEventListener("click", function(){
    if(currentUser.checkedIn){
        console.log("checking out");
        db.collection("users").doc(currentUser.email).update({checkedIn: false}).then(function() {
            currentUser.checkedIn = false
            console.log("Document successfully updated!");
            document.getElementById('checkIn').className = "checkedOut"
            document.getElementById('checkIn').innerText = "Checked Out"
        });
    } else{
        console.log("checking in")
        db.collection("users").doc(currentUser.email).update({checkedIn: true}).then(function() {
            currentUser.checkedIn = true
            console.log("Document successfully updated!");
            document.getElementById('checkIn').className = "checkedIn"
            document.getElementById('checkIn').innerText = "Checked In"
        });
    }
});

document.getElementById('admin').addEventListener("click", function(){
    window.location = "admin.html"
})

document.getElementById('preferencesButton').addEventListener("click", function(){
    window.location = "preferences.html"
})


function signOut(){
    firebase.auth().signOut().then(() => {
        window.location = 'index.html';
    }).catch((error) => {
        console.log("Sign out failed");
    });
}


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

