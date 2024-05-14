function createDomElement(string){
    const parser = new DOMParser()
    const html = parser.parseFromString(string, 'text/html').body.firstChild
    return html
}

function createMessage(message){
    const template = `
        <article class="message">
            <div class="message-body">
                ${message}
            </div>
        </article>
    `

    return createDomElement(template)
}

const socket = io();

const message = document.getElementById("messages");

const inputMessages = document.getElementById("messages");

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputMessages.value) {
    socket.emit("message", inputMessages.value);
    inputMessages.value = "";
  }
});

socket.on("message", (msg) => message.appendChild(createMessage(msg)));
