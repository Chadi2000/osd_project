import React, { useEffect, useState } from 'react';
import './boxtodo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Draggable } from 'react-beautiful-dnd'; // Import Draggable from react-beautiful-dnd

const BoxTodo = ({ Id, title, category, dueDate, estimate, importance, index }) => {
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
        setInitialTitle(currentTitle);
        console.log(Id);
    };

    const handleCancelEdit = () => {
        setCurrentTitle(initialTitle);
        setIsEditing(false);
    };

    const handleConfirmEdit = () => {
        const url = `https://localhost:44387/api/Test/UpdateTodoTitle?Id=${Id}&Title=${encodeURIComponent(currentTitle)}`;

        axios.put(url)
            .then((result) => {
                alert(result.data);
                setIsEditing(false);
            })
            .catch((error) => {
                alert(error.message);
            });
        setIsEditing(false);
    };

    useEffect(() => {
        determineImportance(importance);
    }, [importance]);

    return (
        <Draggable draggableId={String(Id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='boxTodo_container'
                >
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
                                    <div className='icons' style={{ display: 'flex', gap: '5px' }}>
                                        <FontAwesomeIcon
                                            onClick={handleCancelEdit}
                                            size='1x'
                                            icon={faXmark}
                                            style={{ color: 'white', cursor: 'pointer' }}
                                        />
                                        <FontAwesomeIcon
                                            onClick={handleConfirmEdit}
                                            size='1x'
                                            icon={faCheck}
                                            style={{ color: 'white', cursor: 'pointer' }}
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
            )}
        </Draggable>
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
