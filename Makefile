# Variables
DOCKER_COMPOSE = docker-compose
DOCKER = docker
APP_NAME = vite-app

# Commandes Docker
build:
	$(DOCKER) build -t $(APP_NAME) .

run:
	$(DOCKER) run -p 3000:80 $(APP_NAME)

stop:
	$(DOCKER) stop $(APP_NAME) || true
	$(DOCKER) rm $(APP_NAME) || true

clean:
	$(DOCKER) system prune -a -f

logs:
	$(DOCKER) logs -f $(APP_NAME)

# Commandes Docker Compose
up:
	$(DOCKER_COMPOSE) up --build -d

down:
	$(DOCKER_COMPOSE) down

restart: down up

dev:
	$(DOCKER_COMPOSE) -f docker-compose.yml up --build

# Aide
help:
	@echo "Commandes disponibles :"
	@echo "  make build      -> Build l'image Docker"
	@echo "  make run        -> Exécute le conteneur Docker en standalone"
	@echo "  make stop       -> Stoppe et supprime le conteneur"
	@echo "  make clean      -> Supprime toutes les images inutilisées"
	@echo "  make logs       -> Affiche les logs du conteneur"
	@echo "  make up         -> Démarre le projet en mode production avec docker-compose"
	@echo "  make down       -> Stoppe les conteneurs Docker Compose"
	@echo "  make restart    -> Redémarre les conteneurs Docker Compose"
	@echo "  make dev        -> Démarre le mode développement avec hot reload (Vite)"
