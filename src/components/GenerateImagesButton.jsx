import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import ChatPreview from './ChatPreview';

function GenerateImagesButton({ messages }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [generating, setGenerating] = useState(false);
  const captureRef = useRef(null);

  const IMAGE_WIDTH = 380;
  const IMAGE_HEIGHT = 850;
  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 60;
  const BODY_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT;
  const CANVAS_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 70;

  const waitForImagesToLoad = (container) => {
    const images = container.querySelectorAll('img');
    const promises = [];

    images.forEach((img) => {
      if (!img.complete) {
        promises.push(
          new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // proceed even if one fails
          })
        );
      }
    });

    return Promise.all(promises);
  };


  const simulateChunking = () => {
    // Use measured height of each message to simulate page chunking
    const result = [];
    let currentChunk = [];
    let currentHeight = 0;

    for (let msg of messages) {
      const h = msg.height || 60; // fallback to estimated height if missing

      console.log('BODY_HEIGHT ----- ' + BODY_HEIGHT);
      console.log('text ----- ' + msg.text);
      console.log('height ----- ' + msg.height);
      
      if (currentHeight + h > CANVAS_HEIGHT) {
        console.log('currentHeight ----- ' + currentHeight);
        console.log('im in new chunk ----- ');
        result.push(currentChunk);
        currentChunk = [msg];
        currentHeight = h;
      } else {
        console.log('currentHeight ----- ' + currentHeight);
        console.log('im in chunk ----- ');
        currentChunk.push(msg);
        currentHeight += h;
      }
    }

    if (currentChunk.length > 0) {
      result.push(currentChunk);
    }

    return result;
  };

  const generateScreenshots = async () => {
    setGenerating(true);
    const chunks = simulateChunking();
    setChunks(chunks);

    for (let i = 0; i < chunks.length; i++) {
      setPageIndex(i);
      await new Promise((res) => setTimeout(res, 1000)); // longer delay
      await waitForImagesToLoad(captureRef.current);    // wait for base64 image loads

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
              width: `${IMAGE_WIDTH}px`,
              height: `${IMAGE_HEIGHT}px`,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              boxSizing: 'border-box',
              overflow: 'hidden',
              border: '1px solid #ccc',
              borderRadius: '30px',
              fontFamily: 'system-ui',
            }}
          >
            {/* Header */}
            <div style={{
              height: `${HEADER_HEIGHT}px`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Jessica
              <div style={{ fontSize: '12px', color: '#888' }}>9:41 AM</div>
            </div>

            {/* Message Body */}
            <div style={{
              height: `${BODY_HEIGHT}px`,
              overflow: 'hidden',
              padding: '12px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
              <ChatPreview messages={chunks[pageIndex]} />
            </div>

            {/* Footer */}
            <div style={{
              height: `${FOOTER_HEIGHT}px`,
              borderTop: '1px solid #eee',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '14px',
                color: '#999'
              }}>
                iMessage
              </div>
              <div style={{ color: '#007AFF', fontWeight: 'bold' }}>Send</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GenerateImagesButton;
