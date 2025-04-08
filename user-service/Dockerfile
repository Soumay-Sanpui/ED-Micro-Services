FROM node:18-alpine

# 👇 WORKDIR should be absolute
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
