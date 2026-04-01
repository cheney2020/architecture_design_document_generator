import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';
import RichTextEditor from './RichTextEditor';

export default function ArchitectureDiagramEditor({ nodeId, title }: { nodeId: string, title?: string }) {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.imageUrl) setImageUrl(nodeData.imageUrl);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], imageUrl };
    }
  }, [imageUrl, id, nodeId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  return (
    <div className="space-y-6">
      {/* Image Upload / Preview Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] relative bg-gray-50 transition-colors hover:bg-gray-100">
        {imageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={imageUrl} alt="Architecture Diagram" className="max-h-[500px] max-w-full object-contain rounded-md shadow-sm" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-white text-red-600 rounded-full shadow-md hover:bg-red-50 transition-colors"
              title="移除图片"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
              <label
                htmlFor={`file-upload-${nodeId}`}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500 px-3 py-2 border border-blue-200 shadow-sm"
              >
                <span>上传图片</span>
                <input id={`file-upload-${nodeId}`} name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>
            <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* Rich Text Description Area */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">图表说明</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <RichTextEditor nodeId={`${nodeId}-desc`} />
        </div>
      </div>
    </div>
  );
}
