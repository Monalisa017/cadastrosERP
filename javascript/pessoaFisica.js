

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

function esconderCamposEndereco() {
    document.getElementById("enderecoDiv").style.display = "nome";
};

function exibirEtapaEndereco() {
    document.getElementById("btnProximoEndereco").onclick = function exibir() {
        const nome = document.getElementById("name").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const rg = document.getElementById("rg").value;
        const cpf = document.getElementById("cpf").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        if (!nome || !dataNascimento || !rg || !cpf || !email || !telefone) {
            alert("Para prosseguir preencha corretamente todos os seus dados!")
        } else {
            document.getElementById("enderecoDiv").style.display = "";
            document.getElementById("dadosPessoaisDiv").style.display = "none";
        }
    };
};

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('estado').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('estado').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('estado').value = "...";


            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function showToast() {
    var toast = document.getElementById("toast");
    toast.textContent = "Usuário adicionado com sucesso!";
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 5000);
    setTimeout(function () {
        window.location.href = "usuarios.html";
    }, 3000);

};

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
        showToast();
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
    const cep = document.getElementById("cep").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        alert("Para prosseguir preencha corretamente todos os dados do seu endereço!")
    } else {
        const usuario = { id: generateNextId(), nome: nome, dataNascimento: dataNascimento, rg: rg, cpf: cpf, email: email, telefone: telefone, cep: cep, rua: rua, numero: numero, complemento: complemento, bairro: bairro, cidade: cidade, estado: estado }
        // Criar usuários
        db.createUser(usuario);
    }
};

let db = new UserDB();

// Atualizar usuário
db.updateUser(1, { nome: 'João Atualizado', email: 'joaoatualizado@example.com' });

// Deletar usuário
db.deleteUser(2);

// Ler usuários após atualização e deleção
console.log(db.readUsers());

window.onload = esconderCamposEndereco(); exibirEtapaEndereco();

