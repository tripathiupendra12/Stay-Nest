import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Chatbot = ({ setIsOpen }) => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessage("");

    const res = await fetch("https://stay-nest-ph9a.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="fixed bottom-24 right-5 w-80 lg:w-96 h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h2 className="font-semibold">StayNest AI</h2>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="text-lg hover:opacity-80"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">

        {/* Welcome / Bot Reply */}
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm text-gray-800">
            {reply?.trim()
              ? <ReactMarkdown>{reply}</ReactMarkdown>
              : "🏡 Welcome to StayNest AI! Find the perfect stay, explore destinations, and get instant travel assistance."}
          </div>
        </div>

      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about stays, destinations..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-xl transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;