import { useState, useRef } from 'react';
import { Paperclip, Send } from 'lucide-react';

function MessageInput({ setMessages, participants, selectedSender, setSelectedSender }) {
  const [message, setMessage] = useState('');
  const secondParticipant = participants?.trim() || 'Unknown';

  const senderNames = ['You', secondParticipant];
  const buttonRefs = useRef([]);
  const inputRef = useRef(null); // ✅ ref for input

  const handleTab = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentIndex = senderNames.indexOf(selectedSender);
      const nextIndex = (currentIndex + 1) % senderNames.length;
      setSelectedSender(senderNames[nextIndex]);

      // Brief delay to ensure state updates before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Resize & convert image to base64
  const resizeImageToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 200;
        const scale = maxWidth / img.width;
        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL('image/jpeg', 0.7);
        callback(base64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImageToBase64(file, (base64Image) => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: selectedSender,
            text: '',
            image: base64Image,
          },
        ]);
      });
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    console.log('----------selectedSender' + selectedSender);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: selectedSender,
        text: message.trim(),
        image: null,
      },
    ]);

    setMessage('');
  };

  return (
    <div className="space-y-3">
      {/* Sender Buttons */}
      <div className="flex gap-2">
        {senderNames.map((name, index) => (
          <button
            key={name}
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => setSelectedSender(name)}
            className={`px-4 py-2 rounded-full border ${
              selectedSender === name
                ? 'bg-indigo-500 text-white border-indigo-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef} // ✅ attach ref to input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 text-base"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
            if (e.key === 'Tab') handleTab(e);
          }}
        />

        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <Paperclip className="w-5 h-5 text-gray-500 hover:text-indigo-500" />
        </label>

        <button onClick={sendMessage}>
          <Send className="w-5 h-5 text-gray-500 hover:text-blue-500" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
