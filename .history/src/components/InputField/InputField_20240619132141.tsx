import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder=''}) => {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className='add_item-row'>
      <label className='item-label'>{label}</label>
      <input required type={type} value={value} onChange={onChange} className='input_title' placeholder={placeholder} 
      min={type==='date' ? today :undefined}
      />
    </div>
  );
};

export default InputField;
