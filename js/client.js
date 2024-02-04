const socket = io("http://localhost:8000");


//get DOM element in respective js variable
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

//function which will append event info to the container
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

//ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

//if new user joins ,receive his name from server
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

//if server sends a msg receivr it
socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

//if user leaves the chat, append the info to the container
socket.on("left", (name) => {
  append(`${data.name} left the chat`, "right");
})

//if the form gets subitted send message to server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
