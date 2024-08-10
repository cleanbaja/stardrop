const start_req = {
    type: "connect-host",
    localId: "akapofkpfaokspofasdfasfasdafsdfa",
}

const socket = new WebSocket("ws://localhost:9001");
socket.onopen = (self) => {
    socket.send(JSON.stringify(start_req));
};

socket.onmessage = (ev) => {
    console.log(ev.data);
};