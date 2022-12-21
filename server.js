import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data, isBinary) {
    let isValidData;

    try {
      isValidData = typeof JSON.parse(data) === "object";
    } catch (error) {
      isValidData = false;
    }

    if (!isValidData) return;

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/controls", (req, res) => {
  res.sendFile(path.join(__dirname, "/controls.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "/result.html"));
});

server.listen(port, () => console.log("Server started at port " + port));
