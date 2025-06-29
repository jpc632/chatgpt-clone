import React from 'react';
import { Loader2, MessageSquareShare } from 'lucide-react';

interface SendButtonProps {
  sendToAi: (content: string) => void;
  loading: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ sendToAi, loading }) => {

  const handleClick = () => {
    sendToAi("");
  };

  return (
    <button
      className="SendButton"
      title="Send to Ai"
      onClick={() => handleClick()}
      disabled={loading}
      style={{
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? (
        <Loader2 style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        <MessageSquareShare />
      )}
    </button>
  );
};
