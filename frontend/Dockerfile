# Etapa 1: Construcción
FROM node:18 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el código fuente y compilar la aplicación Angular
COPY . .
RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de construcción
COPY --from=builder /app/dist/desarrollo2/browser /usr/share/nginx/html

# Copiar el archivo default.conf a la ubicación correcta de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 4200
EXPOSE 4200

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
