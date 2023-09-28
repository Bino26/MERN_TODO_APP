import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDoneOutline } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import "./style.css";

const CompletedTodos = () => {
  const navigate = useNavigate();
  const [completedTodos, setCompletedTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("newest");

  useEffect(() => {
    fetchCompletedTodos();
  }, []);

  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/completedTodos`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCompletedTodos(response.data.completedTodos);
      setLoading(false);
    } catch (error) {
      if (error.response.data.error) {
        navigate("/login");
      }
      setLoading(false);
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

      fetchCompletedTodos();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const filteredCompletedTodos = completedTodos.slice().sort((a, b) => {
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
        <p>Loading completed todos...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="section-heading">Completed Todos</h1>
      <div className="filter-container">
        <label>
          Filter by:
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>
      {filteredCompletedTodos.length === 0 ? (
        <p>No completed todos found.</p>
      ) : (
        <ul className="todos-container">
          {filteredCompletedTodos.map((todo) => (
            <li key={todo._id} className="todo">
              <div>
                <span>
                  <MdDoneOutline className="done" />
                  {todo.todo}
                </span>
                <span className="time-ago">{getTimeAgo(todo.createdAt)}</span>
                <button onClick={() => handleDeleteTodo(todo._id)}>
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CompletedTodos;
