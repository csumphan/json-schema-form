import React, { Component } from 'react'

import TableLayout from '../layout/TableLayout'
import Table from '../components/Table'
import Button from '../components/Button'

class TableView extends Component {
  render() {
    return (
      <div>
        <TableLayout>
          <TableLayout.Header>
            <TableLayout.Title>{this.props.schema.label}</TableLayout.Title>
            <Button><i class='fas fa-plus'></i>{` Add ${this.props.schema.label}`}</Button>
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
