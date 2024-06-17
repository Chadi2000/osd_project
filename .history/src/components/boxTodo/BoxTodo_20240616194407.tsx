import React from 'react'
import './BoxTodo.css'

const BoxTodo = ({title,category,dueDate,estimate,importance}) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <label htmlFor="">category</label>
        <h4>{category}</h4>
      </div>
    </div>
  )
}

const RowTodo = ({label,answer}) =>{

    return(
        <div>
        <label htmlFor="">{label}</label>
        <h4>{answer}</h4>
      </div>
    );
}

export default BoxTodo
