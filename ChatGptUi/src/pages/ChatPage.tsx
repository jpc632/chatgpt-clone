import React, { useState, useEffect } from 'react';
import { Sidebar } from '../coreComponents/Sidebar/Sidebar';
import { ChatViewer } from '../coreComponents/ChatViewer/ChatViewer';
import type { ChatSession } from '../requestInterfaces/RequestInterfaces';

export const ChatPage: React.FC = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('chatSessions');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt)
      }));
      setChatSessions(parsedChats);
      
      // Set the most recent chat as active, or the first one if no recent chat
      if (parsedChats.length > 0) {
        const mostRecent = parsedChats.reduce((latest: ChatSession, current: ChatSession) => 
          current.updatedAt > latest.updatedAt ? current : latest
        );
        setActiveChatId(mostRecent.id);
      }
    }
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: '',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant. You can help with code review, general questions, and various tasks.' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're deleting the active chat, select another one
    if (activeChatId === chatId) {
      const remainingChats = chatSessions.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id);
      } else {
        setActiveChatId(null);
      }
    }
  };

  const updateChat = (updatedChat: ChatSession) => {
    setChatSessions(prev => 
      prev.map(chat => chat.id === updatedChat.id ? updatedChat : chat)
    );
  };

  const activeChat = chatSessions.find(chat => chat.id === activeChatId) || null;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    }}> 
      <Sidebar
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        onChatSelect={selectChat}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
      />
      <ChatViewer
        chatSession={activeChat}
        onUpdateChat={updateChat}
      />
    </div>
  );
}; 