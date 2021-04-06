
class UserController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputName = $('#name');
        this._inputEmail = $('#email');
        this._inputCpf = $('#cpf');
        this._inputPhone = $('#phone');
         
        this._listUsers = new Bind(
            new UserList(), 
            new UsersView($('#usersView')), 
            'create', 'empty', 'reorder');
       
        this._message = new Bind(
            new Message(), new MessageView($('#messageView')),
            'text');    
            
        this._currentOrder = '';
        
        ConnectionFactory
            .getConnection()
            .then(connection => {

                new UserDao(connection)
                    .listAll()
                    .then(users => {
                        users.forEach( user => {
                            this._listUsers.create(user);
                        });
                    })
                    .catch(erro => {
                        console.log(erro);
                        this._message.text = erro;
                    });

            });
    }
    
    create(event) {

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(
                connection => {
                    let user =  this._createUser();

                    new UserDao(connection)
                        .create(user)
                        .then(()=>{
                            this._listUsers.create(user);
                            this._message.text = 'Usuário criado'; 
                            this._clearForm();
                        })


                }
            )
            .catch(erro =>{
                this._message.text = erro;
            });

    }
    
    importUsers(save) {
        
        let service = new UserService();
        service
            .getUsers()
            .then(users => users.forEach(user => {
                this._listUsers.create(user);
                if(save === 1) {
                    this._createUsers(user);
                    this._message.text = 'Usuários importados';
                } else {
                    this._message.text = 'Usuários atualizados';
                }
            }))
            .catch(erro => this._message.text = erro);
            
    }

    delete(id) {

        ConnectionFactory
            .getConnection()
            .then(connection => new UserDao(connection))
            .then(dao => dao.delete(id))
            .then(message => {
                this._message.text = message;
                this._listUsers.empty();
            });
        this._listUsers.empty();
        this.importUsers(0);
        this._message.text = 'Usuário deletado';
    }
    
    clear() {

        ConnectionFactory
            .getConnection()
            .then(connection => new UserDao(connection))
            .then(dao => dao.deleteAll())
            .then(message => {
                this._message.text = message;
                this._listUsers.empty();
            });
        
        this._listUsers.empty();
        this._message.text = 'Usuários deletados';

    }

    _createUsers(user){
        ConnectionFactory
            .getConnection()
            .then(
                connection => {
                    new UserDao(connection)
                        .create(user)
                        .then(()=>{
                            this._message.text = `Usuário ${user.name} salvo`;
                        });
                }
            )
            .catch(erro =>{
                this._message.text = erro;
            });
    }
    
    _createUser() {
        
        return new User(
            this._inputName.value,
            this._inputEmail.value,
            this._inputCpf.value,
            this._inputPhone.value,
        );    
    }
    
    _clearForm() {
     
        this._inputName.value = '';
        this._inputEmail.value = '';
        this._inputCpf.value = '';
        this._inputPhone.value = '';
        this._inputName.focus();   
    }
    
    reorder(col) {
        
        if(this._currentOrder == col) {
            this._listUsers.inverteOrdem(); 
        } else {
            this._listUsers.reorder((p, s) => p[col] - s[col]);    
        }
        this._currentOrder = col;

    }
   
}