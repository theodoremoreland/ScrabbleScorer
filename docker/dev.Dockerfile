FROM node:20-alpine

WORKDIR /scrabble-scorer
COPY back-end/ ./back-end
COPY front-end/ ./front-end

WORKDIR /scrabble-scorer/back-end
RUN npm install
RUN npm run build

WORKDIR /scrabble-scorer/front-end
RUN npm install
RUN npm run build

WORKDIR /scrabble-scorer/back-end

CMD ["node", "dist/server.js"]