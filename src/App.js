import React, { Component } from 'react';
import Form from './components/Form'
import TableView from './containers/TableView'
import Sidebar from './components/Sidebar'

import schema from './schema.json'

import logo from './logo.svg';
import './App.css';

const log = (type) => console.log.bind(console, type);

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className='app-wrapper'>
          <Sidebar />
          {/* <div className='form-container'>
            <Form schema={schema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('error')} />
          </div> */}
          <TableView />
        </div>
      </div>

    );
  }
}

export default App;
