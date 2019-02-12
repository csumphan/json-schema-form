import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Form from './components/Form'
import TableView from './containers/TableView'
import Sidebar from './components/Sidebar'
import Property from './components/Property'

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
        formKey={key}
        schema={schema}
        definitions={schema.definitions}
        uiSchema={{...schema[key].ui }}
        onSubmit={ log('submit')}
        onChange={log('change')}
        liveValidate
        {...props}/>
      </div>,
      exact: true
    },
    {
      path: `/${key.toLowerCase()}/edit/:id`,
      main: (props) => <div className=' col-sm-7 form-container'>
      <Form
        formKey={key}
        schema={schema}
        definitions={schema.definitions}
        uiSchema={{...schema[key].ui }}
        onSubmit={ log('submit')}
        onChange={log('change')}
        formData={props.location.formData}
        liveValidate
        {...props}/>
      </div>,
      exact: false
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
