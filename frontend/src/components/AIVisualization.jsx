import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AIVisualization = ({ agent, percepts }) => {
    return (
        <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Agent Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-sm text-blue-600 font-medium">Position</div>
                            <div className="text-lg">X: {agent.position.x}, Y: {agent.position.y}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-sm text-blue-600 font-medium">Direction</div>
                            <div className="text-lg">{agent.direction}</div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium mb-2">Current Percepts</div>
                        <div className="grid grid-cols-2 gap-2">
                            {percepts.stench && (
                                <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                    Stench
                                </div>
                            )}
                            {percepts.breeze && (
                                <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                    Breeze
                                </div>
                            )}
                            {percepts.glitter && (
                                <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                    Glitter
                                </div>
                            )}
                            {percepts.bump && (
                                <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                    Bump
                                </div>
                            )}
                            {percepts.scream && (
                                <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                    Scream
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium mb-2">Agent Status</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                Arrow: {agent.hasArrow ? 'Yes' : 'No'}
                            </div>
                            <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                Gold: {agent.hasGold ? 'Yes' : 'No'}
                            </div>
                            <div className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                Visited Cells: {agent.visitedCells.size}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium mb-2">Knowledge Base</div>
                        <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                            {Array.from(agent.KB.keys()).map((fact, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors"
                                >
                                    {fact}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AIVisualization;