const form = document.getElementById('form');
const email = document.getElementById('email');
const errorMsg = document.getElementById('error');

form.addEventListener('submit', e => {
    e.preventDefault();
    const emailValue = email.value;
    if (!validateEmail(emailValue)) {
        form.classList.add('form--error');
        errorMsg.style.display = 'block';
    } else {
        form.classList.remove('form--error');
        errorMsg.style.display = 'none';
    }
});


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}