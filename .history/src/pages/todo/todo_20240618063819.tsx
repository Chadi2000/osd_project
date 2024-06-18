import React, { useEffect, useState } from 'react';
import './todo.css';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TodoIcon, DoingIcon, DoneIcon,Add,Logo1,Search,Circle,Bitmap,RemoveQuote, ShowQuote, IconIonic } from '../../assets';
import axios from 'axios';
import InputField from '../../components/InputField/InputField.tsx';
import HeaderTodo from '../../components/headerTodo/HeaderTodo.tsx';
import BoxTodo from '../../components/boxTodo/BoxTodo.tsx';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';


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
  useEffect(() => {
    fetch(`https://localhost:44387/api/Test/GetTodosByEmail?email=${email}`)
        .then(response => response.json())
        .then(data => setTodos(data));
  }, [email]);

  const filteredTodos = todos.filter(todo =>
    todo.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDataByStatus = (status) => {
    return filteredTodos
      .sort((a, b) => b.Id - a.Id)
      .filter(todo => todo.Status === status)
      .map((todo,index) => (
        <BoxTodo
          key={index}
          Id={todo.Id}
          title={todo.Title}
          category={todo.Category}
          dueDate={todo.DueDate.slice(0, 10)}
          estimate={todo.Estimate}
          importance={todo.Importance}
        />
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


  const handleSave = () => {
    const data = {
      Title: title,
      Category: category,
      DueDate: dueDate,
      Estimate: `${estimatedValue} ${estimatedUnit}`,
      Importance: importance,
      Email:email
    };
    const url = 'https://localhost:44387/api/Test/TodoInsert';
    axios.post(url,data).then((result) =>{
        console.log(JSON.stringify(result));
        const newTodo: Todo = {
          Id: result.data.Id,
          Title: title,
          Category: category,
          DueDate: dueDate,
          Estimate: `${estimatedValue} ${estimatedUnit}`,
          Importance: importance,
          Email: data.Email,
          Status: 'Todo'
        }
        setTodos((prevTodos)=>[...prevTodos, newTodo]);
        console.log('new todos:' + JSON.stringify(todos))
        setTitle('');
        setCategory('')
        setDueDate('');
        setEstimatedValue(0);
        setEstimatedUnit('Minute');
        setImportance('Low');
    }).catch((error)=>{
        alert(error);
    })


}

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

  return (
    
    <div className='app__todo'>
      <div className='app__todo-header'>
        <img src={Logo1} alt="logo" className='img_logo' />
        <div className='search_container' onMouseEnter={()=>setIsInputVisible(true)} onMouseLeave={()=>setIsInputVisible(false)}>
          <img src={Search} alt="search" className='img_search' />
          {isInputVisible && (
          <input
            type="text"
            className="search_input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What are  you looking for?"
          />
        )}
        </div>
        <img src={Circle} alt="circle" className='img_circle' onClick={handleAddItem} />
        <img src={Add} alt="add" className='img_add' onClick={handleAddItem}/>
        <img src={Bitmap} alt="bitMap" className='img_bitmap' onClick={handleLogoutClick} />

      </div>

      <div className='app__todo-user_dropdown' style={{display: openDropDown? 'flex' :'none'}}>
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

      <div className='app_todo-todo-list-header' style={{display: isQuoteVisible ? 'flex' : 'none'}}>
        <h2 className='quote'>"Anything that can go wrong, will go wrong!"</h2>
        <img src={RemoveQuote} alt="remove" className='remove_quote' onClick={toggleQuoteVisibility} />
      </div>


      <div className='add_item-container' style={{display: addItem? 'flex' : 'none',justifyContent:'flex-start',
         flexDirection:'column',alignItems:'flex-start', position:'absolute', top: '68px',right: '118px'}}>
          <div className='add_item-title'>Add New Item</div>
          <InputField label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
          <InputField label="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
          <InputField label="Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}  />
          <div className='add_item-row'>
            <label className='item-label'>estimate</label>
            <div className='input_title'>
            <input style={{width:'40px'}} type='number' min={0} className='input_title' placeholder='Enter estimate' value={estimatedValue} onChange={handleValueChange} /><br></br>
              <select value={estimatedUnit} onChange={handleUnitChange} className='input_title' id="">
                  <option value="minute">Minute</option>
                  <option value="hour">Hour</option>
                  <option value="day">Day</option>
              </select>
            </div>
          </div>
          <div className='add_item-row'>
            <label className='item-label'>importance</label>
            <select value={importance} onChange={(e)=> {
              const selectedValue = e.target.value;
              setImportance(selectedValue === '' ? 'Low' : selectedValue);
            }} className='input_title' id="">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
          </div>
          <button className='save_button' onClick={() => handleSave()}>Save</button>
        </div>

      <div className='background'>

        <div>
          <div style={{display:'flex'}}>
            <div style={{position:'absolute', top: isQuoteVisible? '168px':'100px', left:'34px'}}>
              <HeaderTodo imgSrc={TodoIcon} imgHeight='22px' imgWidth='23px'
                status='To Do'  />
             </div>

              <div style={{border:'1px solid red',position:'absolute',left:'34px', top: isQuoteVisible? '226px' : '158px', display:'flex', flexDirection:'column', gap:'20px'}}>
              {getDataByStatus('Todo')}

              </div>
            </div>

          <div>
            <div style={{position:'absolute', top: isQuoteVisible? '168px':'100px', left:'485px'}}>
              <HeaderTodo imgSrc={DoingIcon} imgHeight='25px' imgWidth='29px'
                status='Doing'  />
             </div>
             <div style={{border:'1px solid red', position:'absolute',left:'487px', top: isQuoteVisible? '226px' : '158px', display:'flex', flexDirection:'column', gap:'20px'}}>
              {getDataByStatus('Doing')}

              </div>
          </div>
          <div>
            <div style={{position:'absolute', top: isQuoteVisible? '168px':'100px', left:'937px'}}>
              <HeaderTodo imgSrc={DoneIcon} imgHeight='26px' imgWidth='29px'
                status='Done'  />
             </div>
             <div style={{border:'1px solid red', position:'absolute',left:'939px', top: isQuoteVisible? '226px' : '158px', display:'flex', flexDirection:'column', gap:'20px'}}>
              {getDataByStatus('Done')}

              </div>
          </div>

        </div>

        <div style={{display: isQuoteVisible ? 'none' : 'flex'}} >
          <img src={ShowQuote} alt="show quote" className='show_quote'  onClick={toggleQuoteVisibility} />
        </div>


      </div>

    </div>
  );
};


export default Todo;
