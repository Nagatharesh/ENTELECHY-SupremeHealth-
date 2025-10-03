"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DnaPatient, dummyDnaAiResponses } from '@/lib/dummy-data';
import { Bot, Send, FileText, FlaskConical, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function ResearchPanel({ patient }: { patient: DnaPatient }) {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState<{ user: string, ai: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendQuery = () => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        const userQuery = query;
        setQuery('');

        setTimeout(() => {
            const aiResponse = dummyDnaAiResponses[patient.id as keyof typeof dummyDnaAiResponses] || "I am analyzing the global database for insights. Please specify your query.";
            setChatHistory(prev => [...prev, { user: userQuery, ai: aiResponse }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-xl flex items-center gap-4">
                    <Bot className="w-8 h-8" />
                    ASI Research & Simulation Block
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                    {chatHistory.map((chat, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <p className="text-sm font-semibold text-white">You: {chat.user}</p>
                            <p className="text-sm text-primary">ASI: {chat.ai}</p>
                        </motion.div>
                    ))}
                    {isLoading && <p className="text-sm text-primary animate-pulse">ASI is thinking...</p>}
                </div>
                
                <div className="flex gap-2">
                    <Input 
                        placeholder="Ask AI for insights (e.g., 'show trial drugs for BRCA1')..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                    />
                    <Button onClick={handleSendQuery} className="glowing-shadow-interactive">
                        <Send />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <InfoPill icon={FileText} text="Latest Research Papers" />
                    <InfoPill icon={FlaskConical} text="Clinical Trial Drugs" />
                    <InfoPill icon={Globe} text="Global Genetic Datasets" />
                </div>
            </CardContent>
        </Card>
    );
}

const InfoPill = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <div className="p-3 bg-background/50 rounded-lg flex items-center gap-3 border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer">
        <Icon className="w-5 h-5 text-secondary" />
        <span className="font-medium text-white">{text}</span>
    </div>
);

    