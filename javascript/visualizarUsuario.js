/*document.addEventListener('DOMContentLoaded', function() {
    const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    console.log(dadosUsuario)
    if (dadosUsuario) {
        document.getElementById('nome').value = dadosUsuario.nome;
        /*const dadosUsuarioHTML = `
            <p>Nome: ${dadosUsuario.nome}</p>
            <p>Email: ${dadosUsuario.email}</p>
        `;
        document.getElementById('div1').innerHTML = dadosUsuarioHTML;
    } else {
        document.getElementById('dadosUsuario').textContent = 'Nenhum dado do usuário encontrado.';
    }
});*/

document.addEventListener('DOMContentLoaded', function() {
    const usuarioSelecionado = JSON.parse(localStorage.getItem('usuarioSelecionado'));
    console.log(usuarioSelecionado);
    console.log(usuarioSelecionado.nome)
    if (usuarioSelecionado) {
        /*const detalhesUsuarioHTML = `
            <p>Nome: ${usuarioSelecionado.nome}</p>
            <p>Email: ${usuarioSelecionado.email}</p>
            <!-- Adicione mais detalhes conforme necessário -->
        `;
        document.getElementById('detalhesUsuario').innerHTML = detalhesUsuarioHTML;*/
        document.getElementById('nome').value = usuarioSelecionado.nome;
        console.log(usuarioSelecionado.nome)
    } else {
        document.getElementById('detalhesUsuario').textContent = 'Nenhum usuário selecionado.';
    }
});
