import { useState, useEffect } from "react";
import ConfigPanel from "./components/ConfigPanel";
import ChatPreview from "./components/ChatPreview";
import MessageInput from "./components/MessageInput";
import { Instagram, Facebook, Menu, X } from "lucide-react";

function App() {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState("");
  const [selectedSender, setSelectedSender] = useState("You");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header / Nav */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">Kwagoo</h1>

          {/* Desktop Nav */}
          <nav className="space-x-2 text-sm text-gray-600 hidden sm:flex">
            {["Tools", "Contact Us", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-1 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-gray-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobileMenuOpen && (
          <div className="sm:hidden px-4 pb-4">
            <nav className="flex flex-col space-y-2 text-sm text-gray-600">
              {["Tools", "Contact Us", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 transition"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center py-6 px-4">
        {/* Hero Section */}
        <div className="text-center px-4 py-6">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">
            Fake Text Generator
          </h2>
          <p className="text-base text-gray-600">
            Easily create mock iMessage conversations for your story videos.
            <br className="hidden sm:inline" />
            It’s free — no sign-up needed!
          </p>
        </div>

        {/* Workspace */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg overflow-hidden border">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 p-6 bg-white">
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              New Conversation
            </h3>
            <ConfigPanel
              messages={messages}
              setMessages={setMessages}
              participants={participants}
              setParticipants={setParticipants}
            />
          </div>

          {/* Right Workspace */}
          <div className="w-full flex flex-col items-center justify-start py-0 md:py-4 bg-gray-100 m-0 md:m-2 rounded-lg">
            <div className="w-[380px] min-h-[750px] max-h-screen flex flex-col border border-gray-300 rounded-md shadow-lg overflow-hidden">
              {/* Chat Preview */}
              <div className="flex-1 overflow-y-auto p-4 bg-white">
                <ChatPreview
                  messages={messages}
                  setMessages={setMessages}
                  selectedSender={selectedSender}
                />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-gray-50">
                <MessageInput
                  setMessages={setMessages}
                  participants={participants}
                  selectedSender={selectedSender}
                  setSelectedSender={setSelectedSender}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          {/* Social Icons */}
          <div className="flex justify-center mb-2 gap-4 text-gray-500">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          © {new Date().getFullYear()} Kwagoo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
