const start_req = {
    type: "connect-user",
    code: 507018,
    remoteId: "akapofkpfaokspofasdfasfasdafsdfa",
}

const socket = new WebSocket("ws://localhost:9001");
socket.onopen = (self) => {
    socket.send(JSON.stringify(start_req));
};

socket.onmessage = (ev) => {
    console.log(ev.data);
};