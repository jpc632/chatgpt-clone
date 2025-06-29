# ChatGPT Clone

A modern ChatGPT-like application built with React and .NET that provides AI-powered conversations and assistance. This application features a clean, responsive interface similar to ChatGPT with support for multiple AI models and conversation management.

## Features

- **Conversation Context**: Maintains full conversation history for contextual responses
- **Multiple AI Models**: Support for different OpenAI models (GPT-3.5-turbo, GPT-4, etc.)
- **Real-time Chat Interface**: Modern chat UI with message history and typing indicators
- **Conversation Management**: Clear chat functionality to start fresh conversations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Keyboard Shortcuts**: Press Enter to send messages
- **Message Rendering**: Supports markdown formatting and code highlighting

## Architecture

### Backend (.NET 8 API)
- **CodeReviewController**: Handles chat requests and forwards conversation history to OpenAI
- **ChatMessage Model**: Represents individual messages in the conversation
- **Stateless Design**: Each request includes full conversation context
- **Swagger Documentation**: Built-in API documentation at `/swagger`

### Frontend (React + TypeScript)
- **Modern UI**: Clean, ChatGPT-like interface with Material-UI components
- **Conversation State Management**: Maintains message history in React state
- **Real-time UI Updates**: Immediate display of user and assistant messages
- **Responsive Design**: Modern chat interface with scrollable conversation history
- **TypeScript**: Full type safety throughout the application

## How Conversation Context Works

1. **Frontend State**: The React app maintains an array of `ChatMessage` objects
2. **Message Structure**: Each message has a `role` ('user', 'assistant', 'system') and `content`
3. **API Requests**: The full conversation history is sent with each request to the backend
4. **Backend Forwarding**: The backend forwards the complete message array to OpenAI's API
5. **Context Preservation**: OpenAI receives the full conversation and can provide contextual responses

## Getting Started

### Prerequisites
- .NET 8+ for backend
- Node.js 18+ for frontend
- OpenAI API key

### Backend Setup
```bash
cd OpenAiApi
dotnet restore
dotnet run
```

### Frontend Setup
```bash
cd ChatGptUi
npm install
npm run dev
```

## Docker Support

This project includes full Docker support for both development and production environments.

### Quick Start with Docker

1. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env and add your OpenAI API key
   ```

2. **Run with Docker:**
   ```bash
   # Production
   ./docker-run.sh prod
   
   # Development (with hot reload)
   ./docker-run.sh dev
   ```

3. **Access the application:**
   - Production: http://localhost:3000
   - Development: http://localhost:5173
   - API: http://localhost:5000 (production) or http://localhost:5221 (development)

### Docker Commands

```bash
# Production
./docker-run.sh prod

# Development
./docker-run.sh dev

# Stop services
./docker-run.sh stop

# View logs
./docker-run.sh logs
./docker-run.sh logs dev

# Cleanup
./docker-run.sh cleanup
```

For detailed Docker documentation, see [DOCKER_README.md](DOCKER_README.md).

## Usage

1. Start both backend and frontend servers
2. Type your message in the input field
3. Press Enter or click the send button
4. View the conversation history in the chat interface
5. Use the "Clear Chat" button to start a new conversation
6. Switch between different AI models using the model selector

## API Endpoints

- `POST /codereview`: Send conversation messages to OpenAI
  - Request body: `{ "Code": string, "GptModel": string, "Messages": ChatMessage[] }`
  - Response: OpenAI chat completion response

## Conversation Flow

1. User types message → Added to conversation state
2. Full conversation sent to backend → Backend forwards to OpenAI
3. OpenAI response received → Added to conversation state
4. UI updates to show new message → Ready for next interaction

This design ensures that each conversation maintains full context, allowing for natural, contextual interactions similar to ChatGPT.

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/ecbdbb89-07d0-463e-ab2e-8743f6d24d26" alt="chatgpt-clone screenshot" width="80%">
</p>

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download) 
- [Node.js 18+](https://nodejs.org/) 
- An [OpenAI API key](https://platform.openai.com/api-keys)  

---

## Installation and Setup

**1. Clone the repo**  
 ```bash
 git clone https://github.com/your-username/chatgpt-clone
 cd chatgpt-clone
```

**2. Configure your OpenAI API key**

**Option A: Using appsettings.json (for local development)**
- Create or edit `OpenAiApi/appsettings.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "OpenAI": {
    "ApiKey": "YOUR_OPENAI_API_KEY"
  }
}
```

**Option B: Using environment variables (recommended for Docker)**
- Copy the example environment file:
```bash
cp env.example .env
```
- Edit `.env` and add your API key:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**3. Install dependencies**

```bash
# Backend
cd OpenAiApi
dotnet restore

# Frontend
cd ChatGptUi
npm install
```

**4. Run the application**

```bash
# Backend (in OpenAiApi directory)
dotnet run

# Frontend (in ChatGptUi directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5221
- API Documentation: http://localhost:5221/swagger

## Development

### Project Structure
```
chatgpt-clone/
├── ChatGptUi/                 # React frontend
│   ├── src/
│   │   ├── coreComponents/    # React components
│   │   ├── clients/          # API client functions
│   │   └── config/           # Configuration files
│   └── Dockerfile            # Frontend container
├── OpenAiApi/                # .NET backend
│   ├── Controllers/          # API controllers
│   └── Dockerfile            # Backend container
├── docker-compose.yml        # Production orchestration
├── docker-compose.dev.yml    # Development orchestration
└── docker-run.sh            # Docker management script
```

### Available Scripts

**Frontend (ChatGptUi/)**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend (OpenAiApi/)**
- `dotnet run` - Start development server
- `dotnet build` - Build the project
- `dotnet test` - Run tests (if any)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [.NET 8](https://dotnet.microsoft.com/)
- UI components from [Material-UI](https://mui.com/)
- Powered by [OpenAI API](https://openai.com/api/)
