class UserService {
    
    constructor() {    
        this._http = new HttpService();
    }


    getUsersFromApi(){
        return this._http
            .get('https://private-21e8de-rafaellucio.apiary-mock.com/users')
            .then(users => {
                return users.map(
                    object => new User(
                        object.name,
                        object.email,
                        object.cpf,
                        object.phone
                    )
                );
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao importar usuários');
            });
    }
    
    getUsers() {
        
        return Promise.all([
            this.getUsersFromApi()
        ]).then(data => {

            let users = data
                .reduce((objects, data) => objects.concat(data),[])
                .map(
                    object => new User(
                        object.name,
                        object.email,
                        object.cpf,
                        object.phone
                    )
                );

            return users;

        }).catch(erro => {
            throw new Error(erro);
        });

	} 
}
