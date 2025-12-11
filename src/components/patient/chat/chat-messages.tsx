
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from './chat-input';
import { Chat, Message, dummyDoctors } from '@/lib/dummy-data';
import { format, formatDistanceToNow } from 'date-fns';

export function ChatMessages({ chat, patientId, messages: initialMessages }: { chat: Chat; patientId: string; messages: Message[] }) {
    const [messages, setMessages] = useState(initialMessages);
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const doctor = dummyDoctors.find(d => d.id === chat.doctorId);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                setTimeout(() => viewport.scrollTop = viewport.scrollHeight, 100);
            }
        }
    }, [messages]);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: `msg_${Date.now()}`,
            chatId: chat.id,
            senderId: patientId,
            senderRole: 'patient',
            text: text,
            type: 'text',
            createdAt: new Date().toISOString(),
            deliveredAt: null,
            seenAt: null
        };

        setMessages(prev => [...prev, newMessage]);

        // Simulate doctor seeing and replying
        setTimeout(() => {
             setMessages(prev => prev.map(m => ({ ...m, deliveredAt: new Date().toISOString() })));
        }, 500);
        setTimeout(() => {
             setMessages(prev => prev.map(m => ({ ...m, seenAt: new Date().toISOString() })));
             setIsTyping(true);
        }, 1500);
        setTimeout(() => {
             setIsTyping(false);
             const reply: Message = {
                id: `msg_${Date.now() + 1}`,
                chatId: chat.id,
                senderId: chat.doctorId,
                senderRole: 'doctor',
                text: "Thank you for your message. I am reviewing it now.",
                type: 'text',
                createdAt: new Date().toISOString(),
                deliveredAt: null,
                seenAt: null,
            };
            setMessages(prev => [...prev, reply]);
        }, 3000);
    };

    return (
        <div className="h-full flex flex-col glassmorphism">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-secondary/50">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${doctor?.id}`} alt={doctor?.name} />
                        <AvatarFallback>{doctor?.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-white text-lg">{doctor?.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor?.specialty}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="glowing-shadow-interactive" suppressHydrationWarning><Phone /></Button>
                    <Button variant="ghost" size="icon" className="glowing-shadow-interactive animate-ripple" suppressHydrationWarning><Video /></Button>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <MessageItem key={msg.id} message={msg} isOwn={msg.senderId === patientId} />
                    ))}
                </div>
            </ScrollArea>
            
            <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
    );
}

const MessageItem = ({ message, isOwn }: { message: Message, isOwn: boolean }) => {
    const [formattedTime, setFormattedTime] = useState('');
    const isSystem = message.senderRole === 'system';

    useEffect(() => {
        // Format the date only on the client side to prevent hydration errors.
        setFormattedTime(format(new Date(message.createdAt), 'p'));
    }, [message.createdAt]);

    const renderReceipt = () => {
        if (!isOwn) return null;
        if (message.seenAt) return <CheckCheck className="w-4 h-4 text-secondary" />;
        if (message.deliveredAt) return <CheckCheck className="w-4 h-4" />;
        return <Check className="w-4 h-4" />;
    };

    if (isSystem) {
        return (
            <div className="text-center text-xs text-muted-foreground my-2 p-2 bg-background/50 rounded-lg">
                <span className="italic">AutoReply (System): {message.text}</span>
            </div>
        );
    }

    return (
        <div className={cn("flex items-end gap-2", isOwn ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[70%] rounded-2xl p-3 text-sm", isOwn ? 'bg-primary text-primary-foreground rounded-br-none' : 'glassmorphism rounded-bl-none')}>
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div className={cn("text-xs mt-1 flex items-center gap-1", isOwn ? "justify-end" : "justify-start", isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {formattedTime || '...'}
                    {renderReceipt()}
                </div>
            </div>
        </div>
    );
};
