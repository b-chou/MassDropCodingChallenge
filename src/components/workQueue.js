import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class WorkQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      workQueue: [],
      value: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch('http://198.199.101.94:3000/queue')
      .then(response => response.json())
        .then(responseData => {
          this.setState({
            workQueue: responseData,
            loading: false,
          });
        });
  }

  handleChange(input) {
    this.setState({
      value: input.target.value,
    });
  }

  handleSubmit() {
    const regexUrl = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (this.state.value.match(regexUrl)) {
      fetch('http://198.199.101.94:3000/archive', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: this.state.value }),
      }).then(() => {
        this.setState({
          value: '',
          loading: true,
          error: 'Submitted to queue',
        });
        this.componentDidMount();
      });
    } else {
      this.setState({
        error: 'Invalid URL formatting',
      });
    }
  }

  render() {
    let count = 1;
    if (this.state.loading) {
      return (<h3 style={{ float: 'right' }} > Loading Work Queue </h3>);
    }
    return (
      <div style={{ float: 'right' }}>
        <h3> Work Queue </h3>
        {this.state.workQueue.queue.map(url => <p> {count++}. {url[0]} </p>)}
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
        <p style={{ color: 'red' }}> {this.state.error} </p>
        <h3> Job Mapping Table </h3>
        {this.state.workQueue.jobTable.map(url => <p> <a href={`http://198.199.101.94:3000/${url[0].match(/[0-9]+/)}`}>{url[0]}</a> : {url[1]} </p>)}
      </div>
    );
  }
}

export default WorkQueue;
