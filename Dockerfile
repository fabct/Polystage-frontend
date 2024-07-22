FROM node:22.1.0

WORKDIR /usr/src/app
COPY vite-project/package*.json ./

RUN npm install

COPY vite-project/ ./

ENV VITE_PORT=$PORT
ENV VITE_HOST=$HOST
ENV BACKEND_URL=$BACKEND_URL
RUN npm run build

EXPOSE $PORT

CMD [ "npm", "run", "preview" ]