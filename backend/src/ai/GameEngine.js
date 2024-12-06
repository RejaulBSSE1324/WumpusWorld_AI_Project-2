// GameEngine.js - Handles game state and environment logic
class GameEngine {
  constructor() {
      this.gridSize = 10;
      this.grid = [];
      this.wumpusPosition = null;
      this.goldPosition = null;
      this.pits = [];
  }

  // Initialize a new game environment
  initializeEnvironment(preset = null) {
      this.grid = Array(this.gridSize).fill().map(() => 
          Array(this.gridSize).fill().map(() => ({
              hasWumpus: false,
              hasPit: false,
              hasGold: false,
              visited: false,
              safe: false
          }))
      );

      if (preset) {
          this.loadPresetEnvironment(preset);
      } else {
          this.generateRandomEnvironment();
      }

      // Mark starting position as safe
      this.grid[0][0].safe = true;
  }

  // Load a preset environment from a configuration
  loadPresetEnvironment(preset) {
      preset.pits.forEach(pit => {
          this.grid[pit.x][pit.y].hasPit = true;
      });
      
      this.wumpusPosition = preset.wumpus;
      this.grid[preset.wumpus.x][preset.wumpus.y].hasWumpus = true;
      
      this.goldPosition = preset.gold;
      this.grid[preset.gold.x][preset.gold.y].hasGold = true;
  }

  // Generate a random environment
  generateRandomEnvironment() {
      // Place Wumpus (not in starting position)
      do {
          this.wumpusPosition = {
              x: Math.floor(Math.random() * this.gridSize),
              y: Math.floor(Math.random() * this.gridSize)
          };
      } while (this.wumpusPosition.x === 0 && this.wumpusPosition.y === 0);
      
      this.grid[this.wumpusPosition.x][this.wumpusPosition.y].hasWumpus = true;

      // Place Gold
      do {
          this.goldPosition = {
              x: Math.floor(Math.random() * this.gridSize),
              y: Math.floor(Math.random() * this.gridSize)
          };
      } while (
          (this.goldPosition.x === 0 && this.goldPosition.y === 0) ||
          (this.goldPosition.x === this.wumpusPosition.x && 
           this.goldPosition.y === this.wumpusPosition.y)
      );
      
      this.grid[this.goldPosition.x][this.goldPosition.y].hasGold = true;

      // Place Pits (20% probability for each cell except start)
      for (let i = 0; i < this.gridSize; i++) {
          for (let j = 0; j < this.gridSize; j++) {
              if ((i !== 0 || j !== 0) && 
                  Math.random() < 0.2 && 
                  !this.grid[i][j].hasWumpus && 
                  !this.grid[i][j].hasGold) {
                  this.grid[i][j].hasPit = true;
                  this.pits.push({ x: i, y: j });
              }
          }
      }
  }

  // Get percepts for a given position
  getPercepts(position) {
      const { x, y } = position;
      
      return {
          stench: this.checkForStench(x, y),
          breeze: this.checkForBreeze(x, y),
          glitter: this.checkForGlitter(x, y),
          bump: false, // Updated by movement logic
          scream: false // Updated when Wumpus is killed
      };
  }

  // Check for adjacent Wumpus
  checkForStench(x, y) {
      return this.getAdjacentCells(x, y)
          .some(pos => this.grid[pos.x][pos.y].hasWumpus);
  }

  // Check for adjacent Pits
  checkForBreeze(x, y) {
      return this.getAdjacentCells(x, y)
          .some(pos => this.grid[pos.x][pos.y].hasPit);
  }

  // Check for Gold in current position
  checkForGlitter(x, y) {
      return this.grid[x][y].hasGold;
  }

  // Get valid adjacent cells
  getAdjacentCells(x, y) {
      return [
          { x: x+1, y }, { x: x-1, y },
          { x, y: y+1 }, { x, y: y-1 }
      ].filter(pos => 
          pos.x >= 0 && pos.x < this.gridSize && 
          pos.y >= 0 && pos.y < this.gridSize
      );
  }

  // Process agent's action and return result
  processAction(action, position) {
      const result = {
          newPosition: { ...position },
          percepts: null,
          gameOver: false,
          score: 0,
          message: ''
      };

      switch(action) {
          case 'MOVE_FORWARD':
              // Update position based on direction
              // Check for valid move and update score
              break;
          case 'TURN_LEFT':
          case 'TURN_RIGHT':
              // Update agent's direction
              break;
          case 'GRAB':
              if (this.grid[position.x][position.y].hasGold) {
                  this.grid[position.x][position.y].hasGold = false;
                  result.message = 'Gold grabbed!';
                  result.score += 1000;
              }
              break;
          case 'SHOOT':
              // Handle arrow shooting logic
              break;
          case 'CLIMB':
              if (position.x === 0 && position.y === 0) {
                  result.gameOver = true;
                  result.message = 'Successfully climbed out!';
                  result.score += 1000;
              }
              break;
      }

      // Update percepts for new position
      result.percepts = this.getPercepts(result.newPosition);
      
      // Check for game over conditions
      if (this.grid[position.x][position.y].hasWumpus ||
          this.grid[position.x][position.y].hasPit) {
          result.gameOver = true;
          result.message = 'Game Over!';
          result.score -= 1000;
      }

      return result;
  }
}

export default GameEngine;