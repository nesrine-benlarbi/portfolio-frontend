# ---------- Étape 1 : build de l'application React/Vite ----------
FROM node:20-alpine AS build

WORKDIR /app

# 1re couche : dépendances (mise en cache tant que package.json ne change pas)
COPY package.json package-lock.json ./
RUN npm ci

# URL de l'API injectée au moment du build (Vite lit les variables VITE_* au build)
ARG VITE_API_URL=http://localhost:3001/api
ENV VITE_API_URL=$VITE_API_URL

# 2e couche : code source, puis génération du dossier statique /app/dist
COPY . .
RUN npm run build

# ---------- Étape 2 : service statique via Nginx ----------
FROM nginx:alpine

# Configuration Nginx avec fallback SPA (toutes les routes -> index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie du build généré à l'étape 1
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
