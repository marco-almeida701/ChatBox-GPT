const apikey = "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"

function sendMessage() {
    var message = document.getElementById('message')

    if(!message.value) {
        message.style.border = '1px solid red'
        return
    }

    message.style.border = 'none'

    var status = document.getElementById('status')
    var btn = document.getElementById('btn')

    status.style.display = 'block'
    status.innerHTML = ('Carregando...')
    btn.disabled = true
    btn.style.cursor = 'not-allowed'
    message.disabled = true

    fetch("https://api.openai.com/v1/completions",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: message.value,
            max_tokens: 2000,
            temperature: 0.5
        })
    })
    .then((response) => response.json())
    .then((response) => {
        let r = response.choices [0] ['text']
        status.style.display = 'none'
        showHistoric(message.value,r)
    })
    .catch((e) => {
        console.log('Error -> ',e)
    })
    .finally(() => {
        btn.disabled = false
    btn.style.cursor = 'pointer'
    message.disabled = false
    })
}

function showHistoric(message,response) {
    var historic = document.getElementById('historic')

    //My messages
    var MyMessage = document.createElement('div')
    MyMessage.className = 'my-message'

    var msg = document.createElement('p')
    msg.className = 'my-msg'
    msg.innerHTML = message

    MyMessage.appendChild(msg)
    historic.appendChild(MyMessage)

    //Response messages
    var boxResponse = document.createElement('div')
    boxResponse.className = 'box-response'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'chat-response'
    chatResponse.innerHTML = response

    boxResponse.appendChild(chatResponse)
    historic.appendChild(boxResponse)

    //Take scroll to the end
    historic.scrollTop = historic.scrollHeight
}