function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;

    if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    } else {
        // Se todos os campos estiverem preenchidos, redirecione para perfil.html
        //window.location.href = "perfil.html";
        return true;
    }
}