import { useEffect, useRef } from 'react';

function ChatPreview({ messages, setMessages }) {
  const refs = useRef({}); // key: message id, value: ref

  // Assign refs for each message
  useEffect(() => {
    if (!setMessages) return; // avoid calling undefined function

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


  return (
    <div className="flex justify-center">
      <div className="max-w-[430px] w-full space-y-2 flex flex-col">
        {messages.map((msg) => {
          const isYou = msg.sender === 'You';
          const hasText = Boolean(msg.text);
          const hasImage = Boolean(msg.image);

          return (
            <div
              key={msg.id}
              ref={(el) => (refs.current[msg.id] = el)}
              className={`inline-block max-w-[70%] rounded-2xl text-base break-words overflow-hidden ${
                isYou
                  ? 'bg-blue-500 text-white self-end ml-auto rounded-br-none'
                  : 'bg-gray-200 text-gray-800 self-start rounded-bl-none'
              } ${hasText ? 'px-4 py-2' : ''}`}
            >
              {hasImage && (
                <img
                  src={msg.image}
                  alt="sent"
                  className="rounded-lg max-w-full object-cover"
                />
              )}
              {hasText && <p>{msg.text}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatPreview;
