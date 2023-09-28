import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import "./style.css";

const PendingTodos = () => {
  const navigate = useNavigate();
  const [pendingTodos, setPendingTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("newest");

  useEffect(() => {
    fetchPendingTodos();
  }, []);

  const fetchPendingTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/pendingTodos`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setPendingTodos(response.data.pendingTodos);
      setLoading(false);
    } catch (error) {
      if (error.response.data.error) {
        navigate("/login");
      }
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleUpdateTodoStatus = async (todoId, completed) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/todo/updateStatus`,
        { todoId, completed },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // Todo status updated successfully
        fetchPendingTodos();
        toast.success(response.data.message);
      } else {
        // Handle update status error
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filteredPendingTodos = pendingTodos.slice().sort((a, b) => {
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
        <p>Loading pending todos...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="section-heading">Pending Todos</h1>
      <div className="filter-container">
        <label>
          Filter by:
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>
      {filteredPendingTodos.length === 0 ? (
        <p>No pending todos found.</p>
      ) : (
        <ul className="todos-container">
          {filteredPendingTodos.map((todo) => (
            <li key={todo._id} className="todo">
              <div>
                <span>{todo.todo}</span>
                <span className="time-ago">{getTimeAgo(todo.createdAt)}</span>
                <button
                  onClick={() =>
                    handleUpdateTodoStatus(todo._id, !todo.completed)
                  }
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PendingTodos;
