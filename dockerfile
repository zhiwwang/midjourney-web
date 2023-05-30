FROM nginx

EXPOSE 8080

COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
COPY run.sh /root/

ENTRYPOINT ["sh", "/root/run.sh"]