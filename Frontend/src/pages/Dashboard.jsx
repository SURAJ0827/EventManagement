import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API_BASE_URL =
  "https://event-management-backend-pxns.onrender.com/api/events"; // Update this if needed
const SOCKET_URL = "http://localhost:5000"; // WebSocket server URL

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();

    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch events. Please try again later.");
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    try {
      if (editingEvent) {
        await axios.put(
          `${API_BASE_URL}/update/${editingEvent._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFormData({ name: "", description: "", date: "" });
      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      setError("Failed to save event. Please try again later.");
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      setError("Failed to delete event. Please try again later.");
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date,
    });
    setEditingEvent(event);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {editingEvent ? "Edit Event" : "Create Event"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Event Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Event Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          {editingEvent ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* Event List */}
      <h2 className="text-xl font-bold mb-3">Event List</h2>

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-4 border rounded-lg flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500">{event.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-3 mt-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No events found.</p>
      )}
    </div>
  );
};

export default Dashboard;
