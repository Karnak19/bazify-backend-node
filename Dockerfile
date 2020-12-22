FROM node:14.15
WORKDIR /usr/src/app
ARG PORT=${PORT}
ARG DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production
ADD . /usr/src/app
RUN npm install
EXPOSE ${PORT}
CMD [ "npm", "start" ]