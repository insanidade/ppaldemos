FROM node:latest
RUN mkdir -p /home/ppdemos
#ADD ./ppaldemos /home/ppdemos
COPY . /home/ppdemos/ 
WORKDIR /home/ppdemos
#RUN npm install
#RUN touch itworks.txt
#RUN echo "edited during image build process" > example.js
EXPOSE 3000
CMD ["npm", "run", "dev"]
