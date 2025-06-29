import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import type { ChatSession } from '../../requestInterfaces/RequestInterfaces';
import './SidebarStyles.css';

interface SidebarProps {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chatSessions,
  activeChatId,
  onChatSelect,
  onNewChat,
  onDeleteChat,
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getChatTitle = (chat: ChatSession) => {
    if (chat.title) return chat.title;
    
    // Generate title from first user message
    const firstUserMessage = chat.messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      const content = firstUserMessage.content;
      return content.length > 30 ? content.substring(0, 30) + '...' : content;
    }
    
    return 'New Chat';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-button" onClick={onNewChat}>
          <Plus size={16} />
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="chat-sessions">
        {chatSessions.length === 0 ? (
          <div className="empty-state">
            <MessageSquare size={24} />
            <p>No chats yet</p>
            <p>Start a new conversation!</p>
          </div>
        ) : (
          chatSessions.map((chat) => (
            <div
              key={chat.id}
              className={`chat-session ${activeChatId === chat.id ? 'active' : ''}`}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="chat-info">
                <div className="chat-title">{getChatTitle(chat)}</div>
                <div className="chat-date">{formatDate(chat.updatedAt)}</div>
              </div>
              <button
                className="delete-chat-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                title="Delete chat"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 