
document.addEventListener('DOMContentLoaded', function() {
    const usuarioSelecionado = JSON.parse(localStorage.getItem('usuarioSelecionado'));
    console.log(usuarioSelecionado);
    console.log(usuarioSelecionado.nome)
    if (usuarioSelecionado) {
        document.getElementById('documento').value = usuarioSelecionado.cnpj;
        document.getElementById('nome').value = usuarioSelecionado.nome;
        document.getElementById('rua').value = usuarioSelecionado.rua;
        document.getElementById('numero').value = usuarioSelecionado.numero;
        document.getElementById('complemento').value = usuarioSelecionado.complemento;
        document.getElementById('bairro').value = usuarioSelecionado.bairro;
        document.getElementById('cidade').value = usuarioSelecionado.cidade;
        document.getElementById('estado').value = usuarioSelecionado.estado;
        document.getElementById('telefone').value = usuarioSelecionado.telefone;
        console.log(usuarioSelecionado.nome)
    } else {
        document.getElementById('detalhesUsuario').textContent = 'Nenhum usuário selecionado.';
    }
});

document.getElementById("voltarBtn").onclick = function voltar(){
    window.location.href = "usuarios.html"
};
