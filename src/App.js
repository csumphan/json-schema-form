import React, { Component } from 'react';
import Form from './Form'

import schema from './schema.json'

import logo from './logo.svg';
import './App.css';

const log = (type) => console.log.bind(console, type);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='form-container'>
          <Form schema={schema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('error')} />
        </div>
      </div>
    );
  }
}

export default App;
