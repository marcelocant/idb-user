class UsersView extends View {
    
    constructor(element) {
        
        super(element);
    }
    
    template(model) {
        
        return `
        <table class="table">
            <thead>
                <tr>
                    <th onclick="userController.reorder('name')">Nome</th>
                    <th onclick="userController.reorder('email')">E-mail</th>
                    <th onclick="userController.reorder('cpf')">CPF</th>
                    <th onclick="userController.reorder('phone')">Phone</th>
                    <th>Ações</th>
                </tr>
            </thead>
        
            <tbody>
                ${model.users.map(user => `      
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.cpf}</td>
                        <td>${user.phone}</td>
                        <td><a onclick="userController.delete(${user.value})">deletar</a></td>
                    </tr>
                    
                `).join('')}                
            </tbody>
            
        </table>
        `;
    }
}
