function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

class UserDB {
    constructor() {
        this.key = 'users';
    }

    // Lê todos os usuários
    readUsers() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

}

let db = new UserDB();

// Função para adicionar usuários à lista
function adicionarUsuarios() {
    const usuarios = [
        db.readUsers()
    ];
    console.log(usuarios)
    const listaUsuarios = document.getElementById('lista-usuarios');

    // Limpa a lista antes de adicionar os usuários
    listaUsuarios.innerHTML = '';

    // Adiciona cada usuário à lista
    db.readUsers().forEach(usuario => {

        const li = document.createElement('li');
        const img = document.createElement('img');
        const img2 = document.createElement('img');
        const img3 = document.createElement('img');
        const div = document.createElement('div');

        img.src = "../assets/imagens/search.png";
        img2.src = "../assets/imagens/edit.png";
        img3.src = "../assets/imagens/garbage-bin.png";

        img.id = "visualizar";
        img.className = "icon";

        img2.id = "editar";
        img2.className = "icon"

        img3.id = "excluir";
        img3.className = "icon";

        div.id = "divIcons";
        div.className = "divIcons";

        const data = new Date(usuario.dataNascimento);
        li.textContent = `${usuario.nome}`;

        div.appendChild(li);
        div.appendChild(img);
        div.appendChild(img2);
        div.appendChild(img3);
        listaUsuarios.appendChild(li)
        listaUsuarios.appendChild(div);

        img.onclick = function () {
            alert("Pegando VISUALIZAR");
        };
        img2.onclick = function () {
            alert("Pegando editar");
        };
        img3.onclick = function () {
            alert("Pegando excluir");
        };
    });
}

//${formatarData(data)} ${usuario.rg} ${usuario.cpf}  ${usuario.email} ${usuario.telefone}
// Chama a função para adicionar os usuários quando a página carrega
window.onload = adicionarUsuarios;

