/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'

const capitalize = (word = '') => word[0].toUpperCase() + word.slice(1)

export default function FormItem({ label, name, inputs, ...props }) {
  return (
    <label htmlFor={name}>
      {label || capitalize(name)}
      <input name={name} type="text" value={inputs[name]} {...props} />
    </label>
  )
}

FormItem.propTypes = {
  inputs: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
