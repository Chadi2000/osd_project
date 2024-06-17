import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder=''}) => {
  return (
    <div className='add_item-row'>
      <label className='item-label'>{label}</label>
      <input type={type} value={value} onChange={onChange} className='input_title' placeholder={placeholder} />
    </div>
  );
};

export default InputField;
