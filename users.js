function userAdd(msg) {
    // (D1) PARSE JSON
    msg = JSON.parse(msg);
    console.log(msg);

    // (D2) CREATE NEW ROW
    let row = document.createElement("div");
    row.className = "chatRow";
    row.innerHTML = `<div class="chatName" style="background-color: #${msg["color"]};">${msg["name"]}</div>`;
    chat.ewrap.appendChild(row);

  }
let socket = new WebSocket("wss://repeated-hill-amazonsaurus.glitch.me");
// (A5) ON RECEIVE MESSAGE - DRAW IN HTML
socket.addEventListener("getUsers", (evt) => {
  userAdd(evt.data);
  console.log(evt.data);
});
  // (D) DRAW MESSAGE IN HTML