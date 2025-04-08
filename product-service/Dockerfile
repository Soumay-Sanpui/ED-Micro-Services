FROM node:18-alpine

# 👇 WORKDIR should be absolute
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start"]
