
function redirectPage() {
    document.getElementById("cardUsuarios").onclick = function clickCardUsuarios(){
        window.location.href = "../html/usuarios.html"; 
    };
    document.getElementById("cardPessoaFisica").onclick = function clickCardPessoaFisica(){
        window.location.href = "../html/pessoaFisica.html"; 
    };
}

window.onload = redirectPage();