import { Download } from 'lucide-react';

function downloadCSV(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    alert('No messages to download.');
    return;
  }

  const header = ['Id','Sender', 'Text', 'Image'];
  const rows = messages.map((msg) => [
    msg.id,
    msg.sender,
    msg.text?.replace(/"/g, '""') || '',
    msg.image || ''
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [header, ...rows]
      .map((e) => e.map((cell) => `"${cell}"`).join(','))
      .join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'messages.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function DownloadCSVButton({ messages }) {
  return (
    <button
      className="bg-indigo-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
      onClick={() => downloadCSV(messages)}
    >
      <Download className="w-4 h-4" />
      Download CSV
    </button>
  );
}

export default DownloadCSVButton;
