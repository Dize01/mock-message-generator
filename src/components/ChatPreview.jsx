import { useEffect, useRef, useState } from 'react';
import { Pencil, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';

function ChatPreview({ messages, setMessages }) {
  const refs = useRef({});
  const [activeId, setActiveId] = useState(null);
  const [editingTextId, setEditingTextId] = useState(null);
  const [editTextValue, setEditTextValue] = useState('');

  // Update message height after render
  useEffect(() => {
    if (!setMessages) return;

    const updated = messages.map((msg) => {
      const ref = refs.current[msg.id];
      if (ref && ref.offsetHeight && msg.height !== ref.offsetHeight) {
        return { ...msg, height: ref.offsetHeight };
      }
      return msg;
    });

    const hasChanged = updated.some((msg, idx) => msg.height !== messages[idx]?.height);
    if (hasChanged) {
      setMessages(updated);
    }
  }, [messages, setMessages]);

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddBelow = (index) => {
    const newMsg = {
      id: Date.now() + Math.random(),
      sender:  'You', // fallback just in case
      text: '',
      image: null,
    };

    setMessages((prevMessages) => {
      const updated = [...prevMessages];
      updated.splice(index + 1, 0, newMsg);
      return updated;
    });
  };

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


const handleEdit = (msg) => {
  if (msg.image) {
    // Replace image logic with resize and base64 conversion
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      resizeImageToBase64(file, (base64) => {
        const updated = messages.map((m) =>
          m.id === msg.id ? { ...m, image: base64 } : m
        );
        setMessages(updated);
      });
    };
    input.click();
  } else {
    // Enable inline text edit
    setEditingTextId(msg.id);
    setEditTextValue(msg.text || '');
  }
};


  const saveEditedText = (id) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, text: editTextValue } : m
    );
    setMessages(updated);
    setEditingTextId(null);
    setEditTextValue('');
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-[430px] w-full space-y-2 flex flex-col">
        {messages.map((msg, idx) => {
          const isYou = msg.sender === 'You';
          const isActive = msg.id === activeId;
          const isEditingText = msg.id === editingTextId;

          return (
            <div key={msg.id} className="flex flex-col">
              {/* Message Bubble */}
              <div
                ref={(el) => (refs.current[msg.id] = el)}
                onClick={() => {
                  if (editingTextId !== msg.id) setActiveId(msg.id);
                }}
                className={`inline-block max-w-[70%] rounded-2xl text-base break-words overflow-hidden cursor-pointer ${
                  isYou
                    ? 'bg-blue-500 text-white self-end ml-auto rounded-br-none'
                    : 'bg-gray-200 text-gray-800 self-start rounded-bl-none'
                } ${msg.image ?  'p-0' : 'px-4 py-2'}`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="sent"
                    className="rounded-lg max-w-full object-cover"
                  />
                )}

                {isEditingText ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      className={`w-full bg-transparent border-b border-dashed focus:outline-none ${
                        isYou ? 'text-white' : 'text-gray-800'
                      }`}
                      value={editTextValue}
                      autoFocus
                      onChange={(e) => setEditTextValue(e.target.value)}
                    />

                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => saveEditedText(msg.id)}
                    className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
                    title="Save"
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingTextId(null);
                      setEditTextValue('');
                    }}
                    className="w-6 h-6 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center"
                    title="Cancel"
                  >
                    <XCircle className="w-3 h-3 text-white" />
                  </button>
                </div>


              </div>
            ) : (
              msg.text && <p>{msg.text}</p>
            )}

              </div>

              {/* Action Buttons */}
              {isActive && (
                <div
                  className={`mt-1 flex gap-2 ${
                    isYou ? 'justify-end pr-1' : 'justify-start pl-1'
                  }`}
                >
                  <button
                    onClick={() => handleEdit(msg)}
                    className="w-6 h-6 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center"
                    title="Edit"
                  >
                    <Pencil className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => handleAddBelow(idx)}
                    className="w-6 h-6 rounded-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center"
                    title="Add Message Below"
                  >
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatPreview;
