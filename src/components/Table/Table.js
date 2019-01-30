import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Button from '../Button'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Table.css'


const rows = [
  {id: 0, label: 'Floor', subTypeOf: 'B0_FlOOR', propertiesInfo: ['x', 'y', 'z']},
  {id: 1, label: 'Conference Room', subTypeOf: 'B0_CONF', propertiesInfo: ['ExampleProp1', 'ExampleProp2', 'ExampleProp3']},
  {id: 2, label: 'Classroom', subTypeOf: 'B0_CLASS', propertiesInfo: ['DUMMYDATA1']},
  {id: 3, label: 'Room', subTypeOf: '', propertiesInfo: ['ExampleProp1', 'ExampleProp2', 'ExampleProp3']},
  {id: 4, label: 'Office', subTypeOf: 'B0_OFFICE', propertiesInfo: ['ExampleProp1', 'ExampleProp2', 'ExampleProp3']},
  {id: 5, label: 'Conference Room', subTypeOf: 'B0_CONF', propertiesInfo: ['ExampleProp1', 'ExampleProp2', 'ExampleProp3']}
]
class Table extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const schemaProperties = this.props.schema.form.properties

    let columns = Object.keys(schemaProperties).map((key) => {
      console.log('stuff',schemaProperties[key])
      return {
        dataField: key,
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
        wrapperClasses='table-responsive'
        columns={columns}
        rowClasses='table-cell'
        headerClasses='bootstrap-table-header'
        data={rows}
    />
    )
  }
}

export default Table
