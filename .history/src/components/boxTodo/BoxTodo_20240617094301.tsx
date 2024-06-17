import React, { useEffect, useState } from 'react';
import './boxtodo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons';

const BoxTodo = ({ title, category, dueDate, estimate, importance }) => {
    const [backgroundColor, setBackGroundColor] = useState('');
    const [currentTitle, setCurrentTitle] = useState(title);
    const [initialTitle, setInitialTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    const determineImportance = (importance) => {
        if (importance === 'Low') {
            setBackGroundColor('#39AC95');
        } else if (importance === 'Medium') {
            setBackGroundColor('#FE913E');
        } else if (importance === 'High') {
            setBackGroundColor('#DC3545');
        }
    };

    const handleTitleClick = () => {
        setIsEditing(true);
        setInitialTitle(currentTitle); // Save initial title when editing starts
    };

    const handleCancelEdit = () => {
        setCurrentTitle(initialTitle); // Restore initial title
        setIsEditing(false); // Exit edit mode
    };

    const handleConfirmEdit = () => {
        // Here you could perform any actions like saving to backend, updating state, etc.
        setIsEditing(false); // Exit edit mode
    };

    useEffect(() => {
        determineImportance(importance);
    }, [importance]);

    return (
        <div className='boxTodo_container'>
            <div className='boxTodo_content'>
                {isEditing ? (
                    <div>
                        <input
                            className='input_header'
                            type='text'
                            value={currentTitle}
                            onChange={(e) => setCurrentTitle(e.target.value)}
                            autoFocus
                        />
                        <div style={{ display: 'flex', gap: '6px', position: 'absolute' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <FontAwesomeIcon
                                    onClick={handleCancelEdit}
                                    size='1x'
                                    icon={faXmark}
                                    style={{ color: 'white' }}
                                />
                                <FontAwesomeIcon
                                    onClick={handleConfirmEdit}
                                    size='1x'
                                    icon={faCheck}
                                    style={{ color: 'white' }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4 className='boxTodo_header'>{currentTitle}</h4>
                        <FontAwesomeIcon
                            size='1x'
                            className='edit_icon'
                            onClick={handleTitleClick}
                            icon={faEdit}
                            style={{ color: 'white' }}
                        />
                    </div>
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
