class UserList {

    constructor() { 
        this._users = [];
    }

    create(user) {
        this._users.push(user);
    }

    get users() {
        let users = []
        for(var i = 0; i < this._users.length; i++){
            users.push({
                'name': this._users[i]._name,
                'email': this._users[i]._email,
                'cpf': this._users[i]._cpf,
                'phone': this._users[i]._phone,
                'key': this._users[i].value
            });
        }
        return [].concat(users);
    }

    empty() {   
        this._users = [];
    }

    reorder(creteria){
        this._users.sort(creteria);
    }
    
}