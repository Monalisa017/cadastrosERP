

document.getElementById('telefone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,5})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

document.getElementById('rg').addEventListener('input', function (e) {
    var valor = e.target.value.replace(/[^0-9xX]/g, '');
    valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = valor;
});

document.getElementById('cpf').addEventListener('input', function (e) {
    var valor = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não dígitos
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Insere ponto após o terceiro dígito
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Insere segundo ponto após o sexto dígito
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere hífen antes dos dois últimos dígitos
    e.target.value = valor;
});


// Simula um "Banco de Dados" com localStorage
class UserDB {
    constructor() {
        this.key = 'users';
    }

    // Cria ou adiciona um novo usuário
    createUser(user) {
        let users = JSON.parse(localStorage.getItem(this.key)) || [];
        users.push(user);
        localStorage.setItem(this.key, JSON.stringify(users));
        window.location.href = "usuarios.html"
    }

    // Lê todos os usuários
    readUsers() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    // Atualiza um usuário pelo ID
    updateUser(id, newUserDetails) {
        let users = this.readUsers();
        let userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...newUserDetails };
            localStorage.setItem(this.key, JSON.stringify(users));
        }
    }

    // Deleta um usuário pelo ID
    deleteUser(id) {
        let users = this.readUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem(this.key, JSON.stringify(users));
    }
}

// Exemplo de uso

document.getElementById("btnEnviar").onclick = function enviarRegistro() {
    console.log("Entrando");
    let db = new UserDB();
    let lastId = 1;

    function generateNextId() {
        return ++lastId;
    }
    const nome = document.getElementById("name").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const rg = document.getElementById("rg").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const usuario = { id: generateNextId(), nome: nome, dataNascimento: dataNascimento, rg: rg, cpf: cpf, email: email, telefone: telefone }
    // Criar usuários
    db.createUser(usuario);

    // Ler usuários
    console.log(db.readUsers());
};

let db = new UserDB();

// Atualizar usuário
db.updateUser(1, { nome: 'João Atualizado', email: 'joaoatualizado@example.com' });

// Deletar usuário
db.deleteUser(2);

// Ler usuários após atualização e deleção
console.log(db.readUsers());

