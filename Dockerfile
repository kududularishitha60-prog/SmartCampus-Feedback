
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY submit.html .
COPY feedback.html .
COPY analytics.html .
COPY about.html .
COPY thank-you.html .
COPY assets ./assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

