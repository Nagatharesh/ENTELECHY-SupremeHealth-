
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

const EMOJIS = {
  GREETING: '🏥✨',
  SUCCESS: '✅',
  ERROR: '⚠️',
  CRITICAL: '🔴',
  WARNING: '🟡',
  NORMAL: '🟢',
  BED: '🛏️',
  STAFF: '🧑‍⚕️',
  INCIDENT: '🚨',
  PREDICT: '📈',
  REPORT: '📋',
  AI: '🤖',
};

// Simulated real-time hospital status
const getHospitalContext = () => ({
  icuCapacity: 92,
  erStatus: 'stable',
  staffAlerts: 2,
  activeIncidents: [{ id: 'cam4', description: 'Camera 4 offline (Ward B)', resolved: false }],
  surgeRisk: { chance: 68, timeframe: '72h' },
  bedStatus: { total: 200, occupied: 164, icu: { total: 30, occupied: 28 } },
  floatNurses: [{ id: 'n-01', name: 'Maria Lopez (RN)' }, { id: 'n-02', name: 'John Doe (RN)' }],
});


export function HospitalChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ author: 'bot' | 'user'; text: string; quickReplies?: any[] }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [conversationState, setConversationState] = useState('main_menu');
    const [context, setContext] = useState(getHospitalContext());
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const botResponse = getBotResponse('initial_greeting', 'main_menu', context);
            setMessages([botResponse.response]);
        }
    }, [isOpen, messages, context]);

    useEffect(() => {
        if (scrollAreaRef.current) {
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

        setTimeout(() => {
            const botResponse = getBotResponse(messageText, conversationState, context);
            setMessages(prev => [...prev, botResponse.response]);
            setConversationState(botResponse.nextState || 'main_menu');
            if (botResponse.updatedContext) {
                setContext(botResponse.updatedContext);
            }
        }, 1000);
    };

    const handleQuickReply = (action: string, text: string) => {
        const userMessage = { author: 'user' as const, text: text };
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            const botResponse = getBotResponse(action, conversationState, context);
            setMessages(prev => [...prev, botResponse.response]);
            setConversationState(botResponse.nextState || 'main_menu');
             if (botResponse.updatedContext) {
                setContext(botResponse.updatedContext);
            }
        }, 1000);
    }
    
    const getInitialQuickReplies = (ctx: any) => {
      let replies = [];
      replies.push({ text: `${EMOJIS.BED} View Bed Dashboard (${ctx.bedStatus.occupied}/${ctx.bedStatus.total} Occupied)`, action: 'flow_beds' });
      if (ctx.activeIncidents.some(i => !i.resolved)) {
        const incident = ctx.activeIncidents.find(i => !i.resolved);
        replies.push({ text: `${EMOJIS.INCIDENT} Resolve ${incident.description}`, action: `resolve_incident_${incident.id}` });
      }
      if (ctx.staffAlerts > 0) {
        replies.push({ text: `${EMOJIS.STAFF} Assign Float Nurse to Ward B`, action: 'flow_assign_nurse' });
      }
      if (ctx.surgeRisk.chance > 50) {
        replies.push({ text: `${EMOJIS.PREDICT} Show Predictive Surge Alert (${ctx.surgeRisk.chance}%)`, action: 'flow_predictive_surge' });
      }
      replies.push({ text: `${EMOJIS.REPORT} Generate Daily Ops Report`, action: 'flow_report' });
      return replies;
    }


    const getBotResponse = (userInput: string, state: string, currentContext: any): { response: { author: 'bot', text: string, quickReplies?: any[] }, nextState?: string, updatedContext?: any } => {
        const lowerInput = userInput.toLowerCase();
        
        if (userInput === 'initial_greeting') {
            const greeting = `${EMOJIS.GREETING} Good morning, Admin!\n`+
                             `${EMOJIS.CRITICAL} ICU at ${currentContext.icuCapacity}% capacity | ` +
                             `${EMOJIS.NORMAL} ER stable | ` +
                             `${EMOJIS.STAFF} ${currentContext.staffAlerts} staff alerts\n` +
                             `${EMOJIS.WARNING} Incident: ${currentContext.activeIncidents[0].description}\n\n` +
                             `What would you like to prioritize?`;

            return {
                response: { author: 'bot', text: greeting, quickReplies: getInitialQuickReplies(currentContext) },
                nextState: 'main_menu'
            };
        }
        
        if (lowerInput === 'main_menu') {
            return {
                response: { author: 'bot', text: "Is there anything else I can assist with?", quickReplies: getInitialQuickReplies(currentContext) },
                nextState: 'main_menu'
            };
        }
        
        if (lowerInput.startsWith('resolve_incident_')) {
            const incidentId = lowerInput.replace('resolve_incident_', '');
            const updatedContext = {
                ...currentContext,
                activeIncidents: currentContext.activeIncidents.map(inc => 
                    inc.id === incidentId ? { ...inc, resolved: true } : inc
                )
            };
            return {
                response: { 
                    author: 'bot', 
                    text: `${EMOJIS.SUCCESS} Reboot command sent to Camera 4. Status: Reconnecting... This action has been logged.`,
                    quickReplies: [{text: 'Notify Security', action: 'notify_security'}, {text: 'Back to Menu', action: 'main_menu'}]
                },
                nextState: 'main_menu',
                updatedContext
            };
        }
        
        switch (lowerInput) {
            case 'flow_beds':
                return {
                    response: {
                        author: 'bot',
                        text: `${EMOJIS.BED} Bed Status: Total: ${currentContext.bedStatus.total} | Occupied: ${currentContext.bedStatus.occupied} (${Math.round(currentContext.bedStatus.occupied / currentContext.bedStatus.total * 100)}%)\n` +
                              `ICU: ${currentContext.bedStatus.icu.occupied}/${currentContext.bedStatus.icu.total} Occupied.\n\n` +
                              `2 beds are free in Cardiology.`,
                        quickReplies: [{ text: 'Reserve Bed for ER', action: 'reserve_bed_er' }, {text: 'Back to Menu', action: 'main_menu'}]
                    },
                    nextState: 'main_menu'
                };
            case 'flow_assign_nurse':
                 return {
                    response: {
                        author: 'bot',
                        text: `${EMOJIS.STAFF} Available Float Nurses:\n` +
                              currentContext.floatNurses.map(n => `- ${n.name}`).join('\n'),
                        quickReplies: [
                            ...currentContext.floatNurses.map(n => ({text: `Assign ${n.name}`, action: `assign_nurse_${n.id}`})),
                            {text: 'Back to Menu', action: 'main_menu'}
                        ]
                    },
                    nextState: 'main_menu'
                };
            case 'flow_predictive_surge':
                return {
                    response: {
                        author: 'bot',
                        text: `${EMOJIS.AI} ML Model: ${currentContext.surgeRisk.chance}% chance of 15+ admissions in ${currentContext.surgeRisk.timeframe} due to flu trend. Recommend: Prep 5 extra beds.`,
                        quickReplies: [{text: 'Acknowledge & Prep Beds', action: 'prep_beds'}, {text: 'Back to Menu', action: 'main_menu'}]
                    },
                    nextState: 'main_menu'
                };
            case 'flow_report':
                 return {
                    response: {
                        author: 'bot',
                        text: `${EMOJIS.REPORT} Daily Ops Report ready! Includes: census, incidents, staffing, resource use.`,
                        quickReplies: [{text: '[Download Report]', action: 'download_report'}, {text: 'Back to Menu', action: 'main_menu'}]
                    },
                    nextState: 'main_menu'
                };
            case 'notify_security':
                return {
                    response: { text: `${EMOJIS.SUCCESS} Security team has been notified about the camera issue.`, quickReplies: getInitialQuickReplies(currentContext) },
                    nextState: 'main_menu'
                };
            case 'reserve_bed_er':
                return {
                    response: { text: `${EMOJIS.SUCCESS} Cardiology Bed C-201 has been reserved for ER incoming. This action is logged.`, quickReplies: getInitialQuickReplies(currentContext) },
                    nextState: 'main_menu'
                };
            case 'prep_beds':
                 return {
                    response: { text: `${EMOJIS.SUCCESS} Confirmed. Ward D is being prepared for a potential patient surge. Staffing has been notified.`, quickReplies: getInitialQuickReplies(currentContext) },
                    nextState: 'main_menu'
                };
            case 'download_report':
                 return {
                    response: { text: `${EMOJIS.SUCCESS} Report downloaded. (Simulation)`, quickReplies: getInitialQuickReplies(currentContext) },
                    nextState: 'main_menu'
                };
            default:
                 if (lowerInput.startsWith('assign_nurse_')) {
                    const nurseId = lowerInput.replace('assign_nurse_', '');
                    const nurse = currentContext.floatNurses.find(n => n.id === nurseId);
                    return {
                        response: { text: `${EMOJIS.SUCCESS} ${nurse.name} assigned to Ward B. This has been logged.`, quickReplies: getInitialQuickReplies(currentContext) },
                        nextState: 'main_menu'
                    };
                }
                return {
                    response: { author: 'bot', text: `I'm sorry, I can only provide information on Facility Status, Staff, Incidents, and Predictions.`, quickReplies: getInitialQuickReplies(currentContext) },
                    nextState: 'main_menu'
                };
        }
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
                                    <CardTitle className="text-gradient-glow">Administrative ASI</CardTitle>
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
                                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                                     {msg.author === 'bot' && msg.quickReplies && (
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {msg.quickReplies.map(qr => (
                                                                <Button key={qr.action} size="sm" variant="outline" className="text-xs h-auto py-1 px-2" onClick={() => handleQuickReply(qr.action, qr.text)}>
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
                                        placeholder="Ask ASI or use quick replies..."
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
