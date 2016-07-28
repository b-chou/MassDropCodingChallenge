/* eslint-disable max-len */
import React from 'react';

const Instructions = () => (
  <div id="instructions">
    <h1> Massdrop Coding Challenge </h1>
    <p> Deployed enpoint at: 198.199.101.94:3000 </p>
    <h2> Actions </h2>
    <h3> To add a website to the worker's queue: </h3>
    <p> curl --data "url=www.google.com" http://198.199.101.94:3000/archive</p>
    <h3> To access a website based off of job number: </h3>
    <p> Example Job #1: </p>
    <p> curl http://198.199.101.94:3000/1 </p>
    <h3> View Queue and Existing Job Table and associated URL: </h3>
    <p> curl http://198.199.101.94:3000 </p>
    <h3> Change Worker Interval: </h3>
    <p> Example Change Interval to 1 Minute: </p>
    <p> curl --data "ms=60000" http://198.199.101.94:3000 </p>
  </div>
);


export default Instructions;

// MassDropCodingChallenge

// Deployed endpoint at: 198.199.101.94:3000

// Actions

// To add an website to the worker's queue:

// curl --data "url=www.google.com" http://198.199.101.94:3000/archive
// Endpoint: 198.199.101.94:3000/archive
// To access a website based off of job number

// Example Job #1:
// curl http://198.199.101.94:3000/1
// View Queue and Existing Job Table and associated URL:

// curl http://198.199.101.94:3000
// Change Worker Interval:

// Example Change Interval to 1 Minute:
// curl --data "ms=60000" http://198.199.101.94:3000