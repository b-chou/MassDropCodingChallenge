# MassDropCodingChallenge

Deployed endpoint at: 198.199.101.94:3000

# Actions

To add an website to the worker's queue:
  curl --data "url=www.google.com" http://198.199.101.94:3000/archive
  Endpoint: 198.199.101.94:3000/archive

To access a website based off of job number:
  Example Job #1:
  curl http://198.199.101.94:3000/1

View Queue and Existing Job Table and associated URL: 
  curl http://198.199.101.94:3000

Change Worker Interval:
  Example Change Interval to 1 Minute:
  curl --data "ms=60000" http://198.199.101.94:3000
