import React, { Components } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

const BootstrapTypeahead = (props) => {
  console.log('pp', props)
  return (
    <Typeahead
      options={props.options.enumOptions}
      placeholder={props.placeholder}
      onChange={(val) => {
        val.length > 0 && props.onChange(val[0].value)
      }}
    />
  )
}

export default BootstrapTypeahead
