sudo yum update && curl -fsSL https://get.docker.com -o get-docker.sh \
&& sudo sh get-docker.sh \
&& sudo systemctl start docker \
&& sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose \
&& sudo chmod +x /usr/local/bin/docker-compose
