import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import './boxtodo.css';

const BoxTodo = ({ title, category, dueDate, estimate, importance }) => {
    const [backgroundColor, setBackGroundColor] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);

    const determineImportance = (importance) => {
        if (importance === 'Low') {
            setBackGroundColor('#39AC95');
        } else if (importance === 'Medium') {
            setBackGroundColor('#FE913E');
        } else if (importance === 'High') {
            setBackGroundColor('#DC3545');
        }
    };

    useEffect(() => {
        determineImportance(importance);
    }, [importance]);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setCurrentTitle(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        // Perform any necessary actions, such as saving the new title
    };

    return (
        <div className='boxTodo_container'>
            <div className='boxTodo_content'>
                {isEditing ? (
                    <div>
                        <input
                            className='input_header'
                            type='text'
                            value={currentTitle}
                            onChange={handleTitleChange}
                            onBlur={handleBlur}
                            autoFocus // Ensures the input is focused when it appears
                        />
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                ) : (
                    <h4 className='boxTodo_header' onDoubleClick={handleTitleClick}>{currentTitle}</h4>
                )}
                <div className='boxTodo_body'>
                    <RowTodo label='Category' answer={category} />
                    <RowTodo label='Due Date' answer={dueDate} />
                    <RowTodo label='Estimate' answer={estimate} />
                    <div className='rowTodo'>
                        <label>Importance</label>
                        <p className='button' style={{ backgroundColor: backgroundColor }}>
                            {importance}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RowTodo = ({ label, answer }) => {
    return (
        <div className='rowTodo'>
            <label>{label}</label>
            <p>{answer}</p>
        </div>
    );
};

export default BoxTodo;
