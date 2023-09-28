import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import "./style.css";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodo, setEditingTodo] = useState("");
  const [filterOption, setFilterOption] = useState("newest");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/todos`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setTodos(response.data.todos);
      setLoading(false);
    } catch (error) {
      if (error.response.data.error) {
        navigate("/login");
      }
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/addtodo`,
        { todo: newTodo },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setNewTodo("");
      fetchTodos();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateTodo = async (todoId, completed) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/todo/updateStatus`,
        { todoId, completed },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setEditingTodoId(null);
      setEditingTodo("");
      fetchTodos();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/todo/delete`,
        {
          data: { todoId },
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      fetchTodos();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateTodoText = async (todoId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/todo/update`,
        { todoId, todo: editingTodo },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setEditingTodoId(null);
      setEditingTodo("");
      fetchTodos();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEditingTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo._id === todoId);
    setEditingTodoId(todoId);
    setEditingTodo(todoToEdit.todo);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const filteredTodos = todos.slice().sort((a, b) => {
    if (filterOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="loading">
        <p>todos loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="section-heading">All Todos</h1>
      <div className="filter-container">
        <label>
          Filter by:
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>
      <form onSubmit={addTodo} className="add-todo-form">
        <textarea
          name="new-todo"
          id="add-new-todo"
          cols="30"
          rows="3"
          value={newTodo}
          placeholder="Enter your todo here..."
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        ></textarea>
        <button type="submit">Add Todo</button>
      </form>
      {filteredTodos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="todos-container">
          {filteredTodos.map((todo) => (
            <li key={todo._id} className="todo">
              <div>
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleUpdateTodo(todo._id, !todo.completed)}
                  />
                  {editingTodoId === todo._id ? (
                    <div>
                      <textarea
                        type="text"
                        rows={3}
                        cols={35}
                        value={editingTodo}
                        onChange={(e) => setEditingTodo(e.target.value)}
                      />
                      <button onClick={() => handleUpdateTodoText(todo._id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={todo.completed ? "completed" : ""}
                        style={{
                          textDecoration: todo.completed ? "line-through" : "",
                        }}
                      >
                        {todo.todo}
                      </span>
                      <div className="time-ago">
                        {getTimeAgo(todo.createdAt)}
                      </div>
                      <div className="btn-container">
                        <button onClick={() => handleEditingTodo(todo._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteTodo(todo._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Todos;
