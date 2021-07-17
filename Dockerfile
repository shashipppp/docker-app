FROM node:15
WORKDIR /docker
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["node", 'app.js']
