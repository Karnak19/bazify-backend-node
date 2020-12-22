FROM node:14.15
WORKDIR /usr/src/app
ARG PORT=${PORT}
ARG DATABASE_URL=${DATABASE_URL}
ADD . /usr/src/app
RUN npm install
ENV NODE_ENV=production
EXPOSE 80
CMD [ "npm", "start" ]