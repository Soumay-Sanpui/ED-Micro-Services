FROM nginx:latest

RUN apt-get update && apt-get install -y inotify-tools

COPY reloader.sh /reloader.sh
RUN chmod +x /reloader.sh

CMD ["/bin/sh", "-c", "nginx && /reloader.sh"]