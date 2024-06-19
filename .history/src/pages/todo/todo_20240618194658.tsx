import React, { useCallback, useEffect, useState } from 'react';
import './todo.css';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TodoIcon, DoingIcon, DoneIcon, Add, Logo1, Search, Circle, Bitmap, RemoveQuote, ShowQuote, IconIonic } from '../../assets';
import axios from 'axios';
import InputField from '../../components/InputField/InputField.tsx';
import HeaderTodo from '../../components/headerTodo/HeaderTodo.tsx';
import BoxTodo from '../../components/boxTodo/BoxTodo.tsx';
import { toast, Toaster } from 'react-hot-toast';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Todo = () => {
  const email = localStorage.getItem('email');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [estimatedUnit, setEstimatedUnit] = useState('Minute');
  const [importance, setImportance] = useState('Low');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const [todos, setTodos] = useState([]);
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [addItem, setAddItem] = useState(false);

  const fetchTodos = useCallback(() => {
    fetch(`https://localhost:44387/api/Test/GetTodosByEmail?email=${email}`)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, [email]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = todos.filter(todo =>
    todo.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDataByStatus = (status) => {
    return filteredTodos
      .sort((a, b) => b.Id - a.Id)
      .filter(todo => todo.Status === status)
      .map((todo, index) => (
        <Draggable key={todo.Id} draggableId={todo.Id.toString()} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <BoxTodo
                index={index}
                Id={todo.Id}
                title={todo.Title}
                category={todo.Category}
                dueDate={todo.DueDate.slice(0, 10)}
                estimate={todo.Estimate}
                importance={todo.Importance}
              />
            </div>
          )}
        </Draggable>
      ));
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setEstimatedValue(value);
    }
  };

  const handleUnitChange = (e) => {
    setEstimatedUnit(e.target.value);
  };

  const validateForm = () => {
    if (!title || !category || !dueDate) {
      toast.error('Missing required Fields');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const data = {
      Title: title,
      Category: category,
      DueDate: dueDate,
      Estimate: `${estimatedValue} ${estimatedUnit}`,
      Importance: importance,
      Email: email
    };

    const url = 'https://localhost:44387/api/Test/TodoInsert';

    axios.post(url, data).then((result) => {
      toast.success(result.data);

      const newTodo = {
        Id: result.data.Id,
        Title: title,
        Category: category,
        DueDate: dueDate,
        Estimate: `${estimatedValue} ${estimatedUnit}`,
        Importance: importance,
        Email: data.Email,
        Status: 'Todo'
      };

      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      fetchTodos();
      setTitle('');
      setCategory('');
      setDueDate('');
      setEstimatedValue(0);
      setEstimatedUnit('Minute');
      setImportance('Low');
    }).catch((error) => {
      toast.error(error.message || 'An error occurred');
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleQuoteVisibility = () => {
    setIsQuoteVisible(!isQuoteVisible);
  };

  const handleLogoutClick = () => {
    setOpenDropDown(!openDropDown);
    setAddItem(false);
  };

  const handleAddItem = () => {
    setAddItem(!addItem);
    setOpenDropDown(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(todos.filter(todo => todo.Status === source.droppableId));
    const destinationList = Array.from(todos.filter(todo => todo.Status === destination.droppableId));

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    const updatedTodos = todos.map(todo => {
      if (todo.Id === movedItem.Id) {
        return { ...todo, Status: destination.droppableId };
      }
      return todo;
    });

    setTodos(updatedTodos);

    axios.put(`https://localhost:44387/api/Test/UpdateTodoStatus?Id=${movedItem.Id}&Status=${destination.droppableId}`)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error updating todo status:', error));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app__todo'>
        <div className='app__todo-header'>
          <img src={Logo1} alt="logo" className='img_logo' />
          <div className='search_container' onMouseEnter={() => setIsInputVisible(true)} onMouseLeave={() => setIsInputVisible(false)}>
            <img src={Search} alt="search" className='img_search' />
            {isInputVisible && (
              <input
                type="text"
                className="search_input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What are you looking for?"
              />
            )}
          </div>
          <img src={Circle} alt="circle" className='img_circle' onClick={handleAddItem} />
          <img src={Add} alt="add" className='img_add' onClick={handleAddItem} />
          <img src={Bitmap} alt="bitMap" className='img_bitmap' onClick={handleLogoutClick} />
        </div>

        <div className='app__todo-user_dropdown' style={{ display: openDropDown ? 'flex' : 'none' }}>
          <div className='najo'>
            <img src={Bitmap} alt="bitmap" className='dropdown_bitmap' />
            <div>
              <h4 className='dropdown_email'>{email}</h4>
              <div className='logout_container' onClick={handleLogout} >
                <p className='logout_container-text'>Log Out</p>
                <img src={IconIonic} alt="ionic" className='logout_container-img' />
              </div>
            </div>
          </div>
        </div>

        <div className='app_todo-todo-list-header' style={{ display: isQuoteVisible ? 'flex' : 'none' }}>
          <h2 className='quote'>"Anything that can go wrong, will go wrong!"</h2>
          <img src={RemoveQuote} alt="remove" className='remove_quote' onClick={toggleQuoteVisibility} />
        </div>

        <div className='add_item-container' style={{ display: addItem ? 'flex' : 'none', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', top: '68px', right: '118px' }}>
          <div className='add_item-title'>Add New Item</div>
          <InputField label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
          <InputField label="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
          <InputField label="Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <div className='add_item-row'>
            <label className='item-label'>estimate</label>
            <div className='input_title'>
              <input style={{ width: '40px' }} type='number' min={0} className='input_title' placeholder='Enter estimate' value={estimatedValue} onChange={handleValueChange} /><br></br>
              <select value={estimatedUnit} onChange={handleUnitChange} className='input_title' id="">
                <option value="minute">Minute</option>
                <option value="hour">Hour</option>
                <option value="day">Day</option>
              </select>
            </div>
          </div>
          <div className='add_item-row'>
            <label className='item-label'>importance</label>
            <select value={importance} onChange={(e) => {
              const selectedValue = e.target.value;
              setImportance(selectedValue === '' ? 'Low' : selectedValue);
            }} className='input_title' id="">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button className='save_button' onClick={handleSave}>Save</button>
          <Toaster />
        </div>

        <div className='background'>
          <div>
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'absolute', top: isQuoteVisible ? '168px' : '100px', left: '34px' }}>
                <HeaderTodo imgSrc={TodoIcon} imgHeight='22px' imgWidth='23px' status='To Do' />
              </div>
              <Droppable droppableId="Todo">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ border: '1px solid red', position: 'absolute', left: '34px', top: isQuoteVisible ? '226px' : '158px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {getDataByStatus('Todo')}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div>
              <div style={{ position: 'absolute', top: isQuoteVisible ? '168px' : '100px', left: '485px' }}>
                <HeaderTodo imgSrc={DoingIcon} imgHeight='25px' imgWidth='29px' status='Doing' />
              </div>
              <Droppable droppableId="Doing">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ border: '1px solid red', position: 'absolute', left: '487px', top: isQuoteVisible ? '226px' : '158px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {getDataByStatus('Doing')}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div>
              <div style={{ position: 'absolute', top: isQuoteVisible ? '168px' : '100px', left: '937px' }}>
                <HeaderTodo imgSrc={DoneIcon} imgHeight='26px' imgWidth='29px' status='Done' />
              </div>
              <Droppable droppableId="Done">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ border: '1px solid red', position: 'absolute', left: '939px', top: isQuoteVisible ? '226px' : '158px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {getDataByStatus('Done')}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          <div style={{ display: isQuoteVisible ? 'none' : 'flex' }}>
            <img src={ShowQuote} alt="show quote" className='show_quote' onClick={toggleQuoteVisibility} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Todo;
