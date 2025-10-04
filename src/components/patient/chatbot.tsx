
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
  WELCOME: '😊✨',
  SUCCESS: '✅🚀',
  ERROR: '⚠💡',
  INSIGHT: '🧠💫',
  BOOK: '📅🔥',
  TIME: '⏰🌅',
  HEALTH: '🏥❤',
  PROFILE: '👤',
  RECORDS: '📋',
  EMERGENCY: '🚨🆘',
};

const QUICK_REPLIES = {
    MAIN_MENU: [
        { text: `${EMOJIS.BOOK} Appointments`, action: 'flow_appointments' },
        { text: `${EMOJIS.PROFILE} My Profile`, action: 'flow_profile' },
        { text: `${EMOJIS.RECORDS} My Records`, action: 'flow_records' },
        { text: `${EMOJIS.TIME} Set Reminder`, action: 'flow_reminders' },
        { text: `${EMOJIS.INSIGHT} Health Assistance`, action: 'flow_assistance' }
    ],
    APPOINTMENTS: [
        { text: 'Book New Appointment', action: 'appt_book_new' },
        { text: 'View Upcoming', action: 'appt_view_upcoming' },
        { text: 'Back to Main Menu', action: 'main_menu' },
    ],
    RECORDS: [
        { text: 'Lab Reports', action: 'rec_labs' },
        { text: 'Prescriptions', action: 'rec_rx' },
        { text: 'Visit History', action: 'rec_history' },
        { text: 'Back to Main Menu', action: 'main_menu' },
    ],
    REMINDERS: [
        { text: 'For Medication', action: 'rem_medication' },
        { text: 'For an Appointment', action: 'rem_appointment' },
        { text: 'Back to Main Menu', action: 'main_menu' },
    ],
    PROFILE: [
        { text: 'View My Profile', action: 'prof_view' },
        { text: 'Edit My Profile', action: 'prof_edit' },
        { text: 'Back to Main Menu', action: 'main_menu' },
    ],
    PROFILE_EDIT: [
        { text: '👤 Basic Info', action: 'prof_edit_basics' },
        { text: '📞 Contact', action: 'prof_edit_contact' },
        { text: 'Back to Main Menu', action: 'main_menu' },
    ],
    ASSISTANCE: [
        { text: 'Explain BP Trend', action: 'assist_explain_bp' },
        { text: 'Headache Severity 5', action: 'assist_symptom_mild' },
        { text: 'Chest Pain Severity 9', action: 'assist_symptom_high' },
        { text: 'Predict Diabetes Risk', action: 'assist_predict_diabetes' },
        { text: 'Back to Main Menu', action: 'main_menu' },
    ],
    EMERGENCY: [
      { text: `${EMOJIS.EMERGENCY} Call Ambulance`, action: 'emergency_call' },
      { text: 'Contact Doctor', action: 'doctor_call' }
    ]
};


