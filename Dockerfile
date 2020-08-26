FROM node:alpine 
WORKDIR /app
ADD package.json .
RUN yarn install
ADD . ./
CMD ["yarn", "start"]