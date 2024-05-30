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
  isValidScoringAlgorithmId,
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
  const scoringAlgorithmId = req.query.scoringAlgorithmId ? Number(req.query.scoringAlgorithmId) : undefined;

  if (!word || !scoringAlgorithmId) {
    return res
      .status(400)
      .send("Query parameters 'word' and 'scoringAlgorithmId' are required.");
  }
  
  if (typeof word !== "string") {
    return res
      .status(400)
      .send(`Query parameter: "word" must be a string.`);
  }

  if (typeof scoringAlgorithmId !== "number") {
    return res
      .status(400)
      .send(`Query parameter: "scoringAlgorithmId" must be a number.`);
  }

  if (!isValidScoringAlgorithmId(scoringAlgorithmId)) {
    return res
      .status(400)
      .send(`"${scoringAlgorithmId}" is not a valid scoring algorithm ID. Must be one of ${scoringAlgorithms.map(algorithm => algorithm.id).join(', ')}.`);
  }

  try {
    const scoringAlgorithmName: ScoringAlgorithmName = scoringAlgorithms.find(algorithm => algorithm.id === scoringAlgorithmId)?.name as ScoringAlgorithmName;
    const score: number = scoreWord(word.trim(), scoringAlgorithmName);

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