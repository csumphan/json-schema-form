import axios from 'axios'

const HOST = 'http://128.195.53.164:1086'

export const get = async (path) => {

  const result = await axios({
    method: 'get',
    url: `${HOST}${path}`,
    responseType: 'application/json'
  })
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

  return result
}
