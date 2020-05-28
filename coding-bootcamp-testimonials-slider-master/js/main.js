const slideOne = document.querySelector('.slide__one');
const slideTwo = document.querySelector('.slide__two');
const prev = document.querySelector('.btn__prev');
const imgs = ["./images/image-tanya.jpg","./images/image-john.jpg"];
const next = document.querySelector('.btn__next');
const speaker = document.querySelector('#speaker');

next.addEventListener('click', () => {
    speaker.src = imgs[1];
    toggle(slideOne,slideTwo)
});


prev.addEventListener('click', () => {
    speaker.src = imgs[0];
    toggle(slideTwo,slideOne)
});


function toggle(firstSlide,secSlide) {
    firstSlide.style.display = 'none';
    secSlide.style.display = 'block';
}