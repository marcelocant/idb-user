class UserDao {
    
    constructor(connection) {
        
        this._connection = connection;
        this._store = 'users';

    };

    create(user) {
        
        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(user);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('não foi posssível realizar a operação');
            }

        });

    }


    listAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let users = [];

            cursor.onsuccess = e => {

                let current = e.target.result;

                if(current) {

                    let data = current.value;

                    users.push(new User(
                        data._name, 
                        data._email,
                        data._cpf,
                        data._phone,
                        data.value
                    ));

                    current.continue();

                } else {

                    resolve(users);

                }

            };

            cursor.onerror = e => {

                console.log(e.target.error.name);
                reject('Não foi possível listar');

            };

        }); 
    }

    deleteAll() {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('usuáros removidos');

            request.onerror = e => resolve('não foi possível remover os usuários');
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .delete(id);

            request.onsuccess = e => resolve('usuáro removido');

            request.onerror = e => resolve('não foi possível remover o usuário');
            
        });
    }

}