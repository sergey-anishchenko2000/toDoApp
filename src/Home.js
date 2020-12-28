import {useState} from 'react';
import DragDropList from './components/drag_drop_list';
import DragDropFilter from './components/drag_drop_filter';

const FilterStates = ['All', 'Active', 'Completed'];

const Home = (props) => {

    const [todo_title, setTodoTitle] = useState('');
    const [todo_items, setTodoItems] = useState([]);
    const [filter, setFilter] = useState(FilterStates[0]); // 0 - all, 1 - active, 2 - completed 
    
    const handleTodoTitle = (event) => {

    };
    const toggleTheme = props.toggleTheme;

    return (
        
        <>
            <div className="full-bg"/>
            <img className="header-img" />
            <div className="main-wrapper">
                <div className="header">
                    <h3 className="uppercase">
                        TODO
                    </h3>
                    <img className="toggle-theme" onClick={toggleTheme}/>
                </div>
                <div className="insert-wrapper">
                    <input 
                    placeholder="Create a todo" 
                    value={todo_title}
                    onChange={handleTodoTitle}  
                    />

                </div>
                <div className="items-wrapper">
                    <DragDropList
                    items={todo_items}
                    filter={filter}
                    />
                    <DragDropFilter
                    filter={filter}
                    />
                </div>
                <div className="footer">
                    <div className="text-center">
                    Drag and drop to reorder list
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;