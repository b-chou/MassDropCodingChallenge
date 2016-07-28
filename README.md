# MassDropCodingChallenge

Deployed endpoint at: 198.199.101.94:3000
Navigate to 198.199.101.94:3000 for a UI and additional instructions

# Build Process

    1. npm install
    2. npm watch-client (webpacks react files into a bundle)
    3. npm run build (transpiles server files from ES6 to ES5)
    4. Run Server:
        npm run test (local server)
                or
        forever start dev/server/server.js 

# Actions

To add a website to the worker's queue:

    curl --data "url=www.google.com" http://198.199.101.94:3000/archive
    Endpoint: 198.199.101.94:3000/archive

To access a website based off of job number

    Example Job #1:
    curl http://198.199.101.94:3000/1

View Queue and Existing Job Table and associated URL: 

    curl http://198.199.101.94:3000

Change Worker Interval:

    Example Change Interval to 1 Minute:
    curl --data "ms=60000" http://198.199.101.94:3000
