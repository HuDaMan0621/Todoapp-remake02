import React from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

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
        todos: [],
        todoToShow: "all",
        toggleAllComplete: true
    };

    addTodo = todo => {
        //createing a copy of the array and passing it into the newTodos
        // this.state.todos.push(todo);
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
    };

    toggleComplete = id => {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {  //if we find the one, we are suppose to update
                    return {
                        ...todo, //allows us to keep the same id, 
                        complete: !todo.complete //overwrite the value complete 
                    }
                } else {
                    return todo;
                }
            })
        }));
    };

    updateTodoToShow = s => {
        this.setState({
            todoToShow: s
        })
    }

    handleDeleteTodo = id => {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        })
        );
    };

    removeAllTodosThatAreComplete = () => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete) //keep all the todos that are complete and not complete
        })
        );
    };

    render() {
        let todos = [];

        if (this.state.todoToShow === 'all') {
            todos = this.state.todos;
        } else if (this.state.todoToShow === 'active') {
            todos = this.state.todos.filter(todo => !todo.complete);
        }
        else if (this.state.todoToShow === 'complete') {
            todos = this.state.todos.filter(todo => !todo.complete);
        }


        return (
            <div>
                <TodoForm onSubmit={this.addTodo} />
                {/* //visiualize the data */}
                {/* {JSON.stringify(this.state.todos)}  */}
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        toggleComplete={() => this.toggleComplete(todo.id)} //lander function, able to passin a param thats in the map, we will pass in the todo from 79 and get the id here. 
                        onDelete={() => this.handleDeleteTodo(todo.id)}
                        todo={todo}
                    />
                ))}
                <div> todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button onClick={() => this.updateTodoToShow("all")}>All</button>
                    <button onClick={() => this.updateTodoToShow("active")}>Active</button>
                    <button onClick={() => this.updateTodoToShow("complete")}>Complete</button>
                </div>
                {this.state.todos.filter(todo => todo.complete).length ? (
                    <div>
                        <button onClick={this.removeAllTodosThatAreComplete}>
                            remove all complete todos
                        </button>
                    </div>
                ) : null}
                <div>
                    <button onClick={() =>
                        this.setState(state => ({
                            todos: state.todos.map(todo => ({
                                ...todo,
                                complete: state.toggleAllComplete
                            })),
                            toggleAllComplete: !state.toggleAllComplete
                        })
                        )}
                    >
                        Toggle all complete: {`${this.state.toggleAllComplete}`}
                    </button>
                </div>
            </div>
        );
    }
}