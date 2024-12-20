FROM node:21-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN --mount=type=secret,id=VITE_EMAILJS_PUBLIC_KEY \
    --mount=type=secret,id=VITE_GMAIL_SERVICE_ID \
    --mount=type=secret,id=VITE_EMAIL_TEMPLATE_ID \
    export VITE_EMAILJS_PUBLIC_KEY=$(cat /run/secrets/VITE_EMAILJS_PUBLIC_KEY) && \
    export VITE_GMAIL_SERVICE_ID=$(cat /run/secrets/VITE_GMAIL_SERVICE_ID) && \
    export VITE_EMAIL_TEMPLATE_ID=$(cat /run/secrets/VITE_EMAIL_TEMPLATE_ID)
RUN npm run build

FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]