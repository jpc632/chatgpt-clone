import React, { useState } from 'react';
import { getMessageDisplayMessage } from '../../clients/Clients';
import { type SelectChangeEvent } from '@mui/material';
import { ModelSelector } from '../ModelSelector/ModelSelector';
import { SendButton } from '../SendButton/SendButton';
import { MessageInput } from '../MessageInput/MessageInput';
import { MessageRenderer } from '../MessageRenderer/MessageRenderer';
import type { ChatMessage, ChatSession } from '../../requestInterfaces/RequestInterfaces';
import './ChatViewerStyles.css';

interface ChatViewerProps {
  chatSession: ChatSession | null;
  onUpdateChat: (updatedChat: ChatSession) => void;
}

export const ChatViewer: React.FC<ChatViewerProps> = ({ chatSession, onUpdateChat }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState<string>('gpt-3.5-turbo');
  const [comment, setComment] = useState<string>("");

  const sendToAi = async (body: string) => {
    if (!comment.trim() || !chatSession) return;
    
    setLoading(true);
    
    // Add user message to conversation
    const userMessage: ChatMessage = { role: 'user', content: comment };
    const updatedMessages = [...chatSession.messages, userMessage];
    
    // Update chat session with new message
    const updatedChat: ChatSession = {
      ...chatSession,
      messages: updatedMessages,
      updatedAt: new Date()
    };
    onUpdateChat(updatedChat);
    
    // Clear the input
    setComment("");

    try {
      const response = await getMessageDisplayMessage({ 
        Code: body, 
        GptModel: aiModel, 
        Messages: updatedMessages 
      });
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response."
      };
      
      // Add assistant response to conversation
      const finalUpdatedChat: ChatSession = {
        ...updatedChat,
        messages: [...updatedMessages, assistantMessage],
        updatedAt: new Date()
      };
      onUpdateChat(finalUpdatedChat);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Sorry, there was an error processing your request."
      };
      
      const errorUpdatedChat: ChatSession = {
        ...updatedChat,
        messages: [...updatedMessages, errorMessage],
        updatedAt: new Date()
      };
      onUpdateChat(errorUpdatedChat);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setAIModel(selectedValue);
  };

  const clearConversation = () => {
    if (!chatSession) return;
    
    const clearedChat: ChatSession = {
      ...chatSession,
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant. You can help with code review, general questions, and various tasks.' }
      ],
      updatedAt: new Date()
    };
    onUpdateChat(clearedChat);
  };

  if (!chatSession) {
    return (
      <div className="chat-viewer-empty">
        <div className="empty-state">
          <h2>Welcome to AI Chat</h2>
          <p>Select a chat from the sidebar or create a new one to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-viewer">
      {/* Conversation History */}
      <div className="conversation-container">
        <div className="conversation-header">
          <h3>Conversation</h3>
          <button 
            onClick={clearConversation}
            className="clear-chat-button"
            title="Clear conversation"
          >
            Clear Chat
          </button>
        </div>
        
        <div className="messages-container">
          {chatSession.messages.slice(1).map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-header">
                {message.role === 'user' ? 'You' : 'Assistant'}
              </div>
              <div className="message-content">
                <MessageRenderer content={message.content} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-controls">
          <ModelSelector aiModel={aiModel} handleChange={handleChange} />
          <MessageInput 
            text={comment} 
            setText={setComment} 
            onSend={() => sendToAi("")}
            loading={loading}
          />
          <SendButton sendToAi={sendToAi} loading={loading} />
        </div>
      </div>
    </div>
  );
}; 