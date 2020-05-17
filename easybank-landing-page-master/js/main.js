const toggleBtn = document.getElementById('toggle');
const menu = document.getElementById('navbar');
const image = document.getElementById('icon-hamburger');
const closeIcon = "./images/icon-close.svg";
const openIcon = "./images/icon-hamburger.svg";
let toggle = true;

toggleBtn.addEventListener('click', function(){
    menu.classList.toggle('open');
    toggle === true ? image.src  = closeIcon: image.src= openIcon
    toggle = !toggle;
});

function checker() {
    if(screen.width > 768) {
        menu.classList.remove('open');
        image.src= openIcon;
    }
}

window.addEventListener('resize', checker);