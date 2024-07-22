FROM node:22.1.0

WORKDIR /usr/src/app
COPY vite-project/package*.json ./

RUN npm install

COPY vite-project/ ./

ARG VITE_PORT
ENV VITE_PORT=$VITE_PORT
ARG VITE_HOST
ENV VITE_HOST=$VITE_HOST
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

EXPOSE $VITE_PORT

CMD ["npm", "run", "preview"]
