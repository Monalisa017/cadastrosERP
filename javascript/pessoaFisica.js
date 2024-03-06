

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
