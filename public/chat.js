const socket = io("ws://localhost:2006");
const user = auth(window.localStorage);
logIn();

socket.on("showMessages", showMessages)

function auth(localStorage) {
  const user = {}
  if ("userName" in localStorage) {
    document.getElementById("userName").innerText = localStorage.userName;
  } else {
    let userName = prompt("Ingrese su nombre de usuario:");
    localStorage.userName = userName;
  }
  user.userName = localStorage.userName;
  return user
}

function showMessages({ onlineUsers, messages }) {
  document.getElementById("onlineUsers").innerText = onlineUsers;
  renderMessages(messages)
}

function logIn() {
  socket.emit("login", user)
  document.getElementById("userName").innerText = user.userName;
}

function logOut() {
  if (confirm(`Cerrar sesión con el usuario ${user.userName}?`)) {
    if ("userName" in localStorage) {
      delete localStorage.userName
      socket.emit("logout", user);
      console.log(`${user.userName} left the chat 😢`);
    }
  }
}

function sendMessage(e) {
  e.preventDefault();
  let message = document.getElementById("message")
  if (message.value.trim().length > 0) {
    socket.emit("newMessage", { user, message: message.value });
    message.value = ""
    changePlaceholder();
  }
}

function renderMessages(messages) {
  const chatHistory = document.getElementById("messages");
  chatHistory.innerHTML = messages.map(m => `
    <div class="message-box">
      <span class="user-info${m.user.userName == user.userName ? " own-message" : ""}">${m.user.userName}${m.user.userName == user.userName ? " (Tú)" : ""}</span>
      <p class="message"><i>${m.text}</i></p>
    </div>
  `).join(" ");
  chatHistory.scrollTop = chatHistory.scrollHeight;
}