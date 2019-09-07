FROM ubuntu:18.04

RUN apt-get update && \
#    apt-get upgrade && \
    apt-get install -y curl && \
    apt-get install -y sudo && \
    apt-get install -y git && \
    curl https://sail.dev/install.sh | bash

# Share the host's docker socket with the Sail project so that you can
# access it using the docker client.

RUN sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

RUN sudo apt-key fingerprint 0EBFCD88

RUN sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Only install the client since we're using the docker daemon system running on the host.
RUN sudo apt-get install -y docker-ce-cli
