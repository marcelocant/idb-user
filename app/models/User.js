class User {
    
    constructor(name, email, cpf, phone) {     
        this._name = name;
        this._email = email;
        this._cpf = cpf;
        this._phone = phone;
        Object.freeze(this);
    }
    
    get name() {
        return this._name;
    }
    
    get email() {
        return this._email;
    }
    
    get cpf() {
        return this._cpf;
    }

    get phone() {
        return this._phone;
    }

}