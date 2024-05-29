# Utilisez une image Node.js pour exécuter votre application
FROM node:22.1.0

# Créez un répertoire pour l'application dans le conteneur Docker
WORKDIR /usr/src/app

# Copiez package.json et package-lock.json dans le répertoire de l'application
COPY vite-project/package*.json ./vite-project/

# Changez le répertoire de travail pour le sous-répertoire vite-project
WORKDIR /usr/src/app/vite-project

# Installez les dépendances de l'application
RUN npm install

# Revenez au répertoire de l'application
WORKDIR /usr/src/app

# Copiez le reste des fichiers de l'application dans le répertoire de l'application
COPY . .

# Exposez le port que votre application utilise
EXPOSE 5050

# Définissez la commande pour exécuter votre application
CMD [ "npm", "--prefix", "vite-project", "run", "dev" ]