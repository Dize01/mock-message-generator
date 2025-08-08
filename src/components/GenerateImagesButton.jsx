import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import ChatPreview from './ChatPreview';

function GenerateImagesButton({ messages, name, time, title }) {

  const [pageIndex, setPageIndex] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [generating, setGenerating] = useState(false);
  const captureRef = useRef(null);

  const IMAGE_WIDTH = 380;
  const IMAGE_HEIGHT = 850;
  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 60;
  const BODY_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT;
  const CANVAS_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 120;

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
      console.log('CANVAS_HEIGHT ----- ' + CANVAS_HEIGHT);
      console.log('BODY_HEIGHT ----- ' + BODY_HEIGHT);

    for (let msg of messages) {
      const h = msg.height || 60; // fallback to estimated height if missing
      

      console.log('text ----- ' + msg.text);
      console.log('height ----- ' + msg.height);
      console.log('currentHeight ----- ' + (currentHeight + h));
      
      if (currentHeight + h > CANVAS_HEIGHT) {
        console.log('im in new chunk ----- ');
        result.push(currentChunk);
        currentChunk = [msg];
        currentHeight = h;
      } else {
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
      link.download = `${title?.replace(/\s+/g, '_') || 'chat'}-page-${i + 1}.png`;
      link.click();
    }

    setPageIndex(0);
    setChunks([]);
    setGenerating(false);
  };

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
};

const formatTime = (date) => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

