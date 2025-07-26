import { useState } from 'react';
import DownloadCSVButton from './DownloadCSVButton';
import GenerateImagesButton  from './GenerateImagesButton';

function ConfigPanel({ messages }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [participants, setParticipants] = useState('');

  return (
    <div className="space-y-4">
      <div>
        
        <label className="block text-sm font-medium text-gray-700 mb-1">Title (Chat Name)</label>
        <input
          type="text"
          placeholder="e.g. Jessica"
          className="w-full px-3 py-2 border rounded-md text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time (24h format)</label>
        <input
          type="time"
          className="w-full px-3 py-2 border rounded-md text-sm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">People in Conversation</label>
        <input
          type="text"
          placeholder="e.g. You, Jessica"
          className="w-full px-3 py-2 border rounded-md text-sm"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
      </div>

      <div className="pt-2 space-y-2">
        <DownloadCSVButton messages={messages} />
        <GenerateImagesButton
          messages={messages}
          name={participants}
          time={time}
          title={title}
        />

      </div>
    </div>
  );
}

export default ConfigPanel;
