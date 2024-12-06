import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameStatus from './components/GameStatus';
import AIVisualization from './components/AIVisualization';
import gameService from './services/gameService';

const App = () => {
    const [gameState, setGameState] = useState(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [autoPlayInterval, setAutoPlayInterval] = useState(null);

    useEffect(() => {
        const initialState = gameService.initializeGame();
        setGameState(initialState);
    }, []);

    const handleAction = useCallback((action) => {
        const newState = gameService.performAction(action);
        setGameState(newState);

        if (newState.gameOver) {
            setIsAutoPlaying(false);
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                setAutoPlayInterval(null);
            }
        }
    }, [autoPlayInterval]);

    const handleReset = useCallback(() => {
        const newState = gameService.initializeGame();
        setGameState(newState);
        setIsAutoPlaying(false);
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            setAutoPlayInterval(null);
        }
    }, [autoPlayInterval]);

    const handleAutoPlay = useCallback(() => {
        if (isAutoPlaying) {
            setIsAutoPlaying(false);
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                setAutoPlayInterval(null);
            }
        } else {
            setIsAutoPlaying(true);
            const interval = setInterval(() => {
                const newState = gameService.autoPlay();
                setGameState(newState);

                if (newState.gameOver) {
                    clearInterval(interval);
                    setAutoPlayInterval(null);
                    setIsAutoPlaying(false);
                }
            }, 1000);
            setAutoPlayInterval(interval);
        }
    }, [isAutoPlaying, autoPlayInterval]);

    if (!gameState) return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8">
                        <GameBoard 
                            grid={gameState.grid}
                            agent={gameState.agent}
                            percepts={gameState.percepts}
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <GameStatus 
                            score={gameState.score}
                            message={gameState.message}
                            gameOver={gameState.gameOver}
                        />
                        <GameControls 
                            onAction={handleAction}
                            onReset={handleReset}
                            onAutoPlay={handleAutoPlay}
                            isAutoPlaying={isAutoPlaying}
                        />
                        <AIVisualization 
                            agent={gameState.agent}
                            percepts={gameState.percepts}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;