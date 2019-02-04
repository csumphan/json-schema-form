import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

import TableView from './TableView'
import Form from '../components/Form'

//TO BE REMOVED

class TableNavigation extends Component {
  render() {
    console.log('this.propsss', this.props)
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}/new`}
            component={
              (props) => <div className=' col-sm-7 form-container'>
                <Form
                  schema={this.props.schema.form}
                  uiSchema={this.props.schema.ui}
                  {...props}/>
                </div>
            }
          />
          <Route
            exact
            path={`${this.props.match.path}`}
            component={(props) => <TableView schema={this.props.schema} {...props}/>}
          />
        </Switch>
      </Router>
    )
  }
}

export default TableNavigation
