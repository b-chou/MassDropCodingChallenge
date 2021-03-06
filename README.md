# MassDropCodingChallenge

Deployed endpoint at: 198.199.101.94:3000
Navigate to 198.199.101.94:3000 for a UI and additional instructions

# Build Process

    1. npm install
    2. npm run watch-client (webpacks react files into a bundle)
    3. npm run build (transpiles server files from ES6 to ES5)
    4. Run Server:
        npm test (local server)
                or
        forever start dev/server/server.js 

Map all network calls to 'http://localhost:3000' instead of '198.199.101.94:3000' for local use
# Actions

To add a website to the worker's queue:

    curl --data "url=www.google.com" http://198.199.101.94:3000/archive
    Endpoint: 198.199.101.94:3000/archive

To access a website based off of job number

    Example Job #1:
    Navigate to http://198.199.101.94:3000/1 in browser

View Queue and Existing Job Table and associated URL: 

    curl http://198.199.101.94:3000/queue

Change Worker Interval (Default is 5000 ms):

    Example Change Interval to 1 Minute:
    curl --data "ms=60000" http://198.199.101.94:3000
