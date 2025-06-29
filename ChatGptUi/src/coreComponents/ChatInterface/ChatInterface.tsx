import './ChatInterfaceStyles.css'
import React, { useState } from 'react';
import { getMessageDisplayMessage } from '../../clients/Clients';
import { type SelectChangeEvent } from '@mui/material';
import { ModelSelector } from '../ModelSelector/ModelSelector';
import { SendButton } from '../SendButton/SendButton';
import { MessageInput } from '../MessageInput/MessageInput';
import type { ChatMessage } from '../../requestInterfaces/RequestInterfaces';

interface ChatInterfaceProps {
}

export const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'You are a helpful AI assistant. You can help with code review, general questions, and various tasks.' }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState<string>('gpt-3.5-turbo');
  const [comment, setComment] = useState<string>("");

  const sendToAi = async (body: string) => {
    if (!comment.trim()) return;
    
    setLoading(true);
    
    // Add user message to conversation
    const userMessage: ChatMessage = { role: 'user', content: comment };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
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
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Sorry, there was an error processing your request."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setAIModel(selectedValue);
  };

  const clearConversation = () => {
    setMessages([
      { role: 'system', content: 'You are a helpful AI assistant. You can help with code review, general questions, and various tasks.' }
    ]);
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
      {/* Conversation History */}
      <div style={{ 
        maxHeight: '400px', 
        overflowY: 'auto', 
        border: '1px solid #444', 
        borderRadius: '8px', 
        padding: '1rem', 
        marginBottom: '1rem',
        backgroundColor: '#1e1e1e',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: '#ffffff' }}>Conversation History</h3>
          <button 
            onClick={clearConversation}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
          >
            Clear Chat
          </button>
        </div>
        
        {messages.slice(1).map((message, index) => (
          <div 
            key={index} 
            style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: message.role === 'user' ? '#2d3748' : '#1a202c',
              borderLeft: `4px solid ${message.role === 'user' ? '#4299e1' : '#48bb78'}`,
              color: '#ffffff'
            }}
          >
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              color: message.role === 'user' ? '#63b3ed' : '#68d391'
            }}>
              {message.role === 'user' ? 'You' : 'Assistant'}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>{message.content}</div>
          </div>
        ))}
      </div>

      <div className="ChatInterface">
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
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