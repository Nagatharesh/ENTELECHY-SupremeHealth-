
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
  WELCOME: '🩺✨',
  SUCCESS: '✅📊',
  ERROR: '⚠️💡',
  INSIGHT: '🧠💡',
  PATIENT: '👤',
  SCHEDULE: '📅',
};

const QUICK_REPLIES = {
    MAIN_MENU: [
        { text: `${EMOJIS.PATIENT} Patient Summary`, action: 'flow_patient_summary' },
        { text: `${EMOJIS.SCHEDULE} My Schedule`, action: 'flow_schedule' },
        { text: `${EMOJIS.INSIGHT} Latest Lab Results`, action: 'flow_labs' },
        { text: `${EMOJIS.PATIENT} Find a Patient`, action: 'flow_find_patient' },
    ],
    PATIENT_SUMMARY_OPTIONS: [
        { text: 'Yes, open full chart', action: 'open_chart_P002' },
        { text: 'Show recent labs', action: 'show_labs_P002' },
        { text: 'Back to menu', action: 'main_menu' },
    ],
    SCHEDULE_OPTIONS: [
        { text: 'View full schedule', action: 'view_full_schedule' },
        { text: 'Send "running late" note', action: 'send_late_note' },
        { text: 'Back to menu', action: 'main_menu' },
    ],
    LABS_OPTIONS: [
        { text: 'View LAB-501', action: 'view_lab_501' },
        { text: 'Notify hematologist', action: 'notify_hematologist' },
        { text: 'Back to menu', action: 'main_menu' },
    ]
};

