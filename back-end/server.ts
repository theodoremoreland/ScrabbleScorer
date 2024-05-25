// Native modules
import http, { Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

// Third-party
import express, { Express } from "express";
import checkWord from "check-word";

// Custom
import { scoringAlgorithms } from "./modules/scoringAlgorithms.ts";

const port: number = process?.env?.PORT ? Number(process.env.PORT) : 8080;
const words = checkWord("en");

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

app.get("score-word", (req, res) => {
  const word: string = req.query.word;
  const scoringAlgorithm: string = req.query.scoringAlgorithm;

  if (!words.check(word)) {
    res.status(400).send("Invalid word.");
  }

  res.status(200);
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});