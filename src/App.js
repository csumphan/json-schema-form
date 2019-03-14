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

// This maps the keys in the schema (which are for example spacetype, sensor, user, etc)
// and create routes that the user can access the table view and the form view
Object.keys(schema).forEach((key) => {
  routes.push(
    {
      // this is the table view route which can be access by "/{name of key}"
      path: `/${key.toLowerCase()}`,
      main: (props) => <TableView schema={schema[key]} {...props}/>,
      exact: true
    },
    {
      //this is the form view for a new form, access by "/{name of key}/new"
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
      //this is the form view for an edit form, access by "/{name of key}/edit"
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
                 {
                   /* here we use the "routes" array and create Route components for each item in the array.
                   The following lines actually creates the routes, while the items in the "routes" array
                   describes the routes */ 
                }
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
