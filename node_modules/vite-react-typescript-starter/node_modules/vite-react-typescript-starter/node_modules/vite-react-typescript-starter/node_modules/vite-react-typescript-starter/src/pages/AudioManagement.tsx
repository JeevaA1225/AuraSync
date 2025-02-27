// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mic, Upload, Play, Pause, FileText } from 'lucide-react';
// import toast from 'react-hot-toast';

// const AudioManagement = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioFile, setAudioFile] = useState(null);
//   const [transcriptionStatus, setTranscriptionStatus] = useState('idle');

//   const handleRecord = () => {
//     setIsRecording(!isRecording);
//     toast.success(isRecording ? 'Recording stopped' : 'Recording started');
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAudioFile(file);
//       toast.success('Audio file uploaded successfully');
//     }
//   };

//   const handleTranscribe = () => {
//     setTranscriptionStatus('processing');
//     toast.loading('Transcribing audio...');
//     // TODO: Implement actual transcription logic
//     setTimeout(() => {
//       setTranscriptionStatus('completed');
//       toast.success('Transcription completed');
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.h1
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           className="text-3xl font-bold text-gray-900 mb-8"
//         >
//           Audio Management
//         </motion.h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6"
//           >
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Record Audio</h2>
//             <div className="flex flex-col items-center space-y-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleRecord}
//                 className={`w-16 h-16 rounded-full flex items-center justify-center ${
//                   isRecording ? 'bg-red-600' : 'bg-indigo-600'
//                 } text-white`}
//               >
//                 {isRecording ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
//               </motion.button>
//               <p className="text-sm text-gray-600">
//                 {isRecording ? 'Recording in progress...' : 'Click to start recording'}
//               </p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white rounded-xl shadow-lg p-6"
//           >
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Audio</h2>
//             <div className="flex flex-col items-center space-y-4">
//               <label className="w-full">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
//                 >
//                   <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">Click to upload audio file</p>
//                   <p className="text-xs text-gray-500">MP3 or WAV format</p>
//                 </motion.div>
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//               </label>
//               {audioFile && (
//                 <p className="text-sm text-gray-600">
//                   File: {audioFile.name}
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-8 bg-white rounded-xl shadow-lg p-6"
//         >
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcription</h2>
//           <div className="space-y-4">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleTranscribe}
//               disabled={!audioFile && !isRecording}
//               className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
//             >
//               <FileText className="w-5 h-5 mr-2" />
//               Transcribe Audio
//             </motion.button>
//             {transcriptionStatus === 'completed' && (
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600">
//                   Transcription completed. The text is ready for EHR generation.
//                 </p>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AudioManagement;

// import React, { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Mic, Upload, Pause, FileText, Loader2, User } from 'lucide-react';
// import toast from 'react-hot-toast';

// interface AudioManagementProps {}

// const AudioManagement: React.FC<AudioManagementProps> = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioFile, setAudioFile] = useState<File | null>(null);
//   const [transcriptionStatus, setTranscriptionStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
//   const [transcriptionText, setTranscriptionText] = useState<string>('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [patientId, setPatientId] = useState<string>('12345');

//   // For recording functionality
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         const file = new File([audioBlob], "recorded-audio.wav", { type: 'audio/wav' });
//         setAudioFile(file);
//         toast.success('Recording saved successfully');
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//       toast.success('Recording started');
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//       toast.error('Could not access microphone');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);

//       // Stop all audio tracks
//       mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
//     }
//   };

//   const handleRecord = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       if (file.type.includes('audio/')) {
//         setAudioFile(file);
//         toast.success('Audio file uploaded successfully');
//       } else {
//         toast.error('Please upload an audio file');
//       }
//     }
//   };

//   const handleTranscribe = async () => {
//     if (!audioFile) {
//       toast.error('Please upload or record an audio file first');
//       return;
//     }

//     if (!patientId.trim()) {
//       toast.error('Please enter a valid Patient ID');
//       return;
//     }

//     setTranscriptionStatus('processing');
//     setIsUploading(true);

//     const toastId = toast.loading('Uploading and transcribing audio...');

//     try {
//       const formData = new FormData();
//       formData.append('file', audioFile);
//       formData.append('patient_id', patientId);

