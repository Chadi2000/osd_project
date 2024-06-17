import React from 'react';
import './boxtodo.css';

const BoxTodo = ({ title, category, dueDate, estimate, importance }) => {
  return (
    <div className='boxTodo_container'>
      <div className='boxTodo_content'>
          <h4 className='boxTodo_header'>{title}</h4>
        <div className='boxTodo_body'>
          <RowTodo label='Category' answer={category} />
          <RowTodo label='Due Date' answer={dueDate} />
          <RowTodo label='Estimate' answer={estimate} />
          <div className='rowTodo'>
            <label>Importance</label>
            <button className='importance_button'>{importance}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const RowTodo = ({ label, answer }) => {
  return (
    <div className='rowTodo'>
      <label>{label}</label>
      <h4>{answer}</h4>
    </div>
  );
}

export default BoxTodo;
