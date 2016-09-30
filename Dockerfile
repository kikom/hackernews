FROM node:argon

# Create application directory
RUN mkdir -p /opt/hackernews
WORKDIR /opt/hackernews

# Copy necessary project files
COPY package.json hakernews.js scraper.js /opt/hackernews/

# Install dependencies
RUN npm install

ENTRYPOINT [ "node", "hakernews.js" ]