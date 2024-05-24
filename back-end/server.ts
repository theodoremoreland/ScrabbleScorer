// Native modules
import http, { Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

// Third-party
import express, { Express } from "express";

const port: number = process?.env?.PORT ? Number(process.env.PORT) : 8080;

// Server initialization
const app: Express = express();
const server: Server = http.createServer(app);

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile("index.html");
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});