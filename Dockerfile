# Etapa de construcción
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Copia las variables de entorno (renombra 'env' a '.env' para Vite)
COPY env .env

# Construye la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia la configuración de nginx para SPA (Single Page Application)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

