/* eslint-disable max-len */
import React from 'react';

const Instructions = () => (
  <div id="instructions">
    <h1> Massdrop Coding Challenge </h1>
    <p> Deployed endpoint at: 198.199.101.94:3000 </p>
    <h2> Actions </h2>
    <h3> To add a website to the worker's queue: </h3>
    <p> curl --data "url=www.google.com" http://198.199.101.94:3000/archive</p>
    <p> or </p>
    <p> Input URL into input field to the right and press submit. </p>
    <h3> To access a website based off of job number: </h3>
    <p> Example Job #1: </p>
    <p> curl http://198.199.101.94:3000/1 </p>
    <p> or </p>
    <p> Click the Job Number on the Job Mapping Table to the right </p>
    <h3> View Queue and Existing Job Table and associated URL: </h3>
    <p> curl http://198.199.101.94:3000 </p>
    <h3> Change Worker Interval: </h3>
    <p> Example Change Interval to 1 Minute: </p>
    <p> curl --data "ms=60000" http://198.199.101.94:3000 </p>
  </div>
);


export default Instructions;
