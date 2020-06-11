const toggleBtn = document.querySelector('#toggle');
const menu = document.querySelector('#top-nav');
const email = document.querySelector('#email');
const form = document.querySelector('.formContainer');
const errorMsg = document.querySelector('.errorMsg');
const links = document.querySelectorAll('.nav-item');
const image = document.getElementById('icon-hamburger');
const closeIcon = "./images/icon-close.svg";
const openIcon = "./images/icon-hamburger.svg";
let toggle = true;

//Mobile Menu
toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle === true ? image.src = closeIcon : image.src = openIcon;
    toggle = !toggle;
});

//Close Menu when click on the link
links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle === true ? image.src = closeIcon : image.src = openIcon;
        toggle = !toggle;
    });


});

function checker() {
    if (screen.width > 768) {
        menu.classList.remove('open');
        image.src = openIcon;
    }
}

window.addEventListener('resize', checker);


//Tab menu script
const tabsMenu = document.querySelector('#nav-tab');
tabsMenu.addEventListener('click', showPanel);

function showPanel(e) {
    const tabs = document.querySelectorAll('.active');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    e.target.classList.add('active');

    document.getElementById(e.target.href.split('#')[1]).className += ' active';
}


function validation() {
    let emailValue = email.value;
    form.classList.remove('error');

    if (!emailValue) {
        form.classList.add('error');
        errorMsg.innerHTML = "Email must be filled out";
        return false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
        form.classList.add('error');
        errorMsg.innerHTML = "whoops, make sure it's an email";
        return false;
    }

    return true;
}


