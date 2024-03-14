import React, { useState } from 'react';
import Header from './Header';
import { Anthropic } from "@anthropic-ai/sdk";


const Chatbot: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ user: string; bot: string }>>([]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "claude-2",
          prompt: `Human: ${userMessage}\nAssistant:`,
          max_tokens_to_sample: 1000,
          temperature: 0,
        }),
      });
      const data = await response.json();
      const botMessage = data.completion;
      setChatHistory([...chatHistory, { user: userMessage, bot: botMessage }]);
      setUserMessage('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
        <div className="border p-4 rounded-lg">
          <div className="h-80 overflow-y-auto mb-4">
            {chatHistory.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>User:</strong> {message.user}
                <br />
                <strong>Bot:</strong> {message.bot}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded px-2 py-1 mr-2"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;