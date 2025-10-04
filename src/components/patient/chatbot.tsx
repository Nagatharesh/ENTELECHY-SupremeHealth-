
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

const EMOJIS = {
  WELCOME: '😊✨',
  SUCCESS: '✅🚀',
  ERROR: '⚠💡',
  INSIGHT: '🧠💫',
  BOOK: '📅🔥',
  TIME: '⏰🌅',
  HEALTH: '🏥❤',
};

const QUICK_REPLIES = {
  MAIN_MENU: [
    { text: `${EMOJIS.BOOK} Appointments`, action: 'appointments', icon: '📅' },
    { text: `${EMOJIS.HEALTH} My Records`, action: 'records', icon: '📋' },
    { text: `${EMOJIS.TIME} Reminders`, action: 'reminders', icon: '⏰' },
    { text: `${EMOJIS.INSIGHT} Health Tips`, action: 'assistance', icon: '🧠' }
  ],
};


export function PatientChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ author: 'bot' | 'user'; text: string; quickReplies?: any[] }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    author: 'bot',
                    text: `${EMOJIS.WELCOME} Hello! I'm your ASI Guardian. How can I help you today?`,
                    quickReplies: QUICK_REPLIES.MAIN_MENU,
                }
            ]);
        }
    }, [isOpen, messages]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            // A bit of a hack to scroll to bottom. In a real app, use the imperative handle from ScrollArea.
            setTimeout(() => {
                 const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
                if(viewport) viewport.scrollTop = viewport.scrollHeight;
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = (text: string) => {
        const messageText = text.trim();
        if (!messageText) return;

        const userMessage = { author: 'user' as const, text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    const getBotResponse = (userInput: string): { author: 'bot', text: string, quickReplies?: any[] } => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('appointment')) {
            return {
                author: 'bot',
                text: `${EMOJIS.BOOK} I can help with that! Would you like to book a new appointment or view upcoming ones?`,
                 quickReplies: [
                    { text: 'Book New', action: 'book_new' },
                    { text: 'View Upcoming', action: 'view_upcoming' },
                ]
            };
        }
        if (lowerInput.includes('record')) {
            return {
                author: 'bot',
                text: `${EMOJIS.HEALTH} Sure, I can show you your medical records. Which part are you interested in?`,
                quickReplies: [
                    { text: 'Lab Reports', action: 'records_labs' },
                    { text: 'Prescriptions', action: 'records_rx' },
                    { text: 'Visit History', action: 'records_history' },
                ]
            };
        }
        if (lowerInput.includes('reminder')) {
            return {
                author: 'bot',
                text: `${EMOJIS.TIME} Let's set a reminder! What is this reminder for? (e.g., "Take Paracetamol")`,
            };
        }
        if (lowerInput.includes('tip') || lowerInput.includes('assist')) {
             return {
                author: 'bot',
                text: `${EMOJIS.INSIGHT} Health Tip: Staying hydrated can improve energy levels and brain function. Try to drink 8 glasses of water a day!`,
                quickReplies: QUICK_REPLIES.MAIN_MENU,
            };
        }

        return {
            author: 'bot',
            text: `${EMOJIS.ERROR} I'm still learning. Try asking about appointments, records, or reminders!`,
            quickReplies: QUICK_REPLIES.MAIN_MENU,
        };
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-5 z-50"
                    >
                        <Card className="w-96 h-[60vh] flex flex-col glassmorphism glowing-shadow">
                            <CardHeader className="flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bot className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-gradient-glow">Health Assistant</CardTitle>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X/></Button>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-hidden p-3">
                                <ScrollArea className="h-full" ref={scrollAreaRef}>
                                    <div className="space-y-4 pr-4">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={cn("flex items-end gap-2", msg.author === 'user' ? 'justify-end' : 'justify-start')}>
                                                {msg.author === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                                                <div className={cn("max-w-xs rounded-2xl p-3 text-sm", msg.author === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'glassmorphism rounded-bl-none')}>
                                                    <p>{msg.text}</p>
                                                     {msg.author === 'bot' && msg.quickReplies && (
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {msg.quickReplies.map(qr => (
                                                                <Button key={qr.action} size="sm" variant="outline" className="text-xs h-auto py-1 px-2" onClick={() => handleSendMessage(qr.text)}>
                                                                    {qr.text}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                {msg.author === 'user' && <User className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <div className="p-3 border-t border-border/50">
                                <div className="relative">
                                    <Input
                                        placeholder="Ask me anything..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                    />
                                    <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleSendMessage(inputValue)}>
                                        <Send />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-5 right-5 z-50"
            >
                <Button 
                    size="icon" 
                    className="w-16 h-16 rounded-full glowing-shadow-interactive" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8 animate-pulse" />}
                </Button>
            </motion.div>
        </>
    );
}
