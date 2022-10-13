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
    chat.socket = new WebSocket("wss://repeated-hill-amazonsaurus.glitch.me");

    // (A4) ON CONNECT - ANNOUNCE "I AM HERE" TO THE WORLD
    chat.socket.addEventListener("open", () => {
      chat.controls(1);
      chat.send("Joined the chat room.");
    });

    // (A5) ON RECEIVE MESSAGE - DRAW IN HTML
    chat.socket.addEventListener("message", (evt) => {
      chat.draw(evt.data);
    });

    // (A6) ON ERROR & CONNECTION LOST
    chat.socket.addEventListener("close", () => {
      chat.controls();
      alert("Websocket connection lost!");
    });
    chat.socket.addEventListener("error", (err) => {
      chat.controls();
      console.log(err);
      alert("Websocket connection error!");
    });
  },

  // (B) TOGGLE HTML CONTROLS
  controls : (enable) => {
    if (enable) {
      chat.emsg.disabled = false;
      chat.ego.disabled = false;
    } else {
      chat.emsg.disabled = true;
      chat.ego.disabled = true;
    }
  },

  // (C) SEND MESSAGE TO CHAT SERVER
  send : (msg) => {
    if (msg == undefined) {
      msg = chat.emsg.value;
      msg += "(async () => {\
    // create and show the notification\
    const showNotification = () => {\
        // create a new notification\
        const notification = new Notification('JavaScript Notification API', {\
            body: 'This is a JavaScript Notification API demo',\
            icon: './img/js.png'\
        });\
\
        // close the notification after 10 seconds\
        setTimeout(() => {\
            notification.close();\
        }, 10 * 1000);\
\
        // navigate to a URL when clicked\
        notification.addEventListener('click', () => {\
\
            window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');\
        });\
    }\
\
    // show an error message\
    const showError = () => {\
        const error = document.querySelector('.error');\
        error.style.display = 'block';\
        error.textContent = 'You blocked the notifications';\
    }\
\
    // check notification permission\
    let granted = false;\
\
    if (Notification.permission === 'granted') {\
        granted = true;\
    } else if (Notification.permission !== 'denied') {\
        let permission = await Notification.requestPermission();\
        granted = permission === 'granted' ? true : false;\
    }\
\
    // show notification or error\
    granted ? showNotification() : showError();\
\
})();";
      if(msg == "/colorme")
	{
	    chat.color = genRanHex(6);
    	    let row = document.createElement("div");
    	    row.className = "chatRow";
    	    row.innerHTML = `<div class="chatName" style="background-color: #${chat.color};">System</div> <div class="chatMsg">Your new color <font size="2">(Only you can see this message)</font></div>`;
    	    chat.ewrap.appendChild(row);
	    return false;
	}
	console.log(msg.search("/colorme "));
      if(msg.search("/colorme ") == 0)
	{
	    chat.color = msg.replace("/colorme ", "");
    	    let row = document.createElement("div");
    	    row.className = "chatRow";
    	    row.innerHTML = `<div class="chatName" style="background-color: ${chat.color};">System</div> <div class="chatMsg">Your new color <font size="2">(Only you can see this message)</font></div>`;
    	    chat.ewrap.appendChild(row);
	    return false;
	}
      chat.emsg.value = "";
    }
    chat.socket.send(JSON.stringify({
      name: chat.name,
      color: chat.color,
      msg: msg
    }));
    return false;
  },

  // (D) DRAW MESSAGE IN HTML
  draw : (msg) => {
    // (D1) PARSE JSON
    msg = JSON.parse(msg);
    console.log(msg);

    // (D2) CREATE NEW ROW
    let row = document.createElement("div");
    row.className = "chatRow";
    row.innerHTML = `<div class="chatName" style="background-color: #${msg["color"]};">${msg["name"]}</div> <div class="chatMsg">${msg["msg"]}</div><audio autoplay><source src="btn.wav"/></audio>`;
    chat.ewrap.appendChild(row);

    // AUTO SCROLL TO BOTTOM MAY NOT BE THE BEST...
    window.scrollTo(0, document.body.scrollHeight);
  }
};
window.addEventListener("DOMContentLoaded", chat.init);
