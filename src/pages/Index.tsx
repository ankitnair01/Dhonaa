import React, { useState, useRef, useCallback } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import MusicControl from "@/components/MusicControl";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProposalScreen from "@/components/ProposalScreen";
import QuizScreen from "@/components/QuizScreen";
import ComplimentScreen from "@/components/ComplimentScreen";
import CatchGameScreen from "@/components/CatchGameScreen";
import TreasureHuntScreen from "@/components/TreasureHuntScreen";
import FinalScreen from "@/components/FinalScreen";

type Screen = "welcome" | "proposal" | "quiz" | "compliments" | "catch" | "treasure" | "final";

const Index: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [musicStarted, setMusicStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(() => {
    if (!audioRef.current) {
      // Using a placeholder — user can replace this URL with their own audio file
      audioRef.current = new Audio("/mySong.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
    }
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setMusicStarted(true);
    }).catch(() => {
      // Browser blocked autoplay — that's okay
      setMusicStarted(true);
    });
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const handleStart = () => {
    startMusic();
    setCurrentScreen("proposal");
  };

  return (
    <div className="min-h-screen bg-gradient-romantic heart-cursor relative overflow-hidden">
      <FloatingHearts />
      {musicStarted && <MusicControl isPlaying={isPlaying} onToggle={toggleMusic} />}

      {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === "proposal" && <ProposalScreen onNext={() => setCurrentScreen("quiz")} />}
      {currentScreen === "quiz" && <QuizScreen onComplete={() => setCurrentScreen("compliments")} />}
      {currentScreen === "compliments" && <ComplimentScreen onNext={() => setCurrentScreen("catch")} />}
      {currentScreen === "catch" && <CatchGameScreen onComplete={() => setCurrentScreen("treasure")} />}
      {currentScreen === "treasure" && <TreasureHuntScreen onNext={() => setCurrentScreen("final")} />}
      {currentScreen === "final" && <FinalScreen />}
    </div>
  );
};

export default Index;
