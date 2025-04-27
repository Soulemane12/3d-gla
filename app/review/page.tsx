'use client';

import GlassesModel from '@/components/GlassesModel';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef } from 'react';

const steps = [
  "Introduction",
  "Scan Face",
  "Measurements",
  "Review",
];

export default function Review() {
  const [showTryOn, setShowTryOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const handleBackToDownload = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowTryOn(false);
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Frames Model Complete!</h1>
      
      {!showTryOn ? (
        <>
          <p className="text-center mb-4">Press the button below to begin downloading your frames.</p>
          <a href="https://cad.onshape.com/documents/2d31f5e10fa056c96e0a75c6/w/8fc670243965225a2baeaa59/e/6c046a925cf8e0f222c96fba" className="relative z-20">
            <Button 
              variant="outline"
              className="flex-1 py-4 text-lg border-gray-300 hover:bg-gray-50 h-12 m-5 rounded-lg shadow-md transition-colors"
            >
              Download My Frames
            </Button>
          </a>
          <Button 
            onClick={() => {
              setShowTryOn(true);
              startVideo();
            }}
            className="flex-1 py-4 text-lg bg-blue-600 text-white hover:bg-blue-700 h-12 m-5 rounded-lg shadow-md transition-colors"
          >
            Try it on
          </Button>
        </>
      ) : (
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg"
              style={{ transform: 'scaleX(-1)' }}
            />
            <div className="absolute top-0 left-0 w-full h-full">
              <Canvas camera={{ fov: 35, zoom: 8, near: 1, far: 1000 }}>
                <ambientLight intensity={0} />
                <GlassesModel />
              </Canvas>
            </div>
          </div>
          
          <Button 
            onClick={handleBackToDownload}
            className="w-full mt-4 py-4 text-lg bg-gray-600 text-white hover:bg-gray-700 rounded-lg shadow-md transition-colors"
          >
            Back to Download
          </Button>
        </div>
      )}

      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-10">
        <button className="rounded-full bg-black hover:bg-blue-600 transition-colors w-16 h-16 flex justify-center items-center shadow-lg" onClick={() => window.history.back()}>
          <ArrowLeft color="white" size={32} />
        </button>
      </div>

      <ProgressBar index={4} steps={steps}/>
    </main>
  );
}