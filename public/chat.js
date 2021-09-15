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

function showMessages({onlineUsers, messages}) {
  document.getElementById("onlineUsers").innerText = onlineUsers;
  document.getElementById("messages").innerHTML = JSON.stringify(messages, null, 4);
}

function logIn() {
  socket.emit("login", user)
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

function sendMessage() {
  let message = document.getElementById("message")
  socket.emit("newMessage", {user, message: message.value});
  message.value = ""
  changePlaceholder();
}