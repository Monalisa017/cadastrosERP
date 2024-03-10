
function redirectPage() {
    document.getElementById("cardUsuarios").onclick = function clickCardUsuarios(){
        window.location.href = "../html/usuarios.html"; 
    };
    document.getElementById("cardPessoaFisica").onclick = function clickCardPessoaFisica(){
        window.location.href = "../html/pessoaFisica.html"; 
    };
    document.getElementById("cardPessoaJuridica").onclick = function clickcardPessoaJuridica(){
        window.location.href = "../html/pessoaJuridica.html"; 
    };
}

window.onload = redirectPage();