//       const response = await fetch('http://20.244.9.179/audio/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data) {
//         setTranscriptionStatus('completed');
//         setTranscriptionText(data.text || 'Transcription completed successfully.');
//         toast.success('Transcription completed', { id: toastId });
//       } else {
//         throw new Error('No data received from transcription service');
//       }
//     } catch (error) {
//       console.error('Transcription error:', error);
//       setTranscriptionStatus('error');
//       toast.error('Failed to transcribe audio', { id: toastId });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.h1
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           className="text-3xl font-bold text-gray-900 mb-8"
//         >
//           Audio Management
//         </motion.h1>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="bg-white rounded-xl shadow-lg p-6 mb-8"
//         >
//           <div className="flex items-center gap-2 mb-2">
//             <User className="w-5 h-5 text-indigo-600" />
//             <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
//                 Patient ID
//               </label>
//               <input
//                 type="text"
//                 id="patientId"
//                 value={patientId}
//                 onChange={(e) => setPatientId(e.target.value)}
//                 placeholder="Enter patient ID"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6"
//           >
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Record Audio</h2>
//             <div className="flex flex-col items-center space-y-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleRecord}
//                 className={`w-16 h-16 rounded-full flex items-center justify-center ${
//                   isRecording ? 'bg-red-600' : 'bg-indigo-600'
//                 } text-white`}
//               >
//                 {isRecording ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
//               </motion.button>
//               <p className="text-sm text-gray-600">
//                 {isRecording ? 'Recording in progress...' : 'Click to start recording'}
//               </p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white rounded-xl shadow-lg p-6"
//           >
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Audio</h2>
//             <div className="flex flex-col items-center space-y-4">
//               <label className="w-full">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
//                 >
//                   <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">Click to upload audio file</p>
//                   <p className="text-xs text-gray-500">MP3 or WAV format</p>
//                 </motion.div>
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//               </label>
//               {audioFile && (
//                 <p className="text-sm text-gray-600">
//                   File: {audioFile.name}
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-8 bg-white rounded-xl shadow-lg p-6"
//         >
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcription</h2>
//           <div className="space-y-4">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleTranscribe}
//               disabled={!audioFile || isUploading || !patientId.trim()}
//               className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
//             >
//               {isUploading ? (
//                 <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//               ) : (
//                 <FileText className="w-5 h-5 mr-2" />
//               )}
//               {isUploading ? 'Processing...' : 'Transcribe Audio'}
//             </motion.button>

//             {transcriptionStatus === 'completed' && (
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <h3 className="text-md font-medium text-gray-900 mb-2">Transcription Result:</h3>
//                 <p className="text-sm text-gray-600 whitespace-pre-wrap">
//                   {transcriptionText || 'Transcription completed. The text is ready for EHR generation.'}
//                 </p>
//               </div>
//             )}

//             {transcriptionStatus === 'error' && (
//               <div className="p-4 bg-red-50 rounded-lg">
//                 <p className="text-sm text-red-600">
//                   An error occurred during transcription. Please try again.
//                 </p>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AudioManagement;

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Upload,
  Pause,
  FileText,
  Loader2,
  User,
  FileAudio,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

interface AudioFile {
  id: number;
  filename: string;
  url: string;
}

interface PatientData {
  patient: string;
  audio_files: AudioFile[];
}

interface AudioManagementProps {}

