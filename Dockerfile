FROM node:20-alpine

WORKDIR /usr/src/app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

EXPOSE 3000

# Comando padrão (será sobrescrito no compose)
CMD ["npm", "run", "dev"]
