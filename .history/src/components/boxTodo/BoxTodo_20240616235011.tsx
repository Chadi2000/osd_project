import React, { useEffect, useState } from 'react';
import './boxtodo.css';

const BoxTodo = ({ title, category, dueDate, estimate, importance }) => {
    const [backgroundColor, setBackGroundColor] = useState('');

    const determinceImportance = (Importance) =>{
        if(importance === 'Low'){
            setBackGroundColor('#39AC95')
        }else if(importance === 'Medium'){
            setBackGroundColor('#FE913E')
        }else if( importance === 'High'){
            setBackGroundColor('#DC3545')
        }
    }
    useEffect(() => {
        determinceImportance(importance);
      }, [importance]);
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
            <p style={{backgroundColor: backgroundColor,
    textAlign: 'center',
    borderRadius: '4px',
    display: 'inline-block',
    fontWeight: '300',
    fontSize: '13px',
    lineHeight: '20px',
    height: '30px',
    padding: '0 10px', /* Add padding for better button appearance */
    minWidth: 'auto', /* Allow width to adjust based on content */
    width: 'auto', /* Allow width to adjust based on content */
    maxWidth: '100%', /* Limit width to 100% of parent container */
    boxSizing: 'border-box', /* Include padding and border in total width */
    whiteSpace: 'nowrap', /* Prevent text wrapping */
    overflow: 'hidden', /* Hide overflow text */
    textOverflow: 'ellipsis' 
            }}>{importance}</p>
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
      <p>{answer}</p>
    </div>
  );
}

export default BoxTodo;
