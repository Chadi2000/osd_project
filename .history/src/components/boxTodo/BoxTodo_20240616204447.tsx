import React from 'react'
import './boxtodo.css'

const BoxTodo = ({title,category,dueDate,estimate,importance}) => {
  return (
    <div className='boxTodo_container'>
      <div style={{padding:'15px 14px'}}>
        <div className='title'>
            <h4  style={{margin:'0px'}}>{title}</h4>
        </div>
        <div style={{position:'absolute',top:'59px',display:'flex', flexDirection:'column'}}>
            <RowTodo label='category' answer={category} />
            <RowTodo label='Due Date' answer={dueDate} />
            <RowTodo label='Estimate' answer={estimate} />
            <div>
                <label htmlFor="">Importance</label>
                <button style={{color:'#DC3545'}}>{importance}</button>
            </div>
        </div>
      </div>
    </div>
  )
}

const RowTodo = ({label,answer}) =>{

    return(
        <div style={{display:'flex', width:'100%', alignItems:'center'}}>
        <label htmlFor="">{label}</label>
        <h4>{answer}</h4>
      </div>
    );
}

export default BoxTodo