const baseTime = parseTime(time || '22:11');
const dynamicTime = formatTime(new Date(baseTime.getTime() + pageIndex * 60000));



  return (
    <>
      <button
        onClick={generateScreenshots}
        className="w-full px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition"
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
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              borderBottom: '1px solid #eee',
              fontFamily: 'system-ui',
              position: 'relative',
              backgroundColor: '#fafafa'
            }}>

              {/* Time (top left) */}
              <div style={{
                position: 'absolute',
                top: '4px',
                left: '12px',
                fontSize: '11px',
                color: '#333',
                fontWeight: 'bold'
              }}>
                {dynamicTime}
              </div>

              {/* Top right indicators */}
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#333'
              }}>
                {/* Phone Signal */}
            <svg width="11" height="11" viewBox="0 0 1200 1200" fill="currentColor">

                  <path d="M960,1200V0h240v1200H960z M640,300h240v900H640V300z M320,600h240v600H320V600L320,600z M0,900h240v300H0V900z"/>
                </svg>

                {/* Wi-Fi */}
                <svg width="16" height="16" viewBox="0 0 42 42" fill="currentColor">
                  <path d="M25,31.041c-2.21-2.191-5.79-2.191-8,0L21,35L25,31.041z M33,23.12c-6.63-6.562-17.37-6.562-24,0
                  l4,3.959c4.42-4.37,11.58-4.37,16,0L33,23.12z M41,15.199c-11.05-10.932-28.95-10.932-40,0l4,3.959c8.84-8.751,23.16-8.751,32,0
                  L41,15.199z"/>
                </svg>

                {/* Battery */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 6h10v4H2V6z"/>
                  <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z"/>
                </svg>
              </div>

              {/* Back arrow */}
              <div style={{
                color: '#007AFF',
                fontSize: '24px',
                paddingRight: '10px'
              }}>
                ‹
              </div>

              {/* Avatar + Name */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexGrow: 1
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#92A8DF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#92A8DF',
                  marginBottom: '2px'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#6683CD"/>
                      <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#6683CD"/>
                    </svg>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>{(name || 'Unknown') + ' >'}</div>
              </div>

              {/* Video call icon */}
              <div style={{ width: '24px', height: '24px', marginLeft: 'auto' }}>
                <svg viewBox="0 0 24 24" fill="#007AFF" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.458,5.11a1,1,0,0,0-1.039.077L17,9.057V6a2,2,0,0,0-2-2H2A2,2,0,0,0,0,6V18a2,2,0,0,0,2,2H15a2,2,0,0,0,2-2V14.943l5.419,3.87A.988.988,0,0,0,23,19a1.019,1.019,0,0,0,.458-.11A1,1,0,0,0,24,18V6A1,1,0,0,0,23.458,5.11ZM2,18V6H15V18Zm20-1.943-5-3.572v-.97l5-3.572Z"/>
                </svg>
              </div>
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
  {/* Camera Icon */}
  <div style={{ width: 24, height: 24 }}>
    <svg width="24" height="24" viewBox="0 -2 32 32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#aaa" d="M286,471 L283,471 L282,469 C281.411,467.837 281.104,467 280,467 L268,467 C266.896,467 266.53,467.954 266,469 L265,471 L262,471 C259.791,471 258,472.791 258,475 L258,491 C258,493.209 259.791,495 262,495 L286,495 C288.209,495 290,493.209 290,491 L290,475 C290,472.791 288.209,471 286,471 Z M274,491 C269.582,491 266,487.418 266,483 C266,478.582 269.582,475 274,475 C278.418,475 282,478.582 282,483 C282,487.418 278.418,491 274,491 Z M274,477 C270.687,477 268,479.687 268,483 C268,486.313 270.687,489 274,489 C277.313,489 280,486.313 280,483 C280,479.687 277.313,477 274,477 L274,477 Z" transform="translate(-258 -467)" />
    </svg>
  </div>

  {/* Input bubble */}
  <div style={{
    flex: 1,
    height: 28,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: '#999'
  }}>
    iMessage
  </div>

  {/* Voice Icon */}
  <div style={{ width: 24, height: 24 }}>
    <svg fill="#aaa" viewBox="0 0 56 56" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M 24.5898 49.5742 C 25.5508 49.5742 26.2539 48.8477 26.2539 47.9336 L 26.2539 8.0664 C 26.2539 7.1524 25.5508 6.4258 24.5898 6.4258 C 23.6524 6.4258 22.9492 7.1524 22.9492 8.0664 L 22.9492 47.9336 C 22.9492 48.8477 23.6524 49.5742 24.5898 49.5742 Z M 38.2305 44.8867 C 39.1680 44.8867 39.8711 44.1367 39.8711 43.2227 L 39.8711 12.7773 C 39.8711 11.8633 39.1680 11.1133 38.2305 11.1133 C 37.2930 11.1133 36.5664 11.8633 36.5664 12.7773 L 36.5664 43.2227 C 36.5664 44.1367 37.2930 44.8867 38.2305 44.8867 Z M 17.7930 41.0898 C 18.7305 41.0898 19.4336 40.3633 19.4336 39.4492 L 19.4336 16.5508 C 19.4336 15.6367 18.7305 14.9102 17.7930 14.9102 C 16.8320 14.9102 16.1289 15.6367 16.1289 16.5508 L 16.1289 39.4492 C 16.1289 40.3633 16.8320 41.0898 17.7930 41.0898 Z M 31.4102 38.5586 C 32.3476 38.5586 33.0742 37.8320 33.0742 36.9180 L 33.0742 19.0820 C 33.0742 18.1680 32.3476 17.4414 31.4102 17.4414 C 30.4727 17.4414 29.7695 18.1680 29.7695 19.0820 L 29.7695 36.9180 C 29.7695 37.8320 30.4727 38.5586 31.4102 38.5586 Z M 45.0508 34.3633 C 45.9883 34.3633 46.6914 33.6133 46.6914 32.6992 L 46.6914 23.3008 C 46.6914 22.3867 45.9883 21.6367 45.0508 21.6367 C 44.0898 21.6367 43.3867 22.3867 43.3867 23.3008 L 43.3867 32.6992 C 43.3867 33.6133 44.0898 34.3633 45.0508 34.3633 Z M 10.9727 32.5117 C 11.9102 32.5117 12.6133 31.7851 12.6133 30.8711 L 12.6133 25.1289 C 12.6133 24.2149 11.9102 23.4883 10.9727 23.4883 C 10.0117 23.4883 9.3086 24.2149 9.3086 25.1289 L 9.3086 30.8711 C 9.3086 31.7851 10.0117 32.5117 10.9727 32.5117 Z"/>
    </svg>
  </div>
</div>

          </div>
        )}
      </div>
    </>
  );
}

export default GenerateImagesButton;
