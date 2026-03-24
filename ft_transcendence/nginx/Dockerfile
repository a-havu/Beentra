FROM nginx:alpine

# Install openssl to generate self-signed certificate
RUN apk add --no-cache openssl

# Generate self-signed certificate for localhost
RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/localhost.key \
      -out /etc/nginx/ssl/localhost.crt \
      -subj "/C=FI/ST=Helsinki/L=Helsinki/O=Beentra/CN=beentra.fi"

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
