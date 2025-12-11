
"use client";

import { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ChatInput({ onSendMessage, isTyping }: { onSendMessage: (text: string) => void; isTyping: boolean }) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    return (
        <div className="p-4 border-t border-border/50">
            {isTyping && <p className="text-xs text-muted-foreground animate-pulse mb-2">Doctor is typing...</p>}
            <div className="relative">
                <Input
                    placeholder="Type your message..."
                    className="pr-24"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    suppressHydrationWarning
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    <Button variant="ghost" size="icon" disabled><Paperclip /></Button>
                    <Button size="sm" className="glowing-shadow-interactive" onClick={handleSend} suppressHydrationWarning><Send /></Button>
                </div>
            </div>
        </div>
    );
}
