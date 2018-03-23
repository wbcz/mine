FROM node:v1

RUN mkdir /mine

WORKDIR /mine

COPY . /mine
# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN npm install -g yarn

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]
