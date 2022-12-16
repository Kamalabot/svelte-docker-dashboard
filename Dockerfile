FROM node:18-alpine AS build
#got the image in
WORKDIR /app
#assigned the work directory 
COPY . .
#completing the install of the node_modules
RUN npm run build
#starting the second node
FROM node:18-alpine AS deploy-node
#initiating the work directory
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN npm install
CMD ["node","index.js"]
