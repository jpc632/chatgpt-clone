# Docker Setup for ChatGPT Clone

This project includes Docker support for both the React frontend and .NET API backend.

## Prerequisites

- Docker Desktop installed and running
- OpenAI API key

## Quick Start

1. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

2. **Build and run the services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000
   - API Swagger UI: http://localhost:5000/swagger

## Services

### Frontend (React + Vite)
- **Port:** 3000
- **Technology:** React 19, TypeScript, Vite
- **Container:** nginx for serving static files

### Backend (.NET 8 API)
- **Port:** 5000
- **Technology:** .NET 8, ASP.NET Core
- **Features:** OpenAI integration, Swagger documentation

## Docker Commands

### Build and run all services
```bash
docker-compose up --build
```

### Run in detached mode
```bash
docker-compose up -d --build
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs frontend
docker-compose logs api
```

### Rebuild a specific service
```bash
docker-compose build frontend
docker-compose build api
```

## Development

### Running individual services

**Frontend only:**
```bash
cd ChatGptUi
docker build -t chatgpt-frontend .
docker run -p 3000:80 chatgpt-frontend
```

**API only:**
```bash
cd OpenAiApi
docker build -t chatgpt-api .
docker run -p 5000:5000 -e OpenAI__ApiKey=your_key chatgpt-api
```

### Development with hot reload

For development with hot reload, you can run the services directly:

**Frontend:**
```bash
cd ChatGptUi
npm install
npm run dev
```

**API:**
```bash
cd OpenAiApi
dotnet run
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `ASPNETCORE_ENVIRONMENT` | .NET environment (Production/Development) | No (default: Production) |
| `NODE_ENV` | Node.js environment | No (default: production) |

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change ports in `docker-compose.yml`
   - Or stop existing services using those ports

2. **OpenAI API key not working:**
   - Ensure the key is valid and has sufficient credits
   - Check the `.env` file is properly formatted

3. **Build failures:**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild: `docker-compose build --no-cache`

4. **Frontend can't connect to API:**
   - Ensure both services are running
   - Check the nginx configuration in `ChatGptUi/nginx.conf`

### Logs and Debugging

```bash
# View real-time logs
docker-compose logs -f

# Access container shell
docker-compose exec frontend sh
docker-compose exec api sh

# Check container status
docker-compose ps
```

## Production Deployment

For production deployment, consider:

1. **Security:**
   - Use secrets management for API keys
   - Enable HTTPS
   - Configure proper CORS policies

2. **Performance:**
   - Use multi-stage builds (already implemented)
   - Configure nginx caching
   - Set up CDN for static assets

3. **Monitoring:**
   - Add health checks
   - Set up logging aggregation
   - Monitor resource usage

## File Structure

```
chatgpt-clone/
├── docker-compose.yml          # Main orchestration file
├── env.example                 # Environment variables template
├── DOCKER_README.md           # This file
├── ChatGptUi/
│   ├── Dockerfile             # Frontend container
│   ├── nginx.conf             # Nginx configuration
│   └── .dockerignore          # Frontend ignore rules
└── OpenAiApi/
    ├── Dockerfile             # API container
    └── .dockerignore          # API ignore rules
``` 