import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import axios from "axios";

const ChatComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { messages, setMessages } = useContext(AppContext); // Use context to manage chat messages

  const handleSend = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      setMessages((prev) => [...prev, { role: "user", content: prompt }]);

      const res = await axios.post("http://127.0.0.1:5001/generate", { prompt });

      setMessages((prev) => [...prev, { role: "ai", content: res.data.generated_text }]);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setPrompt(""); 
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <textarea
            className="flex-1 p-2 border rounded-lg outline-none  resize-none"
            rows="2"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default ChatComponent;