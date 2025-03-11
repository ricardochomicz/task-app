# Use a imagem base do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package.json ./
COPY package-lock.json ./

# Instale as dependências do projeto
RUN npm install --legacy-peer-deps

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Ajuste as permissões dos arquivos
RUN chmod -R 755 /app

# Construa o aplicativo para produção
RUN npm run build

# Use uma imagem base do Nginx para servir o aplicativo
FROM nginx:alpine

# Copie os arquivos de build do React para o diretório padrão do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponha a porta 80 para acessar o aplicativo
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]