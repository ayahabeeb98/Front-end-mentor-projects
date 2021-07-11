const btnToggle = document.querySelector('.btn--toggle');
const btnToggleIcon = document.querySelector('.btn--toggle img');
const menu = document.querySelector('.nav__list');
const closeIcon = "./images/icon-close.svg";
const openIcon = "./images/icon-hamburger.svg";
let toggle = true;

btnToggle.addEventListener('click', () => {
    toggle === true ? btnToggleIcon.src = closeIcon : btnToggleIcon.src = openIcon;
    menu.classList.toggle('show');
    document.body.classList.toggle('shadow');
    toggle = !toggle;
});


const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

const contactForm = document.querySelector('#contact');
const emailControl = document.querySelector('.form-control');
const errorMsg = document.querySelector('.errorMsg');

contactForm.addEventListener('submit', validation);

function validation(e) {
    e.preventDefault();
    console.log(validateEmail(emailControl.value.trim()));
    if (!validateEmail(emailControl.value.trim())) {
        emailControl.classList.add('error');
        errorMsg.style.display = 'block';
        return false
    }

    return true
}

/**
 * @return {boolean}
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
