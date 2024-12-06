import express from 'express';
import cors from 'cors';
import Agent from './ai/Agent.js';
import GameEngine from './ai/GameEngine.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const gameInstances = new Map();

app.post('/api/game/new', (req, res) => {
    const gameId = Date.now().toString();
    const agent = new Agent();
    const engine = new GameEngine();
    
    gameInstances.set(gameId, { agent, engine });
    
    const initialState = engine.initializeEnvironment();
    res.json({ gameId, state: initialState });
});

app.post('/api/game/:gameId/action', (req, res) => {
    const { gameId } = req.params;
    const { action } = req.body;
    
    const game = gameInstances.get(gameId);
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    const result = game.engine.processAction(action, game.agent.position);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});