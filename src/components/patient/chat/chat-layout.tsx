
"use client";

import { useState } from 'react';
import { ChatList } from './chat-list';
import { ChatMessages } from './chat-messages';
import { ChatDetails } from './chat-details';
import { dummyChatData, dummyMessages } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function ChatLayout({ patientId, chats }) {
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id || null);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[calc(100vh-5rem)] items-stretch"
    >
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        maxSize={30}
        className={cn(selectedChatId === null && "max-w-full", "min-w-[200px]")}
      >
        <ChatList chats={chats} selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      {selectedChat ? (
        <>
          <ResizablePanel defaultSize={50} minSize={30}>
            <ChatMessages
              chat={selectedChat}
              patientId={patientId}
              messages={dummyMessages[selectedChat.id] || []}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <ChatDetails chat={selectedChat} />
          </ResizablePanel>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a chat to start messaging
        </div>
      )}
    </ResizablePanelGroup>
  );
}
