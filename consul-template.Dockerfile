FROM  hashicorp/consul-template:0.32.0

USER root
RUN mkdir -p /etc/nginx && chmod 777 /etc/nginx

ENTRYPOINT ["/bin/consul-template"]