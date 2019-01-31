import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";

import uiSchema from './uiSchema.json'
import './Form.css'

// 1. check schema for TIPPER specific types
// 2. update all invalid types to valid ones through api call

const updateSchemaToTipper = (schema) => {

}

class JSONForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schema: null
    }
  }
  componentDidMount() {
    // axios({
    //   method: 'get',
    //   url: `${HOST}/spacetype`,
    //   responseType: 'application/json'
    // })
    // .then((res) => {
    //   const newSchema = { ...this.props.schema }
    //
    //   for (let key in newSchema.properties) {
    //     if (newSchema.properties[key].type === 'space_types') {
    //       newSchema.properties[key] = {
    //         ...newSchema.properties[key],
    //         type: 'string',
    //         enum: res.data.map(val => val.id)
    //       }
    //     }
    //   }
    //   this.setState({schema: newSchema})
    // })
    // .catch((err) => {
    //   this.setState( {schema: { ...this.props.schema } })
    // })
    this.setState( {schema: { ...this.props.schema } })
  }
  render() {
    const { onChange, onSubmit, onError } = this.props
    return (
      <div>
        {
          !this.state.schema
          ?
          null
          :
          <Form
            className='form'
            schema={this.state.schema}
            uiSchema={uiSchema}
            onChange={onChange}
            onSubmit={onSubmit}
            onError={onError}
          />
        }
      </div>
    )
  }
}


export default JSONForm
