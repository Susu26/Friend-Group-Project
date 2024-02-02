const socket = io();

let username;

const messageInputDom = document.getElementById('enterMessage');
const messagesDom = document.getElementById('messages');

function sendName() {
  username = document.getElementById("enterName").value;

  if (checkUsername(username)) {
      document.getElementById("namePopup").style.display = "none";
      document.getElementById("loginScreen").style.display = "none";

      document.getElementById('chatScreen').style.display = 'flex';

      document.body.style.backgroundColor = "white";

      document.getElementById('username').innerHTML = username;
      
      requestMessages();
  }
}

function requestMessages() {
  socket.emit('request-all-messages');
}

// sendMessage
document.getElementById('messageForm').addEventListener('submit', (event) => {
  event.preventDefault();

  if (messageInputDom.value && messageInputDom.value.trim().length > 0) {
    const message = {
      "id": 1,
      "author": username,
      "content": messageInputDom.value,
      "datetime": (new Date()).toDateString()
    }

    socket.emit('send-message', message);

    printAddMessage(message);
    messageInputDom.value = '';
  }
});

function checkUsername(username) {
  // checks whether or not the username is empty, undefined or null
  // open for further name checks in the future

  if (username == undefined || username.length === 0) {
      document.getElementById("errorContainer").innerHTML = "Please enter your username.";
      return false;
  }

  return true;
}

function printAddMessage(message) {
  messagesDom.innerHTML += messagesToHtml([message]);;

  messagesDom.scrollTo({
    top: messagesDom.scrollHeight,
    behavior: 'smooth'
  });
}

function printMessages(messages) {
  messagesDom.innerHTML = messagesToHtml(messages);

  messagesDom.scrollTo({
    top: messagesDom.scrollHeight
  });
}

function messagesToHtml(messages) {
  let messagesHtml = '';

  for (let i = 0; i < messages.length; i++) {
      const messageJson = messages[i];

      let messageRight = '';

      if (messageJson.author === username) {
          messageRight = 'messageRight';
      }

      console.log(typeof messageJson.datetime);

      messagesHtml += `
      <div class="messageWrapper ${messageRight}">
          <div class="message" data-id="${messageJson.id}">
              ${messageJson.datetime}<br>
              <strong>${messageJson.author}:</strong>
              </br>
              <div class="messageContent">
                ${messageJson.content}
              </div>
          </div>
      </div>
      `;
  }

  return messagesHtml;
}

socket.on('send-all-messages', (messageArray) => {
  printMessages(messageArray);
});

socket.on('broadcast-message', (message) => {
  printAddMessage(message);
});