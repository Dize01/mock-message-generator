import { useState } from 'react';
import DownloadCSVButton from './DownloadCSVButton';
import GenerateImagesButton  from './GenerateImagesButton';

function ConfigPanel({ messages, setMessages, participants, setParticipants }) {

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  
  const handleUploadCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;

      const lines = text.trim().split('\n');

      // Extract headers: remove quotes and trim spaces
      const header = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());

      const parsedMessages = lines.slice(1).map((line) => {
        // This regex correctly splits CSV values, even with quoted commas
        const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        if (!values || values.length < header.length) return null;

        const cleaned = values.map(val => val.replace(/^"|"$/g, '').trim());

        return {
          id: cleaned[header.indexOf('Id')],
          sender: cleaned[header.indexOf('Sender')],
          text: cleaned[header.indexOf('Text')],
          image: cleaned[header.indexOf('Image')] || null,
        };
      }).filter(Boolean);

      setMessages(parsedMessages);
    };

    reader.readAsText(file);
  };




return (
  <div className="space-y-6">

    {/* File Upload & Reset Section */}
    <fieldset className="space-y-2">
      <button
        onClick={() => setMessages([])}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-600 rounded hover:bg-gray-100"
      >
        New Chat
      </button>

      <label className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-500 rounded cursor-pointer hover:bg-indigo-50 hover:text-indigo-700">
        Upload CSV
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleUploadCSV(e)}
        />
      </label>
    </fieldset>


    {/* Metadata Section */}
    <fieldset className="space-y-4">
      <h2 className="text-md font-semibold text-gray-700 mb-4">Message Details</h2>
      <div>
        <label className="block text-sm font-small text-gray-700 mb-1">File Name</label>
        <input
          type="text"
          placeholder="e.g. Jessica"
          className="w-full px-3 py-2 border rounded-md text-base"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-small text-gray-700 mb-1">Time (24h format)</label>
        <input
          type="time"
          className="w-full px-3 py-2 border rounded-md text-base"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-small text-gray-700 mb-1">Recipient</label>
        <input
          type="text"
          placeholder="e.g. Jessica"
          className="w-full px-3 py-2 border rounded-md text-base"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
      </div>
    </fieldset>

    {/* Export Section */}
    <fieldset className="space-y-2 pt-1">
      <h2 className="text-md font-semibold text-gray-700 mb-4">Download</h2>
      <DownloadCSVButton messages={messages} />
      <GenerateImagesButton
        messages={messages}
        name={participants}
        time={time}
        title={title}
      />
    </fieldset>
    
  </div>
);

}

export default ConfigPanel;
