import React, { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("Connecting to backend...");
  const [status, setStatus] = useState("loading");

  const fetchData = async () => {
    try {
      const response = await fetch("/api/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message);
      setStatus("success");
    } catch (error) {
      console.error("Connection error:", error);
      setMessage("Failed to connect to backend");
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h1>Docker Frontend to Backend Connection</h1>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "8px",
          display: "inline-block",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor:
            status === "success"
              ? "#d4edda"
              : status === "error"
                ? "#f8d7da"
                : "#e2e3e5",
          color:
            status === "success"
              ? "#155724"
              : status === "error"
                ? "#721c24"
                : "#383d41",
          border: `1px solid ${status === "success" ? "#c3e6cb" : status === "error" ? "#f5c6cb" : "#d6d8db"}`,
        }}
      >
        Backend API Response: {message}
      </div>
    </div>
  );
};

export default App;
