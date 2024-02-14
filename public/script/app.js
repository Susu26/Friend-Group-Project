const socket = io();

let username;

const messageInputDom = document.getElementById('enterMessage');
const messagesDom = document.getElementById('messages');

if (usernameIsset()) {
  console.log(username);
  //changeScreenToChat();
  changeScreenToSelectGroup();
}

function sendName() {
  username = document.getElementById("enterName").value;
  console.log(username);

  if (checkUsername(username)) {
    //changeScreenToChat();
    changeScreenToSelectGroup();

    saveUsername();
  }
}

function changeScreenToChat() {
  document.getElementById("namePopup").style.display = "none";
  document.getElementById("loginScreen").style.display = "none";

  document.getElementById('chatScreen').style.display = 'flex';

  document.getElementById('username').innerHTML = username;

  document.body.style.backgroundColor = "white";

  requestMessages();

}

function changeScreenToSelectGroup() {
  document.getElementById("namePopup").style.display = "none";
  document.getElementById("loginScreen").style.display = "none";

  document.getElementById('groupSelectScreen').style.display = 'flex';

  document.getElementById('username').innerHTML = username;

  document.body.style.backgroundColor = "white";
}

function changeScreenToLogin() {
  document.getElementById("namePopup").style.display = "block";
  document.getElementById("loginScreen").style.display = "flex";

  document.getElementById('chatScreen').style.display = 'none';
}

function saveUsername() {
  localStorage.setItem("username", username);
}

function usernameIsset() {
  let savedUsername = localStorage.getItem("username");
  if (savedUsername != undefined) {
    username = savedUsername;
    console.log(savedUsername);
    return true;
  } 
  return false;
}

function logoutUser() {
  // Clear username from localstorage
  localStorage.removeItem("username");
  changeScreenToLogin();
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
              <div class="messageContent">
                ${messageJson.content}
              </div>
              <div class="messageFooter">
                <div class="messageAuthor">
                  ~${messageJson.author}
                </div>
                <div class="messageTime">
                  ${messageJson.datetime}
                </div>
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