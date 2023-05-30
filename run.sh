sed -i "s#API_BASE_URL#'$API_BASE_URL'#g" /etc/nginx/conf.d/default.conf
echo "export default {" > /usr/share/nginx/html/conf.js
echo "    imgBaseUrl: '$IMG_BASE_URL'" >>  /usr/share/nginx/html/conf.js
echo "}" >>  /usr/share/nginx/html/conf.js
nginx -g 'daemon off;'