export function PatientChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ author: 'bot' | 'user'; text: string; quickReplies?: any[] }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [conversationState, setConversationState] = useState('main_menu');
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
            const botResponse = getBotResponse(messageText, conversationState);
            setMessages(prev => [...prev, botResponse]);
            setConversationState(botResponse.nextState || 'main_menu');
        }, 1000);
    };

    const handleQuickReply = (action: string, text: string) => {
        const userMessage = { author: 'user' as const, text: text };
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            const botResponse = getBotResponse(action, conversationState);
            setMessages(prev => [...prev, botResponse]);
            setConversationState(botResponse.nextState || 'main_menu');
        }, 1000);
    }

    const getBotResponse = (userInput: string, state: string): { author: 'bot', text: string, quickReplies?: any[], nextState?: string } => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('chest pain') && (lowerInput.includes('9') || lowerInput.includes('10'))) {
            return {
                author: 'bot',
                text: `${EMOJIS.EMERGENCY} High-severity symptom detected! I strongly recommend seeking immediate medical attention.`,
                quickReplies: QUICK_REPLIES.EMERGENCY,
                nextState: 'main_menu'
            };
        }

        const handleFlow = (flow: string) => {
            switch(flow) {
                case 'flow_appointments':
                    return { author: 'bot' as const, text: `${EMOJIS.BOOK} I can help with appointments! What would you like to do?`, quickReplies: QUICK_REPLIES.APPOINTMENTS, nextState: 'appointments' };
                case 'flow_records':
                    return { author: 'bot' as const, text: `${EMOJIS.RECORDS} Sure, I can show you your medical records. Which part are you interested in?`, quickReplies: QUICK_REPLIES.RECORDS, nextState: 'records' };
                case 'flow_reminders':
                     return { author: 'bot' as const, text: `${EMOJIS.TIME} Let's set a reminder! What is this for?`, quickReplies: QUICK_REPLIES.REMINDERS, nextState: 'reminders' };
                case 'flow_assistance':
                    return { author: 'bot' as const, text: `${EMOJIS.INSIGHT} How can I assist you with your health today?`, quickReplies: QUICK_REPLIES.ASSISTANCE, nextState: 'assistance' };
                case 'flow_profile':
                    return { author: 'bot' as const, text: `${EMOJIS.PROFILE} This is your Profile Hub. What would you like to do?`, quickReplies: QUICK_REPLIES.PROFILE, nextState: 'profile' };
                default:
                    return { author: 'bot' as const, text: `${EMOJIS.ERROR} I'm still learning. Please select from the main menu.`, quickReplies: QUICK_REPLIES.MAIN_MENU, nextState: 'main_menu' };
            }
        };

        if (state === 'main_menu' || !state) {
            if (lowerInput.startsWith('flow_')) return handleFlow(lowerInput);
            if (lowerInput.includes('appointment')) return handleFlow('flow_appointments');
            if (lowerInput.includes('record')) return handleFlow('flow_records');
            if (lowerInput.includes('reminder')) return handleFlow('flow_reminders');
            if (lowerInput.includes('assist') || lowerInput.includes('help')) return handleFlow('flow_assistance');
            if (lowerInput.includes('profile')) return handleFlow('flow_profile');
        }

        switch (state) {
            case 'appointments':
                if (lowerInput.includes('book_new')) {
                    return { author: 'bot', text: "To book a new appointment, please navigate to the 'Doctors' or 'Appointments' tab in your dashboard.", quickReplies: QUICK_REPLIES.APPOINTMENTS, nextState: 'appointments' };
                }
                if (lowerInput.includes('view_upcoming')) {
                     return { author: 'bot', text: "You can see all your upcoming appointments in the 'Appointments' tab.", quickReplies: QUICK_REPLIES.APPOINTMENTS, nextState: 'appointments' };
                }
                break;
            
            case 'records':
                 if (lowerInput.includes('rec_labs')) {
                    return { author: 'bot', text: "Your lab reports are available under the 'Records' tab. I can also show you the latest one here if you'd like.", quickReplies: QUICK_REPLIES.RECORDS, nextState: 'records' };
                }
                break;
            
             case 'reminders':
                 if (lowerInput.includes('rem_medication')) {
                    return { author: 'bot', text: "Okay, a medication reminder. What is the name of the medicine?", nextState: 'reminders_med_name' };
                }
                break;

            case 'reminders_med_name':
                 return { author: 'bot', text: `Great. And at what time should I remind you to take ${userInput}? (e.g., "8 AM" or "9 PM")`, nextState: 'reminders_med_time' };
            
            case 'reminders_med_time':
                 return { author: 'bot', text: `${EMOJIS.SUCCESS} All set! I will remind you.`, quickReplies: QUICK_REPLIES.MAIN_MENU, nextState: 'main_menu' };

            case 'profile':
                if (lowerInput.includes('prof_view')) {
                    return { author: 'bot', text: `${EMOJIS.PROFILE} Name: Ananya Sharma\nAge: 29\nAllergies: Pollen\nConditions: Asthma, Migraine.`, quickReplies: QUICK_REPLIES.PROFILE, nextState: 'profile' };
                }
                if (lowerInput.includes('prof_edit')) {
                    return { author: 'bot', text: "Which part of your profile would you like to edit?", quickReplies: QUICK_REPLIES.PROFILE_EDIT, nextState: 'profile_edit' };
                }
                break;
            
            case 'profile_edit':
                if (lowerInput.includes('prof_edit_basics')) {
                    return { author: 'bot', text: "This feature is coming soon! For now, please contact support to update your basic information.", quickReplies: QUICK_REPLIES.PROFILE_EDIT, nextState: 'profile_edit' };
                }
                 if (lowerInput.includes('prof_edit_contact')) {
                    return { author: 'bot', text: "This feature is coming soon! For now, please contact support to update your contact details.", quickReplies: QUICK_REPLIES.PROFILE_EDIT, nextState: 'profile_edit' };
                }
                break;
            
            case 'assistance':
                if (lowerInput.includes('explain_bp')) {
                     return { author: 'bot', text: `${EMOJIS.INSIGHT} Trend telescope: Your BP is steady! For a detailed graph, check the 'Vitals' tab.`, quickReplies: QUICK_REPLIES.ASSISTANCE, nextState: 'assistance' };
                }
                if (lowerInput.includes('symptom_mild')) {
                     return { author: 'bot', text: `${EMOJIS.HEALTH} For a mild headache, please rest and stay hydrated. If it worsens, let me know.`, quickReplies: QUICK_REPLIES.ASSISTANCE, nextState: 'assistance' };
                }
                if (lowerInput.includes('symptom_high')) {
                     return { author: 'bot', text: `${EMOJIS.EMERGENCY} High-severity symptom detected! I strongly recommend seeking immediate medical attention.`, quickReplies: QUICK_REPLIES.EMERGENCY, nextState: 'main_menu' };
                }
                 if (lowerInput.includes('predict_diabetes')) {
                     return { author: 'bot', text: `${EMOJIS.INSIGHT} Risk rune read: Your simulated diabetes risk is low! To keep it that way, aim for daily walks.`, quickReplies: QUICK_REPLIES.ASSISTANCE, nextState: 'assistance' };
                }
                break;
        }

        if (lowerInput.includes('main_menu')) {
            return { author: 'bot', text: "Is there anything else I can help with?", quickReplies: QUICK_REPLIES.MAIN_MENU, nextState: 'main_menu' };
        }

        return { author: 'bot', text: `${EMOJIS.ERROR} I'm still learning and my capabilities are limited. Please use the main menu for now.`, quickReplies: QUICK_REPLIES.MAIN_MENU, nextState: 'main_menu' };
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
