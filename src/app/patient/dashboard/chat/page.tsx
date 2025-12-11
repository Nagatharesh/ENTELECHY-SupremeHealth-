
"use client";
import { ChatLayout } from "@/components/patient/chat/chat-layout";
import { dummyChatData } from "@/lib/dummy-data";
import { Suspense } from "react";

export default function ChatPage() {
  // In a real app, you'd fetch the patient's ID from auth state
  const patientId = "patient_001";
  const chats = dummyChatData.filter(chat => chat.patientId === patientId);

  return (
     <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p className="text-lg text-gradient-glow animate-pulse">Loading Secure Chat...</p></div>}>
      <ChatLayout
        patientId={patientId}
        chats={chats}
      />
    </Suspense>
  );
}
