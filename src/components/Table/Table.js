import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import { Link } from "react-router-dom"
import _ from "lodash"
import Button from '../Button'
import EmptyState from '../EmptyState'
import { get } from "utils/api"

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Table.css'

const API_DATA = [
    {
        "id": "BO_Floor",
        "description": "A floor is the bottom surface of a room or vehicle",
        "label": "Floor",
        "properties": []
    },
    {
        "id": "BO_Conference_Room",
        "description": "A room provided for singular events such as business conferences and meetings",
        "label": "Conference Room",
        "properties": [
            "Property [property_id=BO_Conference_Room_Occupancy, name=Occupancy]"
        ]
    },
    {
        "id": "BO_Building",
        "description": "a structure with a roof and walls standing more or less permanently in one place, such as a house or factory",
        "label": "Building",
        "properties": []
    },
    {
        "id": "BO_Room",
        "description": "Any distinguishable space within a structure",
        "label": "Room",
        "properties": [
            "Property [property_id=BO_Room_Occupancy, name=Occupancy]"
        ]
    }
]

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
      const tableData = res.data.map((rowData) => {
        return Object.keys(rowData).reduce((acc, key) => {
          if (_.isObject(rowData[key])) {
            acc[key] = rowData[key].id
          }
          else {
            acc[key] = rowData[key]
          }
          return acc
        }, {})
      })
      this.setState({ rows: tableData })
    })
  }

  render() {
    const schemaProperties = this.props.schema.form.properties

    let columns = Object.keys(schemaProperties).map((key) => {
      console.log('stuff',schemaProperties[key])
      return {
        dataField: _.camelCase(key),
        text: schemaProperties[key]['title'],
        sort: true,
        filter: textFilter()
      }
    })

    columns = [
      {
         dataField: 'button',
         formatter: (_, row, rowIndex) => {
          return (
            <Link to={{
              pathname: `${this.props.match.path}/edit/${rowIndex}`,
              formData: row
            }}>
              <Button
              className='btn-sm'
              style={{ display: 'block', margin: 'auto' }}>
              Edit
              </Button>
            </Link>
          )
         },
         headerStyle: (colum, colIndex) => {
             return { width: '80px', textAlign: 'center' };
         }
       },
       ...columns
    ]

    return (
      <BootstrapTable
        keyField='id'
        classes='table-main'
        wrapperClasses='table-wrapper'
        columns={columns}
        rowClasses='table-cell'
        headerClasses='bootstrap-table-header'
        data={this.state.rows}
        filter={filterFactory()}
        noDataIndication={<EmptyState title='Table is Empty' description={`Create a ${this.props.schema.label} and it will show up here.`}/>}
    />
    )
  }
}

export default Table
