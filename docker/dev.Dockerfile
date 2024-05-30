FROM node:20-alpine

WORKDIR /scrabble-scorer
COPY back-end/ ./back-end
COPY front-end/ ./front-end

WORKDIR /scrabble-scorer/front-end
RUN npm install
RUN npm run build
RUN mkdir ../back-end/public && mv dist/* ../back-end/public

WORKDIR /scrabble-scorer/back-end
RUN npm install
RUN npm run build
RUN mv ./public ./dist

CMD ["node", "dist/server.js"]