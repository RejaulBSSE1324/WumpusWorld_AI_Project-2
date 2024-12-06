import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowLeft, ArrowRight, RotateCcw, Target, GripHorizontal, LogOut, Play, Square } from 'lucide-react';

const GameControls = ({ onAction, onReset, onAutoPlay, isAutoPlaying }) => {
    return (
        <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                    <Button 
                        onClick={() => onAction('TURN_LEFT')}
                        className="col-start-1 hover:scale-105 transition-transform"
                        variant="outline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Left
                    </Button>
                    <Button 
                        onClick={() => onAction('MOVE_FORWARD')}
                        className="col-start-2 hover:scale-105 transition-transform"
                    >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Forward
                    </Button>
                    <Button 
                        onClick={() => onAction('TURN_RIGHT')}
                        className="col-start-3 hover:scale-105 transition-transform"
                        variant="outline"
                    >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Right
                    </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                    <Button 
                        onClick={() => onAction('SHOOT')}
                        variant="secondary"
                        className="hover:scale-105 transition-transform"
                    >
                        <Target className="mr-2 h-4 w-4" />
                        Shoot
                    </Button>
                    <Button 
                        onClick={() => onAction('GRAB')}
                        variant="secondary"
                        className="hover:scale-105 transition-transform"
                    >
                        <GripHorizontal className="mr-2 h-4 w-4" />
                        Grab
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button 
                        onClick={() => onAction('CLIMB')}
                        variant="outline"
                        className="hover:scale-105 transition-transform"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Climb
                    </Button>
                    <Button 
                        onClick={onReset}
                        variant="destructive"
                        className="hover:scale-105 transition-transform"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>

                <Button 
                    onClick={onAutoPlay}
                    className="w-full hover:scale-105 transition-transform"
                    variant={isAutoPlaying ? "secondary" : "default"}
                >
                    {isAutoPlaying ? (
                        <>
                            <Square className="mr-2 h-4 w-4" />
                            Stop Auto-Play
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-4 w-4" />
                            Start Auto-Play
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default GameControls;