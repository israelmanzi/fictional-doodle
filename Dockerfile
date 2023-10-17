FROM node:lts
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

RUN npm prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
