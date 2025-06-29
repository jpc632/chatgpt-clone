#!/bin/bash

# Docker management script for ChatGPT Clone

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if .env file exists
check_env() {
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating from template..."
        if [ -f env.example ]; then
            cp env.example .env
            print_status "Created .env file from template. Please edit it with your OpenAI API key."
        else
            print_error "env.example not found. Please create a .env file with your OpenAI API key."
            exit 1
        fi
    fi
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
}

# Function to build and run production services
run_production() {
    print_status "Building and running production services..."
    docker-compose up --build
}

# Function to build and run development services
run_development() {
    print_status "Building and running development services..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Function to stop all services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
}

# Function to clean up Docker resources
cleanup() {
    print_status "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans
    docker system prune -f
}

# Function to show logs
show_logs() {
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose logs -f
    fi
}

# Function to show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  prod, production    Build and run production services"
    echo "  dev, development    Build and run development services with hot reload"
    echo "  stop                Stop all services"
    echo "  logs [dev]          Show logs (use 'dev' for development services)"
    echo "  cleanup             Clean up Docker resources"
    echo "  help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 prod             # Run production services"
    echo "  $0 dev              # Run development services"
    echo "  $0 logs dev         # Show development logs"
}

# Main script logic
case "${1:-help}" in
    "prod"|"production")
        check_docker
        check_env
        run_production
        ;;
    "dev"|"development")
        check_docker
        check_env
        run_development
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        show_logs "$2"
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|*)
        show_help
        ;;
esac 