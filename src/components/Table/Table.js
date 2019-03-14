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


// This is the actual table component, which utilizes the BootstrapTable
// component.
// can refer to docs here: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html
class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    // when the component mounts, we make a GET call using the path set in the
    // formSchema.json. Then we set transform the return value
    get(this.props.schema.path)
    .then(res => {
      // this is where we transform the return value.
      // we loop through each value (object) and loop through each key-value pair in the object
      // if the value is an array or object we stringify it since the table component can only take
      // strings/numbers as a value
      // TO BE CHANGE: the array/object are not being formatted nicely since its only getting stringified,
      // needs update on styling
      const tableData = res.data.map((rowData) => {
        console.log('rowData', rowData)
        return Object.keys(rowData).reduce((acc, key) => {
          if (_.isObject(rowData[key]) || _.isArray(rowData[key])) {
            acc[key] = JSON.stringify(rowData[key], null, 2)
          }
          else {
            acc[key] = rowData[key]
          }
          console.log('acc', acc)
          return acc
        }, {})
      })
      this.setState({ rows: tableData })
    })
  }

  render() {
    const schemaProperties = this.props.schema.form.properties

    // we create the columns of the table off the fields in the form object of the schema
    let columns = Object.keys(schemaProperties).map((key) => {
      console.log('stuff',schemaProperties[key])
      return {
        dataField: _.camelCase(key),
        text: schemaProperties[key]['title'],
        sort: true,
        filter: textFilter()
      }
    })

    // this adds the columns of edit buttons to the first column of the table
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
