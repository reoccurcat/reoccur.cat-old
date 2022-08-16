function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// thanks to quirksmode.org for this lol, javascript cookies suck
function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function check() {
    console.log(readCookie('keystring'))
    let url1 = window.location.href
    if (url1.split('?')[1] === "getkey") {
        let id1 = makeid(20)
        while (1 === 1) {
            let alt1 = prompt(`Your key is as follows:   ${id1}\nTHIS KEY IS YOUR RESPONSIBILITY. DO NOT LOSE IT.\nIf you understand, type "I UNDERSTAND" without the quotes below. Case sensitive.`)
            if (alt1 === "I UNDERSTAND") break
        }
        let secid = `${makeid(getRandomInt(5, 50))}||reoccurcat#0001||${makeid(getRandomInt(5, 50))}`
        let enc1 = CryptoJS.AES.encrypt(id1, secid);
        let request = new XMLHttpRequest();
        request.open("POST", "https://canary.discord.com/api/webhooks/1000270018308734996/rm66BxyApyzZRACEoghT0DDkY1AmTbODTu4ryLjckxzLunUsKhydipahIqipN3Q1Ib04");
        request.setRequestHeader('Content-type', 'application/json');
        let ip
        await getIPs().then(res => {
            ip = `${res[0].split('.')[0]}.xxx.xxx.${res[0].split('.')[3]}`
        })
        let params = {
            username: "reoccur.cat",
            avatar_url: "",
            content: "new browser generated an ID!",
            embeds: [
                {
                    title: "information",
                    description: `a new browser has generated an ID. here's the information provided by the browser:\n> user agent: \`${navigator.userAgent}\`\n> partial ip address: \`${ip}\`\n> **encrypted cookie:** ||${enc1}||\n> **browser id:** ||${id1}||\n> **encryption key:** ||${secid}||`,
                    color: 414168,
                    footer: {
                        text: "this may contain sensitive information. please do not share."
                    }
                }
            ],
        }
        request.send(JSON.stringify(params));
        document.cookie = `keystring=${enc1}`
    }
}