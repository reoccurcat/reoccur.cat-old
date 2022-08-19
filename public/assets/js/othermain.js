const form = document.getElementById('form2');
const input = document.getElementById('input2');

function createFrame(url) {
    const thing = document.getElementById('uv');
    const thing2 = document.getElementById('ifthing');

    var makeIframe = document.createElement("iframe");
    makeIframe.setAttribute("src", url);
    makeIframe.setAttribute("scrolling", "no");
    makeIframe.style.border = "none";
    makeIframe.style.left =  "-453px";
    makeIframe.style.top = "-70px";
    makeIframe.style.position = "absolute";
    makeIframe.style.width = "1440px";
    makeIframe.style.height = "775px";

    var makediv = document.createElement("div");
    makediv.style.height = "43px";
    makediv.style.width = "564px";
    makediv.style.position = "relative";
    makediv.style.overflow = "hidden";

    thing.setAttribute('hidden', '')

    makediv.appendChild(makeIframe);

    var getRef = document.getElementById("uv");
    var parentDiv = getRef.parentNode;
    parentDiv.insertBefore(makediv, getRef);
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
