let activeUsers;
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


/**
 algorithm stable_matching is
    Initialize all m ∈ M and w ∈ W to free
    while ∃ free man m who still has a woman w to propose to do
        w := first woman on m's list to whom m has not yet proposed
        if w is free then
            (m, w) become engaged
        else some pair (m', w) already exists
            if w prefers m to m' then
                m' becomes free
                (m, w) become engaged 
            else
                (m', w) remain engaged
            end if
        end if
    repeat
 */


document.getElementById("generate").addEventListener("click", function(){
    let potentialPairings = []

    activeUsers.forEach(u => {
        let partners = []
        activeUsers.forEach(u2 => {
            if(u.email !== u2.email && !scratched(u, u2.email) && !scratched(u2, u.email)){
                partners.push(u2.email)
            }
                
        })
        potentialPairings.push({ u, partners})
    })
    

    potentialPairings.sort((a,b) => (a.partners.length > b.partners.length)? 1 : -1 )
    console.log(potentialPairings);

    let teams = []
    if(activeUsers.length %2 === 0 ){
        for(let i =0; i < activeUsers.length; i=i+2){
            teams.push( {speaker1: activeUsers[i], speaker2: activeUsers[i+1] } )
        }
    } else{
        for(let i =0; i < activeUsers.length -1; i=i+2){
            teams.push( {speaker1: activeUsers[i], speaker2: activeUsers[i+1] } )
        }
    }

    console.log(teams);


})