const AudioManagement: React.FC<AudioManagementProps> = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcriptionStatus, setTranscriptionStatus] = useState<
    "idle" | "processing" | "completed" | "error"
  >("idle");
  const [transcriptionText, setTranscriptionText] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [patientId, setPatientId] = useState<string>("12345");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [isFetchingFiles, setIsFetchingFiles] = useState(false);
  const [isFetchingTranscription, setIsFetchingTranscription] = useState(false);
  const [isGeneratingEHR, setIsGeneratingEHR] = useState(false);
  const [generatedEHR, setGeneratedEHR] = useState("");

  // For recording functionality
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const file = new File([audioBlob], "recorded-audio.wav", {
          type: "audio/wav",
        });
        setAudioFile(file);
        toast.success("Recording saved successfully");
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all audio tracks
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes("audio/")) {
        setAudioFile(file);
        toast.success("Audio file uploaded successfully");
      } else {
        toast.error("Please upload an audio file");
      }
    }
  };

  const fetchAudioFiles = async () => {
    if (!patientId.trim()) {
      toast.error("Please enter a valid Patient ID");
      return;
    }

    setIsFetchingFiles(true);
    const toastId = toast.loading("Fetching audio files...");

    try {
      const response = await fetch(
        `http://20.244.9.179/audio/files/${patientId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPatientData(data);
      toast.success("Audio files fetched successfully", { id: toastId });
    } catch (error) {
      console.error("Error fetching audio files:", error);
      toast.error("Failed to fetch audio files", { id: toastId });
    } finally {
      setIsFetchingFiles(false);
    }
  };

  const fetchTranscription = async (audioId: number) => {
    setIsFetchingTranscription(true);
    setTranscriptionStatus("processing");
    const toastId = toast.loading("Fetching transcription...");

    try {
      const response = await fetch(
        `http://20.244.9.179/audio/transcribe/${audioId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTranscriptionStatus("completed");
      setTranscriptionText(
        data.transcription || "Transcription fetched successfully."
      );
      toast.success("Transcription fetched successfully", { id: toastId });
    } catch (error) {
      console.error("Error fetching transcription:", error);
      setTranscriptionStatus("error");
      toast.error("Failed to fetch transcription", { id: toastId });
    } finally {
      setIsFetchingTranscription(false);
    }
  };

  const handleTranscribe = async () => {
    if (!audioFile) {
      toast.error("Please upload or record an audio file first");
      return;
    }

    if (!patientId.trim()) {
      toast.error("Please enter a valid Patient ID");
      return;
    }

    setTranscriptionStatus("processing");
    setIsUploading(true);

    const toastId = toast.loading("Uploading and transcribing audio...");

    try {
      const formData = new FormData();
      formData.append("file", audioFile);
      // formData.append('patient_id', patientId);

      const response = await fetch(
        `http://20.244.9.179/audio/upload?patient_id=${encodeURIComponent(
          patientId
        )}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // After successful upload, fetch the audio files to get the ID
      await fetchAudioFiles();

      toast.success("Audio uploaded successfully", { id: toastId });

      // If we have audio files, get the transcription for the most recent one
      if (patientData && patientData.audio_files.length > 0) {
        const latestAudioFile =
          patientData.audio_files[patientData.audio_files.length - 1];
        await fetchTranscription(latestAudioFile.id);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setTranscriptionStatus("error");
      toast.error("Failed to upload audio", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const generateEHR = async () => {
    if (!patientId) {
      alert("Please enter a patient ID");
      return;
    }
    setIsGeneratingEHR(true);
    try {
      await fetch(
        `http://20.244.9.179/llm/generate?patient_id=${encodeURIComponent(
          patientId
        )}`,
        {
          method: "POST",
        }
      );
      alert("EHR generation request sent successfully!");
    } catch (error) {
      console.error("Error generating EHR:", error);
      alert("Failed to generate EHR");
    }
    setIsGeneratingEHR(false);
  };

  // const fetchGeneratedEHR = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://20.244.9.179/llm/generate/${encodeURIComponent(patientId)}`
  //   );
  //     const data = await response.json();
  //     console.log(data);
  //     setGeneratedEHR(data.Generated_EHR || "No EHR generated");
  //     console.log({ generatedEHR });
  //   } catch (error) {
  //     console.error("Error fetching generated EHR:", error);
  //   }
  // };

  const fetchGeneratedEHR = async () => {
    if (!patientId) {
      alert("Please enter a patient ID");
      return;
    }

    try {
      const response = await fetch(
        `http://20.244.9.179/llm/generate/${encodeURIComponent(patientId)}`
      );
      const data = await response.json();

      if (data.length > 0 && data[0].Generated_EHR) {
        setGeneratedEHR(JSON.stringify(data[0].Generated_EHR, null, 2)); // Convert JSON to formatted string
      } else {
        setGeneratedEHR("No EHR generated");
      }
    } catch (error) {
      console.error("Error fetching generated EHR:", error);
      setGeneratedEHR("Failed to fetch EHR");
    }
  };

  const handleGenerateEHRClick = async () => {
    await generateEHR();
    fetchGeneratedEHR();
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

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Patient Information
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="patientId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Patient ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="Enter patient ID"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={fetchAudioFiles}
                  disabled={isFetchingFiles || !patientId.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                >
                  {isFetchingFiles ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileAudio className="w-4 h-4" />
                  )}
                  Fetch Files
                </button>
              </div>
            </div>
          </div>

          {patientData && (
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-900 mb-2">
                Patient: {patientData.patient}
              </h3>
              {patientData.audio_files.length > 0 ? (
                <div className="mt-2 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Audio Files:
                  </h4>
                  <div className="max-h-40 overflow-y-auto">
                    {patientData.audio_files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3 bg-gray-50 rounded-md mb-2 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {file.filename}
                          </p>
                          <p className="text-xs text-gray-500">ID: {file.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => fetchTranscription(file.id)}
                            className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                            title="Transcribe"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  No audio files found for this patient.
                </p>
              )}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Record Audio
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecord}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isRecording ? "bg-red-600" : "bg-indigo-600"
                } text-white`}
              >
                {isRecording ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </motion.button>
              <p className="text-sm text-gray-600">
                {isRecording
                  ? "Recording in progress..."
                  : "Click to start recording"}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Audio
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <label className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload audio file
                  </p>
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
                <p className="text-sm text-gray-600">File: {audioFile.name}</p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Transcription
          </h2>
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTranscribe}
              disabled={
                !audioFile ||
                isUploading ||
                !patientId.trim() ||
                isFetchingTranscription
              }
              className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              {isUploading || isFetchingTranscription ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <FileText className="w-5 h-5 mr-2" />
              )}
              {isUploading
                ? "Uploading..."
                : isFetchingTranscription
                ? "Fetching Transcription..."
                : "Upload & Transcribe Audio"}
            </motion.button>

            {transcriptionStatus === "completed" && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  Transcription Result:
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {transcriptionText ||
                    "Transcription completed. The text is ready for EHR generation."}
                </p>
              </div>
            )}

            {transcriptionStatus === "error" && (
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600">
                  An error occurred during transcription. Please try again.
                </p>
              </div>
            )}
          </div>
        </motion.div>
        <div>
          <button onClick={handleGenerateEHRClick} disabled={isGeneratingEHR}>
            {isGeneratingEHR ? "Generating EHR..." : "Generate EHR"}
          </button>
          {/* {generatedEHR && (
            <div>
              <h3>Generated EHR:</h3>
              <pre>{generatedEHR}</pre>
            </div>
          )} */}
          {generatedEHR && (
            <div>
              <h3>Generated EHR:</h3>
              <div>
                {Object.entries(JSON.parse(generatedEHR)).map(
                  ([key, value]) => (
                    <div key={key} style={{ marginBottom: "10px" }}>
                      <strong style={{ fontSize: "18px", display: "block" }}>
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                        :
                      </strong>
                      {typeof value === "object" ? (
                        value instanceof Array ? (
                          <ul style={{ paddingLeft: "20px", margin: 0 }}>
                            {value.map((item, index) => (
                              <li key={index} style={{ fontSize: "14px" }}>
                                {Object.entries(item).map(
                                  ([subKey, subValue]) => (
                                    <div key={subKey}>
                                      <strong style={{ fontSize: "16px" }}>
                                        {subKey
                                          .replace(/_/g, " ")
                                          .replace(/\b\w/g, (char) =>
                                            char.toUpperCase()
                                          )}
                                        :
                                      </strong>{" "}
                                      {subValue}
                                    </div>
                                  )
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          Object.entries(value).map(([subKey, subValue]) => (
                            <div
                              key={subKey}
                              style={{ fontSize: "14px", marginLeft: "20px" }}
                            >
                              <strong style={{ fontSize: "16px" }}>
                                {subKey
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                                :
                              </strong>{" "}
                              {subValue}
                            </div>
                          ))
                        )
                      ) : (
                        <p style={{ fontSize: "14px", margin: 0 }}>{value}</p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioManagement;
