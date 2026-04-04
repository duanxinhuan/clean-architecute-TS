FROM node:18-slim
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
