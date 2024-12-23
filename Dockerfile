FROM node:21-alpine3.20 AS builder
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_GMAIL_SERVICE_ID
ARG VITE_EMAIL_TEMPLATE_ID
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN echo $VITE_EMAILJS_PUBLIC_KEY > /run/secrets/VITE_EMAILJS_PUBLIC_KEY && \
    echo $VITE_GMAIL_SERVICE_ID > /run/secrets/VITE_GMAIL_SERVICE_ID && \
    echo $VITE_EMAIL_TEMPLATE_ID > /run/secrets/VITE_EMAIL_TEMPLATE_ID
RUN npm run build

FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]