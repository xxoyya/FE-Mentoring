import React from 'react'

const PFAInputText = (props) => {
  return (
    <input
      value={props.value}
      onChange={props.onChange}
      type="text"
      placeholder={props.placeholder}
      id={props.id}
    />
  );
}

export default PFAInputText