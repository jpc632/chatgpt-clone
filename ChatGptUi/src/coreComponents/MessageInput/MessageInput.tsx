import React from 'react';
import { TextField } from '@mui/material';

type MessageInputProps = {
  text: string;
  setText: (value: string) => void;
  onSend?: () => void;
  loading?: boolean;
};

export const MessageInput: React.FC<MessageInputProps> = ({ text, setText, onSend, loading }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey && onSend && !loading) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <TextField
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyPress={handleKeyPress}
      sx={{
        marginRight: "20px",
        "& .MuiInputBase-input": {
          color: "#ffffff", // Input text
        },
        "& .MuiInputLabel-root": {
          color: "#a0aec0", // Label
        },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#2d3748",
          "& fieldset": {
            borderColor: "#4a5568", // Default border
          },
          "&:hover fieldset": {
            borderColor: "#718096", // Hover border
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4299e1", // Focused border
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#63b3ed", // Focused label
        },
      }}
      fullWidth
      id="outlined-required"
      inputProps={{ maxLength: 1000 }}
      label="Type your message here... (Press Enter to send)"
      disabled={loading}
    />
  );
};
