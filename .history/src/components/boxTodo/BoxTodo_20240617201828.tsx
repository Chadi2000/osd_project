import React, { useEffect, useState } from 'react';
import './boxtodo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, Avatar, CardContent, Typography, Box, Grid, CardActions, Chip } from '@mui/material';

const BoxTodo = ({ Id, index, title, category, dueDate, estimate, importance }) => {
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
                >
                    <Card sx={{ minWidth: 275, m: "8px 1px" }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "#2C5CC9" }} aria-label="recipe">
                                    {title.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                isEditing ? (
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
                                ) : (
                                    <FontAwesomeIcon
                                        size='1x'
                                        className='edit_icon'
                                        onClick={handleTitleClick}
                                        icon={faEdit}
                                        style={{ color: 'white' }}
                                    />
                                )
                            }
                        />
                        <CardContent sx={{ p: "0 16px" }}>
                            {isEditing ? (
                                <input
                                    className='input_header'
                                    type='text'
                                    value={currentTitle}
                                    onChange={(e) => setCurrentTitle(e.target.value)}
                                    autoFocus
                                />
                            ) : (
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {currentTitle}
                                </Typography>
                            )}
                            <Box sx={{ flexGrow: 1, color: "#333333", m: "20px 0 0" }}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <Typography variant="body2" component="p">Category</Typography>
                                        <Typography variant="body1" component="p">{category}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <Typography variant="body2" component="p">Due Date</Typography>
                                        <Typography variant="body1" component="p">{dueDate}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <Typography variant="body2" component="p">Estimate</Typography>
                                        <Typography variant="body1" component="p">{estimate}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Chip
                                label={`Importance: ${importance}`}
                                sx={{
                                    m: 1,
                                    minWidth: "70px",
                                    maxHeight: "25px",
                                    background: backgroundColor,
                                    color: "#FFF",
                                }}
                                variant="outlined"
                            />
                        </CardActions>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default BoxTodo;
