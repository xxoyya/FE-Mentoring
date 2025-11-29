
const PFAInputNumber = ({placeholder, value, onChange}) => {
  return (
    <div className='input-group'>
      <div className="input-addon">$</div>
      <input
        type='number'
        placeholder={placeholder}
        value={value}
        step="0.01"
        onChange={onChange}
      />
    </div>
  )
}

export default PFAInputNumber