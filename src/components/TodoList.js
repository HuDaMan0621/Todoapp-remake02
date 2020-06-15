import React from 'react';
import TodoForm from './TodoForm';

//  add todo
//  display todos
//  cross off todo
//  show number of active todos
//  filter all/active/complete
//  delete todo
//  delete all complete
//  only show if atleast one is completebutton to toggle all on/off


export default class TodoList extends React.Component {

    state = {
        todos: []

    };

    addTodo = (todo) => {
        const newTodos = [todo, ...this.state.todos]; //createing a copy of the array and passing it into the newTodos
        this.state.todos.push(todo);
        this.setState({
            todos: newTodos
        });
    };

    render() {
        return (<div>
            <TodoForm onSubmit={this.addTodo}/>
            {JSON.stringify(this.state.todos)}
        </div>
        );
    }
}