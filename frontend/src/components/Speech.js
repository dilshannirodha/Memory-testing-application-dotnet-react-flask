import React, { useState, useRef } from 'react';
import axios from 'axios';

const Speech = () => {
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null); 
  const chunks = useRef([]);  

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('Recording already in progress');
      return; // Prevent multiple recordings at the same time
    }

    setRecording(true);
    chunks.current = [];  // Reset chunks on start

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          chunks.current.push(e.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          console.log('Recording stopped and audioBlob created');
        };

        recorder.start();
        console.log('Recording started');
      })
      .catch(err => {
        console.error('Error accessing microphone', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log('Recording stopped');
    } else {
      console.log('No recording in progress or already stopped');
    }
  };

  const sendAudioToBackend = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');

    try {
      const response = await axios.post('http://localhost:5000/api/speech-to-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTranscript(response.data.transcript);
    } catch (error) {
      console.error('Error sending audio to backend', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Speech to Text</h1>
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={startRecording}
              disabled={recording}
              className={`px-6 py-3 text-white font-medium rounded-lg transition-colors ${recording ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              disabled={!recording}
              className={`px-6 py-3 text-white font-medium rounded-lg transition-colors ${!recording ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
            >
              Stop Recording
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={sendAudioToBackend}
              disabled={!audioBlob}
              className={`px-6 py-3 text-white font-medium rounded-lg transition-colors ${!audioBlob ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Send to Backend
            </button>
          </div>

          {transcript && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-600">Transcript:</h3>
              <p className="text-lg text-gray-700 mt-2">{transcript}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Speech;
