
import React from 'react';
import DynamicList from './DynamicList';
import UserInput from './UserInput';

// Move your todo items array to the state of your application. This creates a copy of it that we can change.
// - Create a state object with the todo array as initial value
// - Pass the todos array from the state to the components using props
class PreviousHomeworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          id: 1,
          description: 'Get out of bed',
          deadline: '2017-09-11',
          done: true,
        },
        {
          id: 2,
          description: 'Brush teeth',
          deadline: '2017-09-10',
          done: false,
        },
        {
          id: 3,
          description: 'Eat breakfast',
          deadline: '2017-09-09',
          done: false,
        },
      ],
      userDescription: '',
      userDate: '',
    };
  }
  handleDescriptionChange = (e) => {
    this.setState({userDescription: e.target.value})
  };

  handleDateChange = (e) => {
    const today = Date().now();
    const userDate = new Date(e.target.value).now();
    if (userDate < today) {
      this.setState({ error: true })
      return;
    }
    this.setState({userDate: e.target.value})
  };
  addItem = event => {
    event.preventDefault();
    // const description = event.target.description.value;
    // const deadline = event.target.date.value;
    const todoList = [...this.state.todoList]; //copy the old state array to the new array
    todoList.push({
      id: todoList[todoList.length - 1].id + 1,
      description: this.state.userDescription,
      deadline: this.state.userDate,
      done: false,
    });
    this.setState({ todoList });
  };

  deleteItem = event => {
    event.preventDefault();
    const todoList = this.state.todoList.filter(item => {
      if (item.id === parseInt(event.target.id)) {
        return false;
      } else {
        return true;
      }
      // if the id of the button delete (event.target.id)is the same id of the item then filter this item out 'delete it'
      // return item.id !== parseInt(event.target.id)
    });
    this.setState({ todoList });
  };

  render() {
    console.log(this.state);
    return (
      <div className="panel">
        <UserInput addItem={this.addItem} />
        <DynamicList items={this.state.todoList} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default PreviousHomeworks;
