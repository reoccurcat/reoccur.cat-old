const form = document.getElementById('form2');
const input = document.getElementById('input2');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    return /^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ';
}

function smth() {
    const x2 = document.getElementById("maindiv");
    const x1 = document.getElementById("uv")
    const copy1 = document.getElementById("othersad")
    const copy2 = document.getElementById("buttonThing")
    let pw = window.prompt('Password required to proceed.')
    if (pw === atob('O1BoOXA7PTtXITBrYHptOkQ7NCVLLUVTU1hxbTA5P1c5fElEWlI2W1RpWkVVcDN2VkJYPiZeMGpqJm5nIlZk')) {
        x2.setAttribute('hidden', '')
        x1.removeAttribute('hidden')
    } else if (pw === null) {void(0)} else if (pw === "" || !(pw === "")) {
        document.cookie = `ZmFpbGVkX2F1dGhlbnRpY2F0aW9u=dHJ1ZQ==`
        copy2.setAttribute('hidden', '')
        copy1.removeAttribute('hidden')
    }
}
