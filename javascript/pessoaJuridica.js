document.getElementById('telefone').addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,5})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});


document.getElementById("cnpj").onchange = async function buscarDadosCNPJ() {
    const cnpjValue = document.getElementById("cnpj").value;
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpjValue}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          // Nota: ReceitaWS pode requerer headers adicionais ou nenhum.
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();      
      document.getElementById("cnpj").value = data.cnpj;
      document.getElementById("razaoSocial").value = data.razao_social; 
      document.getElementById("economicaPrincipal").value = data.cnae_fiscal_descricao;       
      document.getElementById("naturezaJuridica").value = data.natureza_juridica;
      document.getElementById("telefone").value = data.ddd_telefone_1;  
      document.getElementById("cep").value = data.cep; 
      document.getElementById("rua").value = data.descricao_tipo_de_logradouro + data.logradouro; 
      document.getElementById("numero").value = data.numero; 
      document.getElementById("bairro").value = data.bairro; 
      document.getElementById("cidade").value = data.municipio; 
      document.getElementById("estado").value = data.uf; 
      return data;
    } catch (error) {
      console.error("Erro na requisição ao CNPJ:", error);
    }
  }

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
}

// Exemplo de uso

document.getElementById("btnEnviar").onclick = function enviarRegistro() {
  console.log("Entrando");
  let db = new UserDB();
  let lastId = 1;

  function generateNextId() {
      return ++lastId;
  }
  const cnpj = document.getElementById("cnpj").value;
  const razaoSocial = document.getElementById("razaoSocial").value;
  const economicaPrincipal = document.getElementById("economicaPrincipal").value;
  const naturezaJurica = document.getElementById("naturezaJuridica").value;
  const telefone = document.getElementById("telefone").value;
  const cep = document.getElementById("cep").value;
  const rua = document.getElementById("rua").value;
  const numero = document.getElementById("numero").value;
  const complemento = document.getElementById("complemento").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;

  if (!cnpj || !razaoSocial || !economicaPrincipal || !naturezaJurica || !cep || !rua || !numero || !bairro || !cidade || !estado) {
      alert("Para prosseguir preencha corretamente todos os dados do seu CNPJ!")
  } else {
      const usuario = { id: generateNextId(), cnpj: cnpj, nome: razaoSocial, telefone: telefone, cep: cep, rua: rua, numero: numero, complemento: complemento, bairro: bairro, cidade: cidade, estado: estado }
      // Criar usuários
      db.createUser(usuario);
  }
};

let db = new UserDB();

// Ler usuários após atualização e deleção
console.log(db.readUsers());

