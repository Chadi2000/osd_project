import React, { useCallback, useEffect, useState } from 'react';
import './todo.css';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TodoIcon, DoingIcon, DoneIcon,Add,Logo1,Search,Circle,Bitmap,RemoveQuote, ShowQuote, IconIonic } from '../../assets';
import axios from 'axios';
import InputField from '../../components/InputField/InputField.tsx';
import HeaderTodo from '../../components/headerTodo/HeaderTodo.tsx';
import BoxTodo from '../../components/boxTodo/BoxTodo.tsx';
import {toast, Toaster} from 'react-hot-toast'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const Todo = () => {
  const email = localStorage.getItem('email');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [estimatedUnit, setEstimatedUnit] = useState('Minute');
  const[importance, setImportance] = useState('Low');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  interface Todo {
    Id: number;
    Title: string;
    Status: string;
    Category: string;
    DueDate: string;
    Estimate: string;
    Importance: string;
    Email: string | null;
  }

  const [todos, setTodos] = useState<Todo[]>([]);

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

  const getDataByStatus = (status, isDragging) => {
    return filteredTodos
      .sort((a, b) => b.Id - a.Id)
      .filter(todo => todo.Status === status)
      .map((todo, index) => (
        isDragging ? (
          <SortableItem
            key={`${todo.Id}-${index}`}
            id={todo.Id}
            todo={todo}
          />
        ) : (
          <BoxTodo
            key={`${todo.Id}-${index}`}
            Id={todo.Id}
            title={todo.Title}
            category={todo.Category}
            dueDate={todo.DueDate.slice(0, 10)}
            estimate={todo.Estimate}
            importance={todo.Importance}
          />
        )
      ));
  };
  
  const handleValueChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setEstimatedValue(value);
    }
  };
  const handleDragging = () =>{
    setIsDragging(!isDragging);
  }
  const handleUnitChange = (e) => {
    setEstimatedUnit(e.target.value);
  };

  const validateForm = () =>{
    if(!title || !category || !dueDate ){
      toast.error('Missing required Fields')
      return false
    }
    return true;
  }


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
      console.log('new todos:', JSON.stringify([newTodo, ...todos]));
      getDataByStatus('Todo',isDragging);
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
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [addItem, setAddItem] = useState(false);

  const toggleQuoteVisibility = () => {
    setIsQuoteVisible(!isQuoteVisible);
  };
  const handleLogoutClick = () =>{
    setOpenDropDown(!openDropDown);
    setAddItem(false);
  }
  const handleAddItem = () =>{
    setAddItem(!addItem);
    setOpenDropDown(false);
  }

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex(todo => todo.Id === active.id);
        const newIndex = prevTodos.findIndex(todo => todo.Id === over.id);
        const updatedTodos = arrayMove(prevTodos, oldIndex, newIndex);
  
        const updatedTodo = updatedTodos.find(todo => todo.Id === active.id);
        if (updatedTodo) {
          updatedTodo.Status = findStatus(updatedTodo.Id);
        }
        console.log('updated todo: '+JSON.stringify(updatedTodo));

        const updateStatus = async () => {
          const url = `https://localhost:44387/api/Test/UpdateTodoStatus?Id=${updatedTodo?.Id}&Status=${updatedTodo?.Status}`;
          try {
            const result = await axios.put(url);
            console.log(result.data);
          } catch (error) {
            console.error('Error updating status:', error);
          }
        };
  
        updateStatus();

  
        return updatedTodos;
      });
    }
  };
  
  const findStatus = (id) => {
    const todo = todos.find(todo => todo.Id === id);
    if (todo) {
      switch (todo.Status) {
        case 'Todo':
          return 'Doing';
        case 'Doing':
          return 'Done';
        case 'Done':
          return 'Todo';
        default:
          return todo.Status;
      }
    }
    return 'Todo';
  };
  

  return (
    
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
            <div className='logout_container' onClick={handleLogout}>
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
      <div className='add_item-container' style={{
        display: addItem ? 'flex' : 'none', justifyContent: 'flex-start',
        flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', top: '68px', right: '118px'
      }}>
        <div className='add_item-title'>Add New Item</div>
        <InputField label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        <InputField label="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
        <InputField label="Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <div className='add_item-row'>
          <label className='item-label'>estimate</label>
          <div className='input_title'>
            <input style={{ width: '40px' }} type='number' min={0} className='input_title' placeholder='Enter estimate' value={estimatedValue} onChange={handleValueChange} /><br />
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
        <button className='save_button' onClick={() => handleSave()}>Save</button>
        <Toaster />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map(todo => todo.Id)}>
          <div className='background'>
            <div style={{position:'absolute',left:'1600px',top:'100px'}}>
              <button onClick={handleDragging}>
                {isDragging? 'Stop Dragging' : 'Start Dragging'}
              </button>
            </div>
            <div>
              <div style={{ display: 'flex' }}>
                <div style={{ position: 'absolute', top: isQuoteVisible ? '168px' : '100px', left: '34px' }}>
                  <HeaderTodo imgSrc={TodoIcon} imgHeight='22px' imgWidth='23px'
                    status='To Do' />
                </div>
                <div style={{ border: '2px solid' ,borderRadius:'10px', height:'1000px',position: 'absolute', left: '34px', top: isQuoteVisible ? '226px' : '158px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {getDataByStatus('Todo',isDragging)}
                </div>
              </div>
              <div>
                <div style={{ position: 'absolute', top: isQuoteVisible ? '168px' : '100px', left: '485px' }}>
                  <HeaderTodo imgSrc={DoingIcon} imgHeight='25px' imgWidth='29px'
                    status='Doing' />
                </div>
                <div style={{ border: '2px solid', borderRadius:'10px',height:'1000px', width:'418px', position: 'absolute', left: '487px', top: isQuoteVisible ? '226px' : '158px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {getDataByStatus('Doing',isDragging)}
                </div>
              </div>
              <div>
                <div style={{ position: 'absolute', top: isQuoteVisible ? '168px' : '100px', left: '937px' }}>
                  <HeaderTodo imgSrc={DoneIcon} imgHeight='26px' imgWidth='29px'
                    status='Done' />
                </div>
                <div style={{ border: '2px solid', borderRadius:'10px',height:'1000px', position: 'absolute', left: '939px', top: isQuoteVisible ? '226px' : '158px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {getDataByStatus('Done',isDragging)}
                </div>
              </div>
            </div>
            <div style={{ display: isQuoteVisible ? 'none' : 'flex' }} >
              <img src={ShowQuote} alt="show quote" className='show_quote' onClick={toggleQuoteVisibility} />
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Todo;

const SortableItem = ({ id, todo }) => {
  const { attributes, listeners, setNodeRef, transform, transition,isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging?0.5 :1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BoxTodo
        Id={todo.Id}
        title={todo.Title}
        category={todo.Category}
        dueDate={todo.DueDate.slice(0, 10)}
        estimate={todo.Estimate}
        importance={todo.Importance}
      />
    </div>
  );
};