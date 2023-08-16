#Layer 1
FROM node:18-alpine as builder

WORKDIR /frontend

COPY . .

RUN npm ci

RUN npm run build

#Layer 2

FROM nginx:stable-alpine3.17-slim as production

ENV NODE_ENV production

COPY --from=builder /frontend/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



