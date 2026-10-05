import express from "express";
import path from "path";
import {fileURLToPath} from "url";

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");

app.use(express.json())

// API

app.get("/api", (request, response) => {
    response.json(
        {
            "version": "1.0.0",
            "status": "ok"
        }
    )
})

// Frontend
app.use(express.static(path.join(rootDir, "frontend")));

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})