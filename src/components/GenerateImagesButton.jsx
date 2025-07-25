import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import ChatPreview from './ChatPreview';

function GenerateImagesButton({ messages }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [generating, setGenerating] = useState(false);
  const captureRef = useRef(null);

  const IMAGE_HEIGHT = 750;

  const simulateChunking = () => {
    const maxMessagesPerChunk = 6; // simple simulation
    const result = [];
    for (let i = 0; i < messages.length; i += maxMessagesPerChunk) {
      result.push(messages.slice(i, i + maxMessagesPerChunk));
    }
    return result;
  };

  const generateScreenshots = async () => {
    setGenerating(true);
    const chunks = simulateChunking();
    setChunks(chunks);

    for (let i = 0; i < chunks.length; i++) {
      setPageIndex(i);
      await new Promise((res) => setTimeout(res, 300)); // wait for DOM to render

      const dataUrl = await htmlToImage.toPng(captureRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `chat-page-${i + 1}.png`;
      link.click();
    }

    setPageIndex(0);
    setChunks([]);
    setGenerating(false);
  };

  return (
    <>
      <button
        onClick={generateScreenshots}
        className="w-full px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
        disabled={generating}
      >
        {generating ? 'Generating...' : 'Generate Images'}
      </button>

      {/* Hidden preview renderer */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        {chunks.length > 0 && (
          <div
            ref={captureRef}
            style={{
              width: '430px',
              height: '750px',
              padding: '16px',
              backgroundColor: 'white',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            <ChatPreview messages={chunks[pageIndex]} />
          </div>
        )}
      </div>
    </>
  );
}

export default GenerateImagesButton;
