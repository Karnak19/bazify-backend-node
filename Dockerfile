FROM node:14-alpine
WORKDIR /usr/src/app
ARG PORT=${PORT}
ARG DATABASE_URL=${DATABASE_URL}
ARG AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ARG AWS_SECRET_KEY=${AWS_SECRET_KEY}
ARG S3_BUCKET=${S3_BUCKET}
ADD . /usr/src/app
RUN npm install
ENV NODE_ENV=production
EXPOSE 80
CMD [ "npm", "start" ]