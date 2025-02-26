import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Upload, Play, Pause, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const AudioManagement = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptionStatus, setTranscriptionStatus] = useState('idle');

  const handleRecord = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? 'Recording stopped' : 'Recording started');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      toast.success('Audio file uploaded successfully');
    }
  };

  const handleTranscribe = () => {
    setTranscriptionStatus('processing');
    toast.loading('Transcribing audio...');
    // TODO: Implement actual transcription logic
    setTimeout(() => {
      setTranscriptionStatus('completed');
      toast.success('Transcription completed');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          Audio Management
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Record Audio</h2>
            <div className="flex flex-col items-center space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecord}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-red-600' : 'bg-indigo-600'
                } text-white`}
              >
                {isRecording ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </motion.button>
              <p className="text-sm text-gray-600">
                {isRecording ? 'Recording in progress...' : 'Click to start recording'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Audio</h2>
            <div className="flex flex-col items-center space-y-4">
              <label className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload audio file</p>
                  <p className="text-xs text-gray-500">MP3 or WAV format</p>
                </motion.div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {audioFile && (
                <p className="text-sm text-gray-600">
                  File: {audioFile.name}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcription</h2>
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTranscribe}
              disabled={!audioFile && !isRecording}
              className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              <FileText className="w-5 h-5 mr-2" />
              Transcribe Audio
            </motion.button>
            {transcriptionStatus === 'completed' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Transcription completed. The text is ready for EHR generation.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioManagement;