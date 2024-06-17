import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder, options, selectValue, selectOnChange }) => {
  return (
    <div className='add_item-row'>
      <label className='item-label'>{label}</label>
      {type === 'select' ? (
        <select value={value} onChange={onChange} className='input_title'>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} className='input_title' placeholder={placeholder} />
      )}
    </div>
  );
};

export default InputField;
