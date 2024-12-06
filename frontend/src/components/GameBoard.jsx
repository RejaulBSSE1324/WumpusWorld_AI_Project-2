import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const GameBoard = ({ grid, agent, percepts }) => {
    const getAgentRotation = () => {
        switch (agent.direction) {
            case 'NORTH': return 'rotate-0';
            case 'EAST': return 'rotate-90';
            case 'SOUTH': return 'rotate-180';
            case 'WEST': return 'rotate-270';
            default: return 'rotate-0';
        }
    };

    const renderPercepts = (x, y) => {
        if (!agent.visitedCells.has(`${x},${y}`)) return null;

        return (
            <div className="absolute inset-0 flex flex-wrap items-center justify-center p-1">
                {percepts.stench && (
                    <div className="absolute top-0 right-0 text-xs">🌫️</div>
                )}
                {percepts.breeze && (
                    <div className="absolute top-0 left-0 text-xs">💨</div>
                )}
                {percepts.glitter && (
                    <div className="absolute bottom-0 right-0 text-xs">✨</div>
                )}
            </div>
        );
    };

    const renderCell = (cell, x, y) => {
        const isCurrentPosition = agent.position.x === x && agent.position.y === y;
        const isVisited = agent.visitedCells.has(`${x},${y}`);

        return (
            <div
                key={`${x}-${y}`}
                className={`
                    relative border rounded-lg aspect-square
                    ${isVisited ? 'bg-blue-50 border-blue-300' : 'bg-gray-200 border-gray-300'}
                    ${isCurrentPosition ? 'bg-blue-200 border-blue-500 shadow-lg' : ''}
                `}
            >
                {/* Coordinates */}
                <div className="absolute top-1 left-1 text-xs text-gray-400">
                    {x},{y}
                </div>

                {/* Agent */}
                {isCurrentPosition && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-2xl transform ${getAgentRotation()}`}>🤖</div>
                    </div>
                )}

                {/* Game Elements */}
                {isVisited && (
                    <>
                        {cell.hasGold && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-2xl animate-bounce">💰</div>
                            </div>
                        )}
                        {cell.hasWumpus && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-2xl animate-pulse">👾</div>
                            </div>
                        )}
                        {cell.hasPit && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-2xl">⚫</div>
                            </div>
                        )}
                    </>
                )}

                {/* Percepts */}
                {renderPercepts(x, y)}
            </div>
        );
    };

    return (
        <Card className="p-6 bg-white shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">
                    Wumpus World
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
                    }}
                >
                    {grid.map((row, y) =>
                        row.map((cell, x) => renderCell(cell, x, y))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default GameBoard;
