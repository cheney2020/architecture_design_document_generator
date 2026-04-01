import React, { useState, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Image as ImageIcon, Link, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function RichTextEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.richText) setContent(nodeData.richText);
      if (nodeData.images) setImages(nodeData.images);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], richText: content, images };
    }
  }, [content, images, id, nodeId]);

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = items[i].getAsFile();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setImages(prev => [...prev, url]);
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const items = e.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setImages(prev => [...prev, url]);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full min-h-[400px] border border-gray-200 rounded-md overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50 shrink-0">
        <div className="flex items-center space-x-1">
          <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Bold className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Italic className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><List className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><ListOrdered className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Quote className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Link className="w-4 h-4" /></button>
          <button 
            className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"
            onClick={() => document.getElementById(`image-upload-${nodeId}`)?.click()}
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <input 
            id={`image-upload-${nodeId}`}
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setImages(prev => [...prev, url]);
              }
              e.target.value = '';
            }}
          />
        </div>
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <textarea
          className="flex-1 w-full p-4 resize-none focus:outline-none min-h-[200px]"
          placeholder="在此输入内容... 支持直接粘贴或拖拽图片"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        />
        
        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">已上传图片 ({images.length})</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative group aspect-video bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <img 
                    src={url} 
                    alt={`Uploaded ${index}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
