// Native modules
import http, { Server } from "http";
import path from "path";

// Third-party
import express, { Express } from "express";
import cors from "cors";

// Custom
import { 
  scoringAlgorithms,
  ScoringAlgorithmName,
  isScoringAlgorithmName,
  scoreWord,
} from "./modules/scoringAlgorithms";

const port: number = process.env.PORT ? Number(process.env.PORT) : 8080;

// Server initialization
const app: Express = express();
const server: Server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile("index.html");
});

app.get("/scoring-algorithms", (_, res) => {
  res.json(scoringAlgorithms);
});

app.get("/score-word", (req, res) => {
  const word = req.query.word;
  const scoringAlgorithmName = req.query.scoringAlgorithmName;

  if (!word || !scoringAlgorithmName) {
    return res
      .status(400)
      .send("Query parameters 'word' and 'scoringAlgorithmName' are required.");
  }
  
  if (typeof word !== "string" || typeof scoringAlgorithmName !== "string") {
    return res
      .status(400)
      .send("Query parameters 'word' and 'scoringAlgorithmName' must be strings.");
  }

  if (!isScoringAlgorithmName(scoringAlgorithmName)) {
    return res
      .status(400)
      .send(`"${scoringAlgorithmName}" is not a valid scoring algorithm. Must be one of ${Object.values(ScoringAlgorithmName).join(", ")}.`);
  }

  try {
    const score: number = scoreWord(word, scoringAlgorithmName);

    return res
      .status(200)
      .json({ score });
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : String(error);

    return res
      .status(400)
      .send(errorMessage);
  }
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});