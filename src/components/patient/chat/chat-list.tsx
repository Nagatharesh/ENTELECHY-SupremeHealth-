
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { dummyDoctors, Chat } from "@/lib/dummy-data";
import { formatDistanceToNow } from 'date-fns';

export function ChatList({ chats, selectedChatId, onSelectChat }: { chats: Chat[], selectedChatId: string | null, onSelectChat: (id: string) => void }) {

    const getDoctor = (doctorId: string) => dummyDoctors.find(d => d.id === doctorId);

    return (
        <div className="h-full flex flex-col glassmorphism !border-r-border/50">
            <div className="p-4">
                <h2 className="text-xl font-bold text-gradient-glow">Conversations</h2>
            </div>
            <ScrollArea className="flex-1">
                {chats.map((chat) => {
                    const doctor = getDoctor(chat.doctorId);
                    const isSelected = selectedChatId === chat.id;
                    return (
                        <div
                            key={chat.id}
                            className={cn(
                                "p-3 flex items-center gap-3 cursor-pointer border-b border-border/50 transition-colors",
                                isSelected ? "bg-primary/20" : "hover:bg-primary/10"
                            )}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            <Avatar className="h-12 w-12 border-2 border-primary/50">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${doctor?.id}`} alt={doctor?.name} />
                                <AvatarFallback>{doctor?.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-white truncate">{doctor?.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: true })}</p>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unreadCount > 0 && <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">{chat.unreadCount}</div>}
                        </div>
                    );
                })}
            </ScrollArea>
        </div>
    );
}
