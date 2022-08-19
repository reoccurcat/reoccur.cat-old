const form = document.getElementById('form2');
const input = document.getElementById('input2');

function createFrame(url2) {
    const thing = document.getElementById('uv');
    const thing2 = document.getElementById('ifthing');
    const thing3 = document.getElementById('particles-js');

    let makeIframe = document.createElement("iframe");
    makeIframe.setAttribute("src", `${url2}`);
    makeIframe.setAttribute("scrolling", "yes");
    makeIframe.style.position = "fixed"
    makeIframe.style.top = "0"
    makeIframe.style.bottom = "0"
    makeIframe.style.right = "0"
    makeIframe.style.left = "0"
    makeIframe.style.width = "100%"
    makeIframe.style.height = "100%"
    makeIframe.style.border = "none"
    makeIframe.style.margin = "0"
    makeIframe.style.padding = "0"
    makeIframe.style.overflow = "hidden"
// position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;

    thing.setAttribute('hidden', '')

    thing2.appendChild(makeIframe);
    thing2.removeAttribute('hidden')

    thing3.setAttribute('hidden', '')
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        //thing2.removeAttribute('hidden')

        // window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        let urlthing = __uv$config.prefix + __uv$config.encodeUrl(url);
        createFrame(urlthing)
    });
});

function isUrl(val = ''){
    return /^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ';
}

// function smth() {
//    const x2 = document.getElementById("maindiv");
//    const x1 = document.getElementById("uv")
//    const copy1 = document.getElementById("othersad")
//    const copy2 = document.getElementById("buttonThing")
//    let pw = window.prompt('Password required to proceed.')
//    if (pw === atob('O1BoOXA7PTtXITBrYHptOkQ7NCVLLUVTU1hxbTA5P1c5fElEWlI2W1RpWkVVcDN2VkJYPiZeMGpqJm5nIlZk')) {
//        x2.setAttribute('hidden', '')
//        x1.removeAttribute('hidden')
//    } else if (pw === null) {void(0)} else if (pw === "" || !(pw === atob('O1BoOXA7PTtXITBrYHptOkQ7NCVLLUVTU1hxbTA5P1c5fElEWlI2W1RpWkVVcDN2VkJYPiZeMGpqJm5nIlZk'))) {
//        document.cookie = `ZmFpbGVkX2F1dGhlbnRpY2F0aW9u=dHJ1ZQ==`
//        copy2.setAttribute('hidden', '')
//        copy1.removeAttribute('hidden')
//    }
// }
