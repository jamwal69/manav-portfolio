'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, FileText } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [scale, setScale] = useState(1);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-semibold text-white">Resume Viewer</h3>
                  <p className="text-xs text-blue-100">Manav_Singh_Jamwal_Resume.pdf</p>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  aria-label="Zoom Out"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                
                <span className="text-sm text-white font-mono min-w-[4rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  aria-label="Zoom In"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                
                <div className="w-px h-6 bg-white/20" />
                
                <a
                  href="/resume.pdf"
                  download="Manav_Singh_Jamwal_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </a>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-auto bg-slate-950 p-8">
              <div 
                className="mx-auto bg-white shadow-2xl transition-transform duration-300"
                style={{ 
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  width: '794px', // A4 width at 96 DPI
                  minHeight: '1123px', // A4 height at 96 DPI
                }}
              >
                <iframe
                  src="/resume.pdf"
                  className="w-full h-[1123px] border-0"
                  title="Resume PDF"
                />
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 text-xs text-slate-400 font-mono flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>📄 PDF Document</span>
                <span>•</span>
                <span>Updated: October 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">Press ESC to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
