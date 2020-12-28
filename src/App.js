import {useState, setState} from 'react';
import darkIcon from "./images/icon-moon.svg";
import lightIcon from "./images/icon-sun.svg";
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import './App.css';

const FilterStates = ['All', 'Active', 'Completed'];

const App = () => {
  const sampleItems = require('./todoitems.json');
  const [theme, setTheme] = useState('light');
  const [todo_title, setTodoTitle] = useState('');
  const [filter, setFilter] = useState(FilterStates[0]);
  const [toDoItems, setToDoItems] = useState(sampleItems.items);  

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const filterdItems = () => {
    if (filter === "All") {
      return toDoItems;
    } else if (filter === "Active") {
      return toDoItems.filter((item) => !item.isCompleted)
    } else {
      return toDoItems.filter((item) => item.isCompleted)
    }
  }

  const handleTodoTitle = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleKeydown = (event) => {
    if (event.keyCode==13) {
      let maxid = 0;
      toDoItems.map((item)=>{
        maxid = maxid>item.id ? maxid:item.id
      })
      
      toDoItems.push({id: maxid+1, title: todo_title, isCompleted: false});
      setToDoItems([...toDoItems])
      setTodoTitle('');
    }

  };

  const deleteItem = (id) => setToDoItems(toDoItems.filter((item) => item.id !== id));
  
  const toggleStatus = (id) => {
    toDoItems.filter(item=>item.id==id).map(item=>item.isCompleted=!item.isCompleted)
    setToDoItems([...toDoItems]);
    setTodoTitle('');
  }
  const removeCompleted= () => {
    setToDoItems(toDoItems.filter(item=>item.isCompleted===false))
  }

  const itemRenderer= (item, index) => {
    return (
      <div className="todo-item" key={`todo-item-rldd-${index}`}>
        <div className="todo-description">
          <div 
            className ={`todo-status ${item.isCompleted ? "" : "incompleted"}`}
            onClick={() => toggleStatus(item.id)}  
          >
            {item.isCompleted &&
              <img
                src={`./images/icon-check.svg`}
              />
            }
          </div>
         
          <div className={`title ${item.isCompleted ? 'text-through' : ''}`}>{item.title}</div>
        </div>
        <div
          // alt=""
          className="cross"
          onClick={() => deleteItem(item.id)}
        >
          <img
            src={`./images/icon-cross.svg`}
          />
        </div>
      </div>
    );
  }
  const handleRLDDChange = (reorderedItems) => {
    // console.log(reorderedItems);
    // setState({ toDoItems: reorderedItems });
    setToDoItems(reorderedItems);
    
  }

  return (
    <div className={theme}>
      <div className={`header-img ${theme === "dark" ? 'dark-header':''}`}/>
      <div className="full-bg"/>
      
        <div className="main-wrapper">
            <div className="header">
                <h1>
                    TODO
                </h1>
                <img 
                  className="toggle-theme" 
                  src={theme === 'light'? lightIcon : darkIcon} 
                  onClick={toggleTheme}
                />
            </div>
            <div className="insert-wrapper">
                <span></span>
                <input 
                className="insert-todo"
                placeholder="Create a new todo" 
                value={todo_title}
                onChange={handleTodoTitle}
                onKeyDown={handleKeydown}  
                />

            </div>

            <div className="todo-item-list">
              <div>
                <RLDD
                  cssClasses="todo-items"
                  items={filterdItems()}
                  itemRenderer={itemRenderer}
                  onChange={handleRLDDChange}
                />
              </div>
              <div className="todo-filter">
                <div className="todo-filter-status">
                  {`${toDoItems.filter(item => item.isCompleted === false).length} items left`} 
                </div>
                <div className="filter-list">
                {
                  FilterStates.map((item, index) => {
                    return (
                      <div 
                        key={`filter-${item}`} 
                        className={filter === item ? 'todo-filter-item active' : 'todo-filter-item'}
                        onClick={() => setFilter(item)}
                        >
                        {item}
                      </div>
                    )
                  })
                }
                </div>
                <div 
                  className="todo-filter-status active"
                  onClick={removeCompleted}  
                >
                  Clear Completed
                </div>  
              </div>
              
            </div>
            <div className="filter-list-mobile">
                {
                  FilterStates.map((item, index) => {
                    return (
                      <div 
                        key={`filtermobile-${item}`} 
                        className={filter === item ? 'todo-filter-item active' : 'todo-filter-item'}
                        onClick={() => setFilter(item)}
                        >
                        {item}
                      </div>
                    )
                  })
                }
                </div>
            <div className="footer text-center">
                Drag and drop to reorder list
            </div>
        </div>
      
    </div>
  );
}

export default App;
