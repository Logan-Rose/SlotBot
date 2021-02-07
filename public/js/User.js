export default class User{
    constructor(checkedIn, email, name ){
        this.checkedIn = checkedIn;
        this.email = email;
        this.name = name;
        this.preferences = [];
        this.scratches = [];
    }

    scratch(scratchedUser){
        this.scratches.push(scratchedUser)
    }
    
    updatePreference(updatedUser){
        for(let i =0; i < this.preferences.length; i++){
            if(this.preferences[i].email == updatedUser.email){
                this.preferences[i] = updatedUser
                return;
            }
        }
        this.scratches.push(updatedUser)
    }
    getPreferences(){
        return this.preferences
    }
    getScratches(){
        return this.scratches
    }
    scratched(user){
        for(let i =0; i < this.scratches.length; i++){
            if(this.scratches[i].email == user.email){
                return true;
            }
        }
        return false;
    }

    isScratchedBy(user){
        let otherScratches =user.getScratches();
        for(let i =0; i < otherScratches.length; i++){
            if(otherScratches[i].email == this.email){
                return true;
            }
        }
        return false;
    }

    scratchUser(){
        console.log("scratch user")
    }

}