import { useState } from 'react';
import { Trash2 } from 'lucide-react';

function JsonInput({ onVisualize, onClear }) {
  const [txt, setTxt] = useState('');
  const [err, setErr] = useState('');

  const sampleJson = `{
  "user": {
    "id": 1,
    "name": "Abhishek",
    "address": {
      "city": "Mumbai",
      "country": "India"
    }
  },
  "items": [
    {
      "name": "item1"
    },
    {
      "name": "item2"
    }
  ]
}`;

  const handleVisualize = () => {
    try {
      const data = JSON.parse(txt);
      setErr('');
      onVisualize(data);
    } catch (e) {
      setErr('Invalid JSON: ' + e.message);
    }
  };

  const clearAll = () => {
    setTxt('');
    setErr('');
    onClear();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">JSON Input</h2>
      </div>
      
      <textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        placeholder={sampleJson}
        className="w-full h-96 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
      />
      
      {err && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">{err}</p>
        </div>
      )}
      
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleVisualize}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-medium shadow-md hover:shadow-lg"
        >
          Generate Tree
        </button>
        
        <button
          onClick={clearAll}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 font-medium"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>
    </div>
  );
}

export default JsonInput;