export function DoctorChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ author: 'bot' | 'user'; text: string; quickReplies?: any[] }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [conversationState, setConversationState] = useState('main_menu');
    const [queryData, setQueryData] = useState<any>({});
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    author: 'bot',
                    text: `${EMOJIS.WELCOME} Hello Dr. Kumar. I'm your clinical ASI. How can I assist you?`,
                    quickReplies: QUICK_REPLIES.MAIN_MENU,
                }
            ]);
        }
    }, [isOpen, messages]);

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
            const botResponse = getBotResponse(messageText, conversationState, queryData);
            setMessages(prev => [...prev, botResponse.response]);
            setConversationState(botResponse.nextState || 'main_menu');
            setQueryData(botResponse.queryData || {});
        }, 1000);
    };

    const handleQuickReply = (action: string, text: string) => {
        const userMessage = { author: 'user' as const, text: text };
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            const botResponse = getBotResponse(action, conversationState, queryData);
            setMessages(prev => [...prev, botResponse.response]);
            setConversationState(botResponse.nextState || 'main_menu');
            setQueryData(botResponse.queryData || {});
        }, 1000);
    }

    const getBotResponse = (userInput: string, state: string, currentQueryData: any): { response: { author: 'bot', text: string, quickReplies?: any[] }, nextState?: string, queryData?: any } => {
        const lowerInput = userInput.toLowerCase();
        
        // Main menu handler
        if (lowerInput.startsWith('flow_')) {
            switch(lowerInput) {
                case 'flow_patient_summary':
                    return {
                        response: { author: 'bot', text: "Which patient's summary would you like to see? Please provide a name or ID.", },
                        nextState: 'finding_patient_for_summary'
                    };
                case 'flow_schedule':
                    return {
                        response: { author: 'bot', text: `${EMOJIS.SCHEDULE} You have 8 appointments today. Your next one is with Priya Verma (P-002) at 09:15 AM for a routine diabetes check-up.`, quickReplies: QUICK_REPLIES.SCHEDULE_OPTIONS },
                        nextState: 'schedule_options'
                    };
                case 'flow_labs':
                    return {
                        response: { author: 'bot', text: `${EMOJIS.INSIGHT} The latest critical lab result is for Rohan Gupta (LAB-501): Hemoglobin is 9.1 g/dL (Low) and Platelets are 130 (Low).`, quickReplies: QUICK_REPLIES.LABS_OPTIONS },
                        nextState: 'labs_options'
                    };
                case 'flow_find_patient':
                    return {
                        response: { author: 'bot', text: "Please provide the patient's name or ID to find." },
                        nextState: 'finding_patient'
                    };
            }
        }
        
        if(lowerInput === 'main_menu') {
            return {
                response: { author: 'bot', text: "Is there anything else I can help with?", quickReplies: QUICK_REPLIES.MAIN_MENU, },
                nextState: 'main_menu'
            };
        }


        // State-based logic
        switch (state) {
            case 'finding_patient':
                if (lowerInput.includes('priya') || lowerInput.includes('p-002')) {
                    return {
                        response: { author: 'bot', text: `Found patient: Priya Verma (P-002). What would you like to do?`, quickReplies: QUICK_REPLIES.PATIENT_SUMMARY_OPTIONS },
                        nextState: 'patient_summary_options',
                        queryData: { patientId: 'P-002', patientName: 'Priya Verma' }
                    };
                }
                return {
                    response: { author: 'bot', text: `Sorry, I couldn't find a patient with that name/ID. Please try again.`, },
                    nextState: 'finding_patient'
                };
            
            case 'finding_patient_for_summary':
                if (lowerInput.includes('priya') || lowerInput.includes('p-002')) {
                     return {
                        response: { author: 'bot', text: `${EMOJIS.PATIENT} Priya Verma (P-002) has upcoming appointments and a history of elevated HbA1c. Recent notes indicate a need for diet counseling. Would you like to view her full chart?`, quickReplies: QUICK_REPLIES.PATIENT_SUMMARY_OPTIONS, },
                        nextState: 'patient_summary_options',
                        queryData: { patientId: 'P-002', patientName: 'Priya Verma' }
                    };
                }
                 return {
                    response: { author: 'bot', text: `Sorry, I couldn't find a patient with that name/ID. Please try again.`, },
                    nextState: 'finding_patient_for_summary'
                };

            case 'patient_summary_options':
                if (lowerInput.includes('open_chart')) {
                    return { response: { author: 'bot', text: `${EMOJIS.SUCCESS} Opening full chart for ${currentQueryData.patientName}... (This would navigate to their record in a real app).`, quickReplies: QUICK_REPLIES.MAIN_MENU }, nextState: 'main_menu' };
                }
                if (lowerInput.includes('show_labs')) {
                    return { response: { author: 'bot', text: `${EMOJIS.INSIGHT} Fetching recent labs for ${currentQueryData.patientName}: HbA1c is 7.2% (High).`, quickReplies: QUICK_REPLIES.PATIENT_SUMMARY_OPTIONS }, nextState: 'patient_summary_options' };
                }
                break;
            
            case 'schedule_options':
                if (lowerInput.includes('view_full_schedule')) {
                    return { response: { author: 'bot', text: `${EMOJIS.SCHEDULE} Full Schedule:\n- 09:15: P. Verma\n- 09:30: R. Kumar\n- 10:00: V. Joshi... (This would be a scrollable list)`, quickReplies: QUICK_REPLIES.SCHEDULE_OPTIONS }, nextState: 'schedule_options' };
                }
                if (lowerInput.includes('send_late_note')) {
                    return { response: { author: 'bot', text: `${EMOJIS.SUCCESS} An automated notification has been sent to the next 3 patients in your queue informing them of a slight delay.`, quickReplies: QUICK_REPLIES.SCHEDULE_OPTIONS }, nextState: 'schedule_options' };
                }
                break;

            case 'labs_options':
                if (lowerInput.includes('view_lab_501')) {
                    return { response: { author: 'bot', text: `${EMOJIS.INSIGHT} Details for LAB-501 (Rohan Gupta):\n- Hemoglobin: 9.1 g/dL (Critical)\n- WBC: 12.5 (High)\n- Platelets: 130 (Low)\nAI Suggestion: Possible aplastic anemia. Immediate hematology consult advised.`, quickReplies: QUICK_REPLIES.LABS_OPTIONS }, nextState: 'labs_options' };
                }
                if (lowerInput.includes('notify_hematologist')) {
                    return { response: { author: 'bot', text: `${EMOJIS.SUCCESS} Dr. Sharma (Hematology) has been paged with the critical lab results for Rohan Gupta.`, quickReplies: QUICK_REPLIES.LABS_OPTIONS }, nextState: 'labs_options' };
                }
                break;
        }

        // Default fallback
        return {
            response: {
                author: 'bot',
                text: `${EMOJIS.ERROR} I'm still learning. I can help with patient summaries, schedules, and lab results.`,
                quickReplies: QUICK_REPLIES.MAIN_MENU,
            },
            nextState: 'main_menu'
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
                                    <CardTitle className="text-gradient-glow">Clinical ASI</CardTitle>
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
                                        placeholder="Ask ASI..."
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
