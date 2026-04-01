import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function CodeEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [code, setCode] = useState('CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(255),\n  created_at TIMESTAMP\n);');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.code) setCode(nodeData.code);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], code };
    }
  }, [code, id, nodeId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-[280px] border border-gray-200 rounded-md overflow-hidden bg-[#1e1e1e]">
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-[#404040] shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-3">
          <select className="bg-transparent text-gray-300 text-xs border-none focus:ring-0 cursor-pointer">
            <option value="sql">SQL</option>
            <option value="json">JSON</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors"
            title="复制代码"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 w-full bg-transparent text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
}
