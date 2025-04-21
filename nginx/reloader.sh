#!/bin/sh

echo "▶ Watching for nginx.conf changes..."

while true; do
  inotifywait -e close_write /etc/nginx/nginx.conf
  echo "🔁 Reloading NGINX..."
  nginx -s reload
done
