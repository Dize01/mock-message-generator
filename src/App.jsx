import { useState, useEffect } from 'react';
import ConfigPanel from './components/ConfigPanel';
import ChatPreview from './components/ChatPreview';
import MessageInput from './components/MessageInput';

function App() {
  const [messages, setMessages] = useState([ ]);
  const [participants, setParticipants] = useState('');
  const [selectedSender, setSelectedSender] = useState('You');

  useEffect(() => {
    console.log('Updated messages:', messages);
  }, [messages]);

  return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
  {/* Simple Header */}
  <header className="w-full max-w-6xl bg-white rounded-t-lg shadow-md px-6 py-4 border-b border">
    <h1 className="text-2xl font-bold text-gray-800 text-center">Text Message Mocker</h1>
  </header>

  <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-b-lg shadow-lg overflow-hidden border-t-0 border">
    {/* Left Sidebar */}
    <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r">
      <h2 className="text-md font-semibold text-gray-700 mb-4">Message Settings</h2>
      <ConfigPanel
        messages={messages}
        setMessages={setMessages}  // ✅ Pass it down
        participants={participants}
        setParticipants={setParticipants}
      />
    </div>

    {/* Right Workspace */}
    <div className="w-full flex flex-col items-center justify-start py-4">
      <div
        className="w-[380px] min-h-[750px] max-h-screen flex flex-col border border-gray-300 rounded-md shadow-lg overflow-hidden"
      >
        {/* Chat Preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <ChatPreview messages={messages} setMessages={setMessages}  selectedSender={selectedSender}/>
        </div>

        {/* Message Input Area */}
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
</div>

  );
}

export default App;
