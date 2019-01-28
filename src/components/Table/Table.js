import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Button from '../Button'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Table.css'

const columns = [
  {
    dataField: 'button',
    formatter: () => (<Button className='btn-sm' style={{ display: 'block', margin: 'auto' }}>Edit</Button>),
    headerStyle: (colum, colIndex) => {
        return { width: '80px', textAlign: 'center' };
    }},
  { dataField: 'id', text: 'ID' },
  { dataField: 'label', text: 'Label' },
  { dataField: 'description', text: 'Description' },
  { dataField: 'description', text: 'Description' },
  { dataField: 'description', text: 'Description' },
 ]

const rows = [{id: 0, label: 'blah', description: 'exampleasdjflakjsdflkajsdklfjalksdjflkajsdflkjaslkdfjlkas djflkasdjflkajsdfklajsdlkfj fads ernrw q'}, {id: 1, label: '345', description: 'example fads ernrw q'},{id: 2, label: 'wreewlkj', description: 'example fads ernrw q'}]
class Table extends Component {
  render() {
    return (
      <BootstrapTable
        keyField='id'
        classes='table-main'
        wrapperClasses='table-responsive'
        columns={columns}
        rowClasses='table-cell'
        headerClasses='bootstrap-table-header'
        data={rows}
        bootstrap4
    />
    )
  }
}

export default Table
