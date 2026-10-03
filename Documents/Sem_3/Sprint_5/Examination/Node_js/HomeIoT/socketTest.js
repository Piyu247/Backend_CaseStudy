const { io } = require("socket.io-client");

const socket = io("http://localhost:8080");

socket.on("connect", () => {
    console.log("Connected:", socket.id);

    socket.emit("deviceControl", {
        deviceId: "6abf65e92cb5cc3269a53b38",
        status: "ON"
    });
});

socket.on("deviceUpdate", (data) => {
    console.log("Device update received:", data);
    socket.disconnect();
});

socket.on("disconnect", () => {
    console.log("Disconnected");
});