import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Button from '../Button'
import EmptyState from '../EmptyState'
import { get } from "utils/api"

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Table.css'

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    get(this.props.schema.path)
    .then(res => {
      console.log('res', res.data)
      this.setState({ rows: res.data })
    })
  }

  render() {
    const schemaProperties = this.props.schema.form.properties

    let columns = Object.keys(schemaProperties).map((key) => {
      console.log('stuff',schemaProperties[key])
      return {
        dataField: key.toLowerCase(),
        text: schemaProperties[key]['title']
      }
    })

    columns = [
      {
         dataField: 'button',
         formatter: () => (<Button className='btn-sm' style={{ display: 'block', margin: 'auto' }}>Edit</Button>),
         headerStyle: (colum, colIndex) => {
             return { width: '80px', textAlign: 'center' };
         }
       },
       ...columns
    ]
    // const columns = [
    //   {
    //     dataField: 'button',
    //     formatter: () => (<Button className='btn-sm' style={{ display: 'block', margin: 'auto' }}>Edit</Button>),
    //     headerStyle: (colum, colIndex) => {
    //         return { width: '80px', textAlign: 'center' };
    //     }},
    //   { dataField: 'id', text: 'ID' },
    //   { dataField: 'label', text: 'Label' },
    //   { dataField: 'subTypeOf', text: 'Subtype Of' },
    //   {
    //     dataField: 'propertiesInfo',
    //     text: 'Properties',
    //     formatter: (cell) => (
    //       <ul>
    //         {cell && cell.map((val) => (
    //           <li>{val}</li>
    //         ))}
    //       </ul>
    //     )
    //   },
    //  ]

    return (
      <BootstrapTable
        keyField='id'
        classes='table-main'
        wrapperClasses='table-wrapper'
        columns={columns}
        rowClasses='table-cell'
        headerClasses='bootstrap-table-header'
        data={this.state.rows}
        noDataIndication={<EmptyState title='Empty Table' description={`Create a ${this.props.schema.label} and it will show up here.`}/>}
    />
    )
  }
}

export default Table
