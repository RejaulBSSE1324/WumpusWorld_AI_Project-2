import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const GameStatus = ({ score, message, gameOver }) => {
    return (
        <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Game Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                    Score: {score}
                </div>
                {message && (
                    <Alert 
                        className="mt-4" 
                        variant={gameOver ? "destructive" : "default"}
                    >
                        <AlertTitle>
                            {gameOver ? "Game Over" : "Status Update"}
                        </AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default GameStatus;