import React from 'react';
import { render } from 'react-dom';

import RLDD from 'react-list-drag-and-drop/lib/RLDD';

import './index.css';

const todoitems = require('./todoitems.json');

export default class Example extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: todoitems.items,
      new_item: ''
    };
  }

  render() {
    const {items, new_item} = this.state;
    
    return (
      <div>
        <h1>react-list-drag-and-drop</h1>
        <div className="item">
          <input type="text" 
            value={new_item} 
            placeholder="input todo items" 
            onChange={this.handleNewItemChanged} 
            onKeyUp={this.handleNewItem} 
          />
        </div>
       
        <RLDD
          cssClasses="example"
          items={items}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />
      </div>
    );
  }

  itemRenderer(item, index) {
    return (
      <div className="item">
        <p className="title">
          {item.title}
        </p>
        <div className="small">
          item.id: {item.id} - index: {index}
        </div>
      </div>
    );
  }

  handleRLDDChange = (reorderedItems) => {
    this.setState({ items: reorderedItems });
  }

  handleNewItem = (event) => {
    if (event.keyCode === 13) {
      const items = this.state.items;
      let max_id = 0;
      items.map((item) => {
        if (item.id > max_id) max_id = item.id;
      }) 
      items.push({id: max_id + 1, title: this.state.new_item});
      console.log('new item changed2');
      this.setState({new_item: '', items})
      // this.setState({items: this.state.items});
    }

  }

  handleNewItemChanged = (event) => {
    console.log('new item changed');
    this.setState({new_item: event.target.value});
  }
}

render(<Example />, document.getElementById('root'));
