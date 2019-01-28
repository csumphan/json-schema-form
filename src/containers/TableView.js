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
            <TableLayout.Title>Space Types</TableLayout.Title>
            <Button><i class='fas fa-plus'></i> Add Space Type</Button>
          </TableLayout.Header>
          <TableLayout.Body>
            <div className='table-responsive'>
              <Table />
            </div>
          </TableLayout.Body>
        </TableLayout>
      </div>
    )
  }
}

export default TableView
