import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Wand2, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EHRGeneration = () => {
  const [transcribedText, setTranscribedText] = useState('');
  const [generatedEHR, setGeneratedEHR] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!transcribedText.trim()) {
      toast.error('Please provide transcribed text');
      return;
    }

    setIsGenerating(true);
    toast.loading('Generating EHR...');

    try {
      // TODO: Implement actual EHR generation logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockEHR = `
Patient Assessment:
- Chief Complaint: Persistent cough and fever
- History of Present Illness: Started 5 days ago
- Vital Signs: BP 120/80, HR 75, Temp 38.2°C
- Physical Examination: Clear lungs, no wheezing

Assessment & Plan:
1. Upper Respiratory Infection
   - Prescribed antibiotics
   - Rest recommended
2. Follow-up in 1 week
`;
      
      setGeneratedEHR(mockEHR);
      toast.success('EHR generated successfully');
    } catch (error) {
      toast.error('Failed to generate EHR');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          EHR Generation
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcribed Text</h2>
            <textarea
              value={transcribedText}
              onChange={(e) => setTranscribedText(e.target.value)}
              placeholder="Paste transcribed text here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating || !transcribedText.trim()}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5 mr-2" />
              )}
              Generate EHR
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated EHR</h2>
            {generatedEHR ? (
              <div className="relative">
                <pre className="w-full h-64 p-4 bg-gray-50 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm">
                  {generatedEHR}
                </pre>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Generated</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <p>Generated EHR will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EHRGeneration;