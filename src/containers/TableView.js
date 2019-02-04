import React, { Component } from 'react'
import { Link } from "react-router-dom"

import TableLayout from '../layout/TableLayout'
import Form from '../components/Form'
import Table from '../components/Table'
import Button from '../components/Button'

class TableView extends Component {
  render() {
    console.log('match', this.props)
    return (
      <div>
        <TableLayout>
          <TableLayout.Header>
            <TableLayout.Title>{this.props.schema.label}</TableLayout.Title>
            <Link to={`${this.props.match.path}/new`}>
              <Button><i class='fas fa-plus'></i>{` Add ${this.props.schema.label}`}</Button>
            </Link>
          </TableLayout.Header>
          <TableLayout.Body>
              <Table schema={this.props.schema}/>
          </TableLayout.Body>
        </TableLayout>
      </div>
    )
  }
}

export default TableView
