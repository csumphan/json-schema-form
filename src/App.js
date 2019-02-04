import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Form from './components/Form'
import TableView from './containers/TableView'
import Sidebar from './components/Sidebar'

import schema from './formSchema.json'

import logo from './logo.svg';
import './App.css';

const log = (type) => console.log.bind(console, type);
const routes = []
Object.keys(schema).forEach((key) => {
  routes.push(
    {
      path: `/${key.toLowerCase()}`,
      main: (props) => <TableView schema={schema[key]} {...props}/>,
      exact: true
    },
    {
      path: `/${key.toLowerCase()}/new`,
      main: (props) => <div className=' col-sm-7 form-container'>
      <Form
        schema={schema[key].form}
        uiSchema={schema[key].ui}
        {...props}/>
      </div>,
      exact: true
    }
  )
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className='app-wrapper'>
            <Sidebar schema={schema}>
                {/* <div className='form-container'>
                  <Form schema={schema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('error')} />
                </div> */}
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
            </Sidebar>
          </div>
        </Router>
      </div>

    );
  }
}

export default App;
