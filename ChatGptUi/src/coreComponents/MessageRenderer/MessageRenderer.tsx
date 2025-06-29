import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import './MessageRendererStyles.css';

interface MessageRendererProps {
  content: string;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({ content }) => {
  // Custom components for ReactMarkdown
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      
      if (inline) {
        return (
          <code className="inline-code" {...props}>
            {children}
          </code>
        );
      }
      
      return (
        <CodeBlock language={language}>
          {String(children).replace(/\n$/, '')}
        </CodeBlock>
      );
    },
    p: ({ children, ...props }: any) => (
      <p className="message-paragraph" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="message-list" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="message-list" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="message-list-item" {...props}>
        {children}
      </li>
    ),
    h1: ({ children, ...props }: any) => (
      <h1 className="message-heading" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="message-heading" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="message-heading" {...props}>
        {children}
      </h3>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="message-blockquote" {...props}>
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="message-renderer">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}; 