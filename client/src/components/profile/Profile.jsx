import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_KEY}/user`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setLoading(false);
      } catch (error) {
        if (error.response.data.error) {
          navigate("/login");
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/logout`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Logout successful
      toast.success(response.data.message);
      // Show a confirmation message or redirect to login
      setShowConfirmation(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      // Handle logout error
      toast.error(error.response.data.message);
    }
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/user/delete`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Profile deleted successfully
      toast.success(response.data.message);
      //  redirect to login
      navigate("/signup");
    } catch (error) {
      // Handle profile deletion error
      toast.error(error.response.data.message);
    }
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/user/update`,
        { name, email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Profile updated successfully
      toast.success(response.data.message);
      // Show a success message or redirect to a success page
      setEditing(false);
      setUser({ ...user, name, email });
    } catch (error) {
      // Handle profile update error
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return <p>Error fetching profile</p>;
  }

  return (
    <div className="routing-content">
      <div className="flex heading section-heading">
        <h1>Profile</h1>
        <div>
          <button>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="profile-container">
        <MdAccountCircle className="profile-img" />
        {editing ? (
          <form className="edit-form flex" onSubmit={handleProfileSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button className="edit-profile" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="delete-profile" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </>
        )}
      </div>
      <Modal
        isOpen={showConfirmation}
        onRequestClose={cancelLogout}
        contentLabel="Logout Confirmation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
