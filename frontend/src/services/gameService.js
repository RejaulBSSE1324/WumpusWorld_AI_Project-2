// gameService.js - Handles game state management and interactions
import Agent from '../../../backend/src/ai/Agent.js';
import GameEngine from '../../../backend/src/ai/GameEngine.js';

class GameService {
    constructor() {
        this.agent = new Agent();
        this.gameEngine = new GameEngine();
        this.score = 0;
        this.gameOver = false;
        this.message = '';
    }

    initializeGame(preset = null) {
        this.gameEngine.initializeEnvironment(preset);
        this.agent = new Agent();
        this.agent.initializeKB();
        this.score = 0;
        this.gameOver = false;
        this.message = 'Game started!';
        
        return this.getGameState();
    }

    performAction(action) {
        if (this.gameOver) return this.getGameState();

        // Process action and get results
        const result = this.gameEngine.processAction(action, this.agent.position);
        
        // Update agent's state
        this.agent.position = result.newPosition;
        this.agent.visitedCells.add(`${result.newPosition.x},${result.newPosition.y}`);
        
        // Update game state
        this.score += result.score;
        this.message = result.message;
        this.gameOver = result.gameOver;

        // Update agent's knowledge base with new percepts
        this.agent.inferDangers(result.percepts);

        return this.getGameState();
    }

    autoPlay() {
        if (this.gameOver) return this.getGameState();

        const currentPercepts = this.gameEngine.getPercepts(this.agent.position);
        const nextAction = this.agent.decideNextMove(currentPercepts);
        
        return this.performAction(nextAction);
    }

    getGameState() {
        return {
            grid: this.gameEngine.grid,
            agent: this.agent,
            score: this.score,
            gameOver: this.gameOver,
            message: this.message,
            percepts: this.gameEngine.getPercepts(this.agent.position)
        };
    }

    loadPresetEnvironment(preset) {
        return this.initializeGame(preset);
    }
}

export default new GameService();