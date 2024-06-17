import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const BoxTodo = ({ Id, index, title, category, dueDate, estimate, importance }) => {
  return (
    <Draggable draggableId={String(Id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='box_todo'
        >
          {/* Render your todo item content here */}
          <h3>{title}</h3>
          <p>{category}</p>
          <p>{dueDate}</p>
          <p>{estimate}</p>
          <p>{importance}</p>
        </div>
      )}
    </Draggable>
  );
};

export default BoxTodo;
