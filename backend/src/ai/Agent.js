// Agent.js - Handles the logical agent's knowledge and decision making
class Agent {
  constructor() {
      this.KB = new Map(); // Knowledge base
      this.position = { x: 0, y: 0 };
      this.direction = 'EAST';
      this.hasArrow = true;
      this.hasGold = false;
      this.visitedCells = new Set();
      this.lastMoves = []; // For loop detection
  }

  // Initialize knowledge base with basic facts
  initializeKB() {
      this.addToKB('Safe(0,0)');
      this.addToKB('Visited(0,0)');
      this.visitedCells.add('0,0');
  }

  addToKB(fact) {
      this.KB.set(fact, true);
  }

  // Check if a position is safe based on current knowledge
  isSafe(x, y) {
      return this.KB.has(`Safe(${x},${y})`) || this.visitedCells.has(`${x},${y}`);
  }

  // Use logical inference to determine if a cell might contain dangers
  inferDangers(percepts) {
      const { stench, breeze } = percepts;
      const adjacentCells = this.getAdjacentCells();

      if (!breeze && !stench) {
          // Mark all adjacent cells as safe using logical inference
          adjacentCells.forEach(cell => {
              if (!this.KB.has(`Safe(${cell.x},${cell.y})`)) {
                  this.addToKB(`Safe(${cell.x},${cell.y})`);
              }
          });
      }

      if (breeze) {
          adjacentCells.forEach(cell => {
              this.addToKB(`MaybePit(${cell.x},${cell.y})`);
          });
      }

      if (stench) {
          adjacentCells.forEach(cell => {
              this.addToKB(`MaybeWumpus(${cell.x},${cell.y})`);
          });
      }
  }

  // Get valid adjacent cells
  getAdjacentCells() {
      const { x, y } = this.position;
      return [
          { x: x+1, y }, { x: x-1, y },
          { x, y: y+1 }, { x, y: y-1 }
      ].filter(pos => pos.x >= 0 && pos.x < 10 && pos.y >= 0 && pos.y < 10);
  }

  // Detect movement loops
  isInLoop() {
      if (this.lastMoves.length < 6) return false;
      
      // Check for repeated position patterns
      const pattern = JSON.stringify(this.lastMoves.slice(-3));
      const previousPattern = JSON.stringify(this.lastMoves.slice(-6, -3));
      return pattern === previousPattern;
  }

  // Main decision-making logic
  decideNextMove(percepts) {
      this.inferDangers(percepts);
      
      // If carrying gold and at start, game won
      if (this.hasGold && this.position.x === 0 && this.position.y === 0) {
          return 'CLIMB';
      }

      // Detect and break loops
      if (this.isInLoop()) {
          const unvisitedSafeCells = this.findUnvisitedSafeCells();
          if (unvisitedSafeCells.length > 0) {
              return this.planPathTo(unvisitedSafeCells[0]);
          }
      }

      // Find next safe unvisited cell
      const adjacentCells = this.getAdjacentCells();
      const safeCells = adjacentCells.filter(cell => this.isSafe(cell.x, cell.y));
      
      if (safeCells.length > 0) {
          const unvisitedSafe = safeCells.find(cell => 
              !this.visitedCells.has(`${cell.x},${cell.y}`));
          
          if (unvisitedSafe) {
              return this.planPathTo(unvisitedSafe);
          }
      }

      // If no safe moves, take calculated risk
      return this.planRiskyMove();
  }

  // Find path to target cell
  planPathTo(target) {
      // Simple A* or similar pathfinding could be implemented here
      // For now, using simple direct movement
      if (target.x > this.position.x) return 'EAST';
      if (target.x < this.position.x) return 'WEST';
      if (target.y > this.position.y) return 'NORTH';
      if (target.y < this.position.y) return 'SOUTH';
  }

  // Plan risky move when no safe moves are available
  planRiskyMove() {
      const unvisitedAdjacent = this.getAdjacentCells()
          .filter(cell => !this.visitedCells.has(`${cell.x},${cell.y}`));
      
      if (unvisitedAdjacent.length === 0) return 'CLIMB';
      
      // Calculate risk factors and choose least risky move
      return this.planPathTo(unvisitedAdjacent[0]);
  }
}

export default Agent;