const capitalize = (word = '') => word[0].toUpperCase() + word.slice(1)

export default function FormItem({ label, name, inputs, ...props }) {
  return (
    <label htmlFor={name}>
      {label || capitalize(name)}
      <input name={name} type="text" value={inputs[name]} {...props} />
    </label>
  )
}
