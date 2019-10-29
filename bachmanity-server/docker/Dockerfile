FROM ruby:2.6.5

RUN apt-get update 
RUN apt-get install -y nodejs npm --no-install-recommends 
RUN npm install -g yarn 
RUN gem install rails 

WORKDIR /app 
