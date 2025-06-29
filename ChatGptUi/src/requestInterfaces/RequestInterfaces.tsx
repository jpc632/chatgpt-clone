export interface GitCommitFilePayload {
  inlineDiff: FilePayload;
  beforeContent: FilePayload;
  afterContent: FilePayload;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeReviewRequest {
  Code: string;
  GptModel: string;
  Messages: ChatMessage[];
}

export interface FilePayload {
  body: string;
  beforeFileName?: string | null;
  afterFileName?: string | null;
}    