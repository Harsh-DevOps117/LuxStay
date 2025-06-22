import React, { useState, useRef, useEffect, useCallback } from "react";
import api from "@/axios";
import {
  Send,
  Bot,
  User as UserIcon, // Renamed to UserIcon to avoid conflict with User interface
  MessageSquare,
  ChevronDown,
} from "lucide-react";

// Define the structure for a chat message
interface ChatMessage {
  id: number;
  sender: "user" | "ai";
  text: string;
  suggestions?: string[]; // Optional property for AI suggestions
}

// Define the User interface here to resolve "cant find User" error
interface User {
  _id: string;
  name: string;
  email: string;
  // Add any other user properties you might expect, e.g., role: string;
}

// Helper to get time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  // Using India's current time as per system prompt (adjust as needed for deployment locale)
  if (hour >= 5 && hour < 12) return "Good morning"; // 5 AM to 11:59 AM
  if (hour >= 12 && hour < 18) return "Good afternoon"; // 12 PM to 5:59 PM
  return "Good evening"; // 6 PM to 4:59 AM
};

const TravellerBuddyAiPage: React.FC = () => {
  const initialGreeting = `${getGreeting()}! I'm your LuxStay Traveller Buddy AI. I can help you discover top tourist attractions, historical landmarks, local cuisines, and popular restaurants. Just type what you're looking for, e.g. "best places to visit in Goa" or "local food in Delhi".`;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(true);

  // --- Effects ---

  // Initialize chat with AI greeting or load from local storage
  useEffect(() => {
    if (showWelcomeScreen) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: Date.now(), // Use Date.now() for unique ID
            sender: "ai",
            text: initialGreeting,
            suggestions: [
              "Plan trip to Goa",
              "Explore kanpur attractions",
              "Explorein Mumbai",
              "Local dining options in Delhi",
            ],
          },
        ]);
        setIsTyping(false);
      }, 1500); // Slower initial typing for welcome message
    }
  }, [showWelcomeScreen, initialGreeting]);

  // Auto-scroll to bottom on new messages or typing indicator change
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo({
        top: chatHistoryRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Handle scroll to show/hide scroll-to-bottom button
  const handleScroll = useCallback(() => {
    if (chatHistoryRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatHistoryRef.current;
      // Show button if scrolled up more than 200px from bottom
      setShowScrollButton(scrollHeight - scrollTop > clientHeight + 200);
    }
  }, []);

  useEffect(() => {
    const chatDiv = chatHistoryRef.current;
    if (chatDiv) {
      chatDiv.addEventListener("scroll", handleScroll);
      return () => {
        chatDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  // --- AI Response Logic (Simulated - using raw data) ---
  const getAiResponseFromAPI = async (userMessage: string) => {
    try {
      const res = await api.post("/ask", { message: userMessage });

      return res.data.reply;
    } catch (err: any) {
      console.error("AI fetch failed:", err);

      return (
        err?.response?.data?.error ||
        "Oops! AI is taking a break due to quota limits. Try again later."
      );
    }
  };

  // --- Handlers ---
  const handleSendMessage = useCallback(() => {
    if (inputText.trim() === "" || isTyping) return; // Prevent sending empty messages or while AI is typing

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: inputText.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response with a delay
    setTimeout(() => {
      getAiResponseFromAPI(newUserMessage.text).then((replyText) => {
        const aiMessage: ChatMessage = {
          id: Date.now(),
          sender: "ai",
          text: replyText,
          // Optional: you could add suggestions here dynamically
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }); // Get AI response
      // Hide typing indicator
    }, Math.floor(Math.random() * 800) + 700); // Random delay between 0.7s and 1.5s
  }, [inputText, isTyping]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isTyping && inputText.trim() !== "") {
        handleSendMessage();
      }
    },
    [inputText, isTyping, handleSendMessage]
  );

  const handleSuggestionClick = useCallback(
    (suggestionText: string) => {
      setInputText(suggestionText);
      // Automatically send the suggestion as a message
      setTimeout(() => {
        // Small delay to allow input field to update first
        handleSendMessage();
      }, 50);
    },
    [setInputText, handleSendMessage]
  );

  const handleStartChat = useCallback(() => {
    setShowWelcomeScreen(false);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo({
        top: chatHistoryRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // --- Render ---

  if (showWelcomeScreen) {
    return (
      <div className="w-[95%] mx-auto space-y-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl font-sans h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
        <div className="bg-white p-10 rounded-full shadow-2xl animate-fade-in-down">
          <Bot size={80} className="text-gray-800" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 animate-fade-in-up delay-100">
          Your Traveller Buddy AI
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
          Hi there! I'm here to assist you with all your LuxStay needs – from
          finding the perfect property to managing your bookings and answering
          FAQs. Let's make your travel planning effortless!
        </p>
        <button
          onClick={handleStartChat}
          className="mt-8 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in-up delay-300"
        >
          Start Chatting Now
        </button>
        {/* Simple animations for welcome screen */}
        <style>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-down {
            animation: fadeInDown 0.8s ease-out forwards;
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
        `}</style>
      </div>
    );
  }

  return (
    // Increased max-w for a wider chat interface, added subtle gradient background
    <div className="max-w-4xl mx-auto space-y-6 p-6 md:p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border border-gray-200 shadow-lg font-sans h-[calc(100vh-4rem)] flex flex-col">
      {/* Page Title */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg">
        <MessageSquare size={32} className="text-gray-800" />
        <h2 className="text-3xl font-extrabold text-gray-900">
          Traveller Buddy AI
        </h2>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300">
            <a href="/">Home</a>
          </button>
        </div>
      </div>

      {/* Chat History Area */}
      <div
        ref={chatHistoryRef}
        className="relative flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-y-auto space-y-4 custom-scrollbar"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 message-entry ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "ai" && (
              <div className="p-2 rounded-full bg-gray-900 text-white flex-shrink-0 animate-bounce-in shadow-md">
                <Bot size={18} />
              </div>
            )}
            <div
              className={`max-w-[75%] p-4 rounded-xl shadow-md transition-all duration-300 ease-out message-slide-in ${
                // Increased max-width
                message.sender === "user"
                  ? "bg-black text-white rounded-br-none hover:shadow-lg hover:scale-[1.005]" // User message bubble with hover effects
                  : "bg-gray-100 text-gray-900 rounded-tl-none hover:shadow-lg hover:scale-[1.005]" // AI message bubble with hover effects
              }`}
            >
              <p className="text-sm md:text-base whitespace-pre-wrap">
                {message.text}
              </p>
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={Date.now() + idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 text-xs font-medium rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-colors duration-200 transform hover:scale-[1.02]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {message.sender === "user" && (
              <div className="p-2 rounded-full bg-gray-200 text-gray-800 flex-shrink-0 animate-bounce-in shadow-md">
                <UserIcon size={18} />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 justify-start typing-indicator-container message-slide-in">
            <div className="p-2 rounded-full bg-gray-900 text-white flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-gray-100 text-gray-900 p-4 rounded-xl rounded-tl-none shadow-sm animate-pulse-dots">
              <div className="dot-animation">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200 animate-bounce-y z-10"
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={20} />
          </button>
        )}
      </div>

      {/* Message Input Area */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:shadow-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isTyping
              ? "AI is typing a response..."
              : "Ask your travel buddy anything..."
          }
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent text-gray-900 bg-gray-50 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
          disabled={isTyping}
        />
        <button
          onClick={handleSendMessage}
          className="bg-black text-white p-3 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
          disabled={isTyping || inputText.trim() === ""}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Inline Styles for Animations and Scrollbar */}
      <style>{`
        /* Message slide-in animation */
        .message-slide-in {
          animation: slideIn 0.3s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(10px); /* Slide up slightly */
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Icon bounce animation */
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        /* Typing indicator dots animation */
        .animate-pulse-dots {
          animation: pulseDots 1.5s infinite ease-in-out;
        }
        @keyframes pulseDots {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .dot-animation span {
          display: inline-block;
          animation: dot-pulse 1s infinite alternate;
          margin: 0 1px;
          opacity: 0;
        }
        .dot-animation span:nth-child(1) {
          animation-delay: 0s;
        }
        .dot-animation span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot-animation span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dot-pulse {
          0%,
          80%,
          100% {
            transform: scale(0);
            opacity: 0;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Scroll-to-bottom button bounce animation */
        @keyframes bounceY {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -10px);
          }
        }
        .animate-bounce-y {
          animation: bounceY 1.5s infinite ease-in-out;
        }

        /* Custom Scrollbar for Chat History - Adjusted for B&W */
        .custom-scrollbar {
          scrollbar-width: thin; /* For Firefox */
          scrollbar-color: #555 #eee; /* thumb track */
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #eee; /* Light gray track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #555; /* Darker gray thumb */
          border-radius: 10px;
          border: 2px solid #eee; /* Padding around thumb */
        }
      `}</style>
    </div>
  );
};

export default TravellerBuddyAiPage;
