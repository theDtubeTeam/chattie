const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
var chat = {
  // (A) INIT CHAT
  name : null, // USER'S NAME
  socket : null, // CHAT WEBSOCKET
  ewrap : null, // HTML CHAT HISTORY
  emsg : null, // HTML CHAT MESSAGE
  ego : null, // HTML CHAT GO BUTTON
  init : () => {
    // (A1) GET HTML ELEMENTS
    chat.ewrap = document.getElementById("chatShow");
    chat.emsg = document.getElementById("chatMsg");
    chat.ego = document.getElementById("chatGo");
    chat.color = genRanHex(6);
    // (A2) USER'S NAME
    chat.name = prompt("What is your name?", "John");
    if (chat.name == null || chat.name=="") { chat.name = "Mysterious"; }

    // (A3) CONNECT TO CHAT SERVER
    chat.socket = new WebSocket("ws://repeated-hill-amazonsaurus.glitch.me:80");

    // (A4) ON CONNECT - ANNOUNCE "I AM HERE" TO THE WORLD
    chat.socket.addEventListener("open", () => {
      chat.controls(1);
      chat.send("Joined the chat room.");
    });

    // (A5) ON RECEIVE MESSAGE - DRAW IN HTML
    chat.socket.addEventListener("user", (evt) => {
      chat.userAdd(evt.data);
    });
};