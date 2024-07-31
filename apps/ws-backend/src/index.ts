import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

let httpServer = app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
	ws.send("Welcome to the App!");
});
