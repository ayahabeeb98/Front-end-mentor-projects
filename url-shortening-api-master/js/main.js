const toggleBtn = document.querySelector('.btn__toggle');
const toggleImg = document.querySelector('.btn__toggle img');
const menu = document.querySelector('.nav__container');
const form = document.querySelector('form');
const urlInp = document.querySelector('#url');
const errorMsg = document.querySelector('span.error');
const errorWrapper = document.querySelector('.form__group');
const responseWrapper = document.querySelector('.response_urls');
let toggle = true;


toggleBtn.addEventListener('click',e => {
    toggle ? toggleImg.src = './images/icon-close.svg' : toggleImg.src = './images/icon-hamburger.svg';
    menu.classList.toggle('open');

    toggle = !toggle;
});

function handleError(txt) {
    if (txt){
        urlInp.classList.add('error');
        errorWrapper.classList.add('error');
        errorMsg.textContent = txt;
    }else {
        urlInp.classList.remove('error');
        errorWrapper.classList.remove('error');
        errorMsg.textContent = '';
    }
}

form.addEventListener('submit',e => {
    e.preventDefault();
    handleError();

    const userURL = urlInp.value;
    if (userURL.length !== 0) {
        fetch(`https://api.shrtco.de/v2/shorten?url=${userURL}`)
            .then(res => res.json())
            .then(data => {
            //    Handle response
                    // If there is an error
                console.log(data);
                if(!data.ok) {
                    let {error_code} = data;
                    switch (error_code) {
                        case 2:
                            handleError('Invalid URL submitted');
                            break;
                        case 8:
                            handleError('Invalid code submitted');
                            break;
                        case 10:
                            handleError('Trying to shorten a disallowed Link');
                            break;
                        default:
                            handleError('Something went wrong, please try again');
                            break;
                    }
                }else {
                     // Handle success response
                    urlInp.value = '';
                    const {short_link,code} = data.result;
                    //create the wrapper div
                    const urlWrapper = document.createElement('div');
                    urlWrapper.classList.add('urlWrapper');
                    //create p to add the base URL
                    const baseURL = document.createElement('p');
                    baseURL.textContent = userURL;
                    baseURL.classList.add('base_url');
                    urlWrapper.appendChild(baseURL);

                    // create a wrapper to the short link and copy btn
                    const shortUrlWrapper = document.createElement('div');
                    shortUrlWrapper.classList.add('d-flex');
                    urlWrapper.appendChild(shortUrlWrapper);

                    //create anchor for the short link
                    const shortURL = document.createElement('a');
                    shortURL.textContent = short_link;
                    shortURL.href = short_link;
                    shortURL.classList.add('short_link');
                    shortUrlWrapper.appendChild(shortURL);

                    //creat a hidden input to copy its value when copy button clicked
                    const hiddenURL = document.createElement('input');
                    hiddenURL.type = 'hidden';
                    hiddenURL.setAttribute('id',code);
                    hiddenURL.value = short_link;
                    responseWrapper.appendChild(hiddenURL);

                    //create the copy btn
                    const copyBtn = document.createElement('button');
                    copyBtn.textContent = "Copy";
                    copyBtn.className += " btn btn-info";
                    copyBtn.addEventListener('click',()=>{
                        copyBtn.textContent = "Copied!";
                        copyBtn.classList.add('copy-btn');
                        const linkToCopy = document.getElementById(code);
                        linkToCopy.type = 'text'; //change input type to be able to copy it
                        linkToCopy.select();
                        document.execCommand("copy");
                        linkToCopy.type = 'hidden';
                    });
                    shortUrlWrapper.appendChild(copyBtn);


                    urlWrapper.appendChild(shortUrlWrapper);
                    responseWrapper.appendChild(urlWrapper);
                }

            })
            .catch(e=> {
                console.log(e.error);
                errorMsg.textContent = `${e.error}`;
            })
    }else{
        handleError('please add a link');
    }
});