import { useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import ChatPreview from './components/ChatPreview';
import MessageInput from './components/MessageInput';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', text: 'Hey! How are you doing?' },
    { id: 2, sender: 'Jessica', text: 'I’m good, thanks! Just working on projects.' }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Text Message Mocker</h1>

      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden border">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r">
          <h2 className="text-md font-semibold text-gray-700 mb-4">Message Settings</h2>
          <ConfigPanel messages={messages} />
        </div>

        {/* Right Workspace */}
        <div className="w-full md:w-2/3 flex flex-col">
          {/* Chat Preview */}
          <div className="flex-1 p-4 overflow-y-auto border-b">
            <ChatPreview messages={messages} />
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t bg-gray-50">
            <MessageInput setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
