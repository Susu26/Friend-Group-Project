let username;

let chatLog = [];
let chatLogJson = {};

// setInterval(() =>{
//     printChatLog();
// },3000);

function sendName() {
    username = document.getElementById("enterName").value;
    document.getElementById("namePopup").style.display = "none";
    document.getElementById("logo-start").style.display = "none";
    document.body.style.backgroundColor = "white";

    initMessages();

    document.querySelector('#messageField').innerHTML = `
        <h2>${username}</h2>
        <label for="enterMessage">Message your friends:</label>
        <input type="text" id="enterMessage">
        <button onclick="sendMessage()" onkeydown="handleKeyPress(event)" class="buttonSend">send</button>
        <button onclick="printChatLog()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
        </svg></button>


        <div style="width: 100%; height: 100%; padding-top: 17px; padding-bottom: 17px; padding-left: 50px; padding-right: 75px; background: #127C87; border-top-left-radius: 25px; border-top-right-radius: 25px; overflow: hidden; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
        <div style="height: 60px; padding-top: 23px; padding-bottom: 14px; padding-left: 28.83px; padding-right: 842.45px; background: white; border-radius: 16px; overflow: hidden; justify-content: flex-start; align-items: center; display: flex">
            <div style="width: 231.71px; height: 23px; opacity: 0.50; background: #127C87"></div>
        </div>
        <div style="width: 61px; height: 60px; position: relative; background: white; border-radius: 16px; overflow: hidden">
            <div style="width: 20px; height: 24.58px; left: 20px; top: 18px; position: absolute; background: #60D4AB"></div>
        </div>
</div>
  `;
}

document.getElementById('messageField').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function initMessages() {
    document.getElementById('messages').style.display = 'flex';

    // methode in ../api/messagesApiManager
    printChatLog();
}


function sendMessage() {
    const now = new Date();

    const newMessage = {
        "id": 12,
        "author": username,
        "message": document.getElementById('enterMessage').value,
        "datetime": now.toString()
    }

    console.log(newMessage);

    // methode in ../api/messagesApiManager
    addMessage(newMessage);

    printMessage(newMessage);
}

function printMessage(messageJson) {
    const messagesDom = document.getElementById('messages');

    document.getElementById('enterMessage').value = '';

    messagesDom.innerHTML += `
    <div class="message">
        ${messageJson.datetime}<br>
        <strong>${messageJson.author}:</strong>
        </br>
        ${messageJson.message}
    </div>
  `;

    messagesDom.scrollTo({
        top: messagesDom.scrollHeight, behavior: 'smooth'
    });
}

async function printChatLog() {
    const chatLogJsonUnsynchronised = chatLogJson;

    await synchroniseLocalChatLog()

    // this command must be after await, because before messagesDom is still display none (because DOM is slow)
    const messagesDom = document.getElementById('messages');

    if (JSON.stringify(chatLogJsonUnsynchronised) !== JSON.stringify(chatLogJson)) {
        console.log('Chat is being synchronised!');
        messagesDom.innerHTML = messagesToHtml(chatLog);

        messagesDom.scrollTo({
            top: messagesDom.scrollHeight,
        });
    } else {
        console.log('Chat is already synchronised!');
    }
}

async function synchroniseLocalChatLog() {
    await readApi().then(apiJson => {
        chatLog = apiJson.record.messages;
        chatLogJson = apiJson.record;
    });
}

function messagesToHtml(messages) {
    let messagesHtml = '';

    for (let i = 0; i < messages.length; i++) {
        const messageJson = messages[i];

        messagesHtml += `
      <div class="message" data-id="${messageJson.id}">
        ${messageJson.datetime}<br>
        <strong>${messageJson.author}:</strong>
        </br>
        ${messageJson.message}
      </div>
    `;
    }

    return messagesHtml;
}