import React, { useState, useEffect, useRef } from 'react';
import { Unit, VocabWord, FeedbackResponse } from '../types';
import { X, Volume2, Mic, CheckCircle, AlertCircle, RotateCcw, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import { getSpeakingFeedback, generateMoreExamples } from '../services/geminiService';

interface PracticeModeProps {
  unit: Unit;
  mode: 'vocab' | 'listening' | 'speaking' | 'grammar' | 'pronunciation';
  onExit: () => void;
  onScoreUpdate: (points: number) => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ unit, mode, onExit, onScoreUpdate }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [bonusAwarded, setBonusAwarded] = useState(false);
  
  // Vocab State
  const [isFlipped, setIsFlipped] = useState(false);
  const [extraExample, setExtraExample] = useState<string | null>(null);
  
  // Listening & Grammar Quiz State
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Speaking & Pronunciation State
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Reset state when step changes
    setIsFlipped(false);
    setExtraExample(null);
    setTranscript('');
    setFeedback(null);
    
    // Auto-fetch extra content via Gemini for vocab
    if (mode === 'vocab' && !completed) {
      const word = unit.vocab[step];
      generateMoreExamples(word.word, unit.topic).then(examples => {
        if (examples.length > 0) setExtraExample(examples[0]);
      });
    }

    // Award bonus on completion only once
    if (completed && !bonusAwarded) {
        onScoreUpdate(50); // Completion bonus
        setBonusAwarded(true);
    }
  }, [step, mode, unit, completed]);

  // Audio Playback
  const playAudio = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    if (mode === 'listening') {
        setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Recording Logic
  const toggleRecording = (targetSentence: string) => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      // Browser support check
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Your browser does not support Speech Recognition. Please use Chrome.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      
      recognition.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsRecording(false);
        
        // Call Gemini for Feedback
        setLoadingFeedback(true);
        const result = await getSpeakingFeedback(targetSentence, text);
        setFeedback(result);
        
        // Scoring for speaking
        if (result.score === 'Excellent') onScoreUpdate(10);
        else if (result.score === 'Good') onScoreUpdate(5);

        setLoadingFeedback(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const handleNext = () => {
    let maxSteps = 0;
    if (mode === 'vocab') maxSteps = unit.vocab.length;
    if (mode === 'speaking') maxSteps = unit.speaking.length;
    if (mode === 'pronunciation') maxSteps = unit.pronunciation ? unit.pronunciation.words.length : 0;
    
    // For listening and grammar, we just have one "step" which is the exercise page
    if (mode === 'listening' || mode === 'grammar') {
      setCompleted(true);
      return;
    }

    if (step < maxSteps - 1) {
      setStep(s => s + 1);
    } else {
      setCompleted(true);
    }
  };

  // Handle Quiz Submission (Listening/Grammar)
  const handleSubmitQuiz = (questions: any[]) => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correctAnswer) {
            correctCount++;
            onScoreUpdate(10); // 10 points per correct answer
        }
    });
    setSubmitted(true);
  };

  // --- RENDERERS ---

  const renderVocab = () => {
    const word = unit.vocab[step];
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-full max-w-sm aspect-[4/5] perspective-1000">
          <div 
            className={`relative w-full h-full duration-500 transform-style-3d cursor-pointer transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border-2 border-indigo-100 p-8 flex flex-col items-center justify-between">
               <img src={word.image} alt={word.word} className="w-48 h-48 object-cover rounded-xl mb-4 shadow-sm" />
               <div className="text-center">
                 <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">{word.word}</h2>
                 <p className="text-xl text-gray-500 font-mono">{word.pronunciation}</p>
                 <button 
                  onClick={(e) => { e.stopPropagation(); playAudio(word.word); }}
                  className="mt-6 w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition"
                >
                  <Volume2 size={28} />
                </button>
               </div>
               <p className="text-sm text-gray-400">Tap to flip</p>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-white rotate-y-180">
              <h3 className="text-2xl font-bold mb-6">{word.meaning}</h3>
              <div className="bg-white/10 p-4 rounded-xl w-full">
                <p className="italic text-lg mb-2">"{word.example}"</p>
                {extraExample && <p className="text-sm opacity-80 mt-2 border-t border-white/20 pt-2">✨ {extraExample}</p>}
              </div>
               <button 
                  onClick={(e) => { e.stopPropagation(); playAudio(word.example); }}
                  className="mt-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                  <Volume2 size={24} />
                </button>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-sm mt-6 flex justify-between items-center">
            <span className="text-gray-500 font-bold">{step + 1} / {unit.vocab.length}</span>
            <button 
                onClick={handleNext}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition"
            >
                Next Word
            </button>
        </div>
      </div>
    );
  };

  const renderListening = () => {
    const exercise = unit.listening;
    
    return (
      <div className="flex flex-col h-full p-4 max-w-2xl mx-auto w-full">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{exercise.title}</h2>
            <div className="flex items-center gap-4 mb-4">
                <button 
                    onClick={() => playAudio(exercise.transcript)}
                    disabled={isPlaying}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition ${isPlaying ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {isPlaying ? <span className="animate-pulse">Playing...</span> : <><Volume2 size={20} /> Listen</>}
                </button>
                <button 
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="text-blue-600 text-sm font-bold underline"
                >
                    {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                </button>
            </div>
            {showTranscript && (
                <div className="p-4 bg-blue-50 text-blue-900 rounded-xl text-sm leading-relaxed animate-fade-in">
                    {exercise.transcript}
                </div>
            )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
            {exercise.questions.map((q, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-800 mb-3">{idx + 1}. {q.question}</p>
                    <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                            let itemClass = 'border-gray-100 hover:bg-gray-50';
                            if (quizAnswers[idx] === optIdx) {
                                itemClass = 'bg-blue-100 border-blue-500 text-blue-900 font-medium';
                            }
                            if (submitted) {
                                if (optIdx === q.correctAnswer) itemClass = 'bg-green-100 border-green-500 text-green-800';
                                else if (quizAnswers[idx] === optIdx && optIdx !== q.correctAnswer) itemClass = 'bg-red-100 border-red-500 text-red-800';
                            }

                            return (
                                <button
                                    key={optIdx}
                                    disabled={submitted}
                                    onClick={() => {
                                        const newAnswers = [...quizAnswers];
                                        newAnswers[idx] = optIdx;
                                        setQuizAnswers(newAnswers);
                                    }}
                                    className={`w-full text-left p-3 rounded-lg border transition ${itemClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-4 pb-6">
             {!submitted ? (
                <button 
                    onClick={() => handleSubmitQuiz(exercise.questions)}
                    disabled={quizAnswers.length !== exercise.questions.length}
                    className="w-full bg-blue-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold shadow-md"
                >
                    Submit Answers
                </button>
             ) : (
                <button 
                    onClick={handleNext}
                    className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-md"
                >
                    Finish
                </button>
             )}
        </div>
      </div>
    );
  };

  const renderGrammar = () => {
    const exercise = unit.grammar;
    if (!exercise) return null;

    return (
      <div className="flex flex-col h-full p-4 max-w-2xl mx-auto w-full">
        {/* Rule Card */}
        <div className="bg-teal-50 border border-teal-100 p-6 rounded-2xl shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-2 text-teal-700">
                <BookOpen size={20} />
                <h2 className="text-xl font-bold">{exercise.topic}</h2>
            </div>
            <div className="prose text-gray-700 text-sm whitespace-pre-line">
                {exercise.rule}
            </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
            {exercise.questions.map((q, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-800 mb-3">{idx + 1}. {q.question}</p>
                    <div className="flex flex-wrap gap-2">
                        {q.options.map((opt, optIdx) => {
                             let itemClass = 'border-gray-200 hover:bg-gray-50 text-gray-600';
                             if (quizAnswers[idx] === optIdx) {
                                 itemClass = 'bg-teal-100 border-teal-500 text-teal-900';
                             }
                             if (submitted) {
                                 if (optIdx === q.correctAnswer) itemClass = 'bg-green-100 border-green-500 text-green-800';
                                 else if (quizAnswers[idx] === optIdx && optIdx !== q.correctAnswer) itemClass = 'bg-red-100 border-red-500 text-red-800';
                             }

                            return (
                                <button
                                    key={optIdx}
                                    disabled={submitted}
                                    onClick={() => {
                                        const newAnswers = [...quizAnswers];
                                        newAnswers[idx] = optIdx;
                                        setQuizAnswers(newAnswers);
                                    }}
                                    className={`px-4 py-2 rounded-lg border font-medium transition ${itemClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-4 pb-6">
            {!submitted ? (
                <button 
                    onClick={() => handleSubmitQuiz(exercise.questions)}
                    disabled={quizAnswers.length !== exercise.questions.length}
                    className="w-full bg-teal-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold shadow-md hover:bg-teal-700 transition"
                >
                    Check Answers
                </button>
            ) : (
                <button 
                    onClick={handleNext}
                    className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-md"
                >
                    Finish
                </button>
            )}
        </div>
      </div>
    );
  };

  const renderPronunciation = () => {
    const exercise = unit.pronunciation;
    if (!exercise) return null;
    const wordData = exercise.words[step];

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 max-w-lg mx-auto w-full">
            {/* Rule Hint */}
            <div className="bg-pink-50 border border-pink-100 p-4 rounded-xl text-center mb-8 w-full">
                <div className="flex items-center justify-center gap-2 text-pink-700 mb-1 font-bold">
                    <Lightbulb size={18} />
                    <span>Rule</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-line">{exercise.rule}</p>
            </div>

            {/* Word Display */}
            <div className="text-center mb-8">
                <div className="flex justify-center items-end gap-1 mb-4">
                    {wordData.syllables.map((syl, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className={`text-3xl md:text-5xl transition-all ${
                                i === wordData.stressIndex ? 'font-black text-pink-600 -translate-y-2' : 'font-medium text-gray-400'
                            }`}>
                                {syl}
                            </span>
                            <div className={`w-2 h-2 rounded-full mt-2 ${i === wordData.stressIndex ? 'bg-pink-600' : 'bg-transparent'}`} />
                        </div>
                    ))}
                </div>
                <h3 className="text-xl text-gray-800 font-bold capitalize">{wordData.word}</h3>
            </div>

            <button 
                onClick={() => playAudio(wordData.word)} 
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold transition mb-8"
            >
                <Volume2 size={20} /> Listen Pattern
            </button>

            {/* Speaking/Check */}
            <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <p className="text-gray-500 text-sm mb-4">Now you try! Emphasize the stressed syllable.</p>
                
                 {/* Visualizer Placeholder */}
                <div className="w-full h-20 bg-gray-50 rounded-xl flex items-center justify-center mb-4 border border-gray-100 relative overflow-hidden">
                    {isRecording && (
                        <div className="absolute inset-0 flex items-center justify-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-2 bg-pink-500 rounded-full animate-bounce" style={{ height: '40%', animationDelay: `${i * 0.1}s` }}></div>
                            ))}
                        </div>
                    )}
                    {!isRecording && !transcript && <span className="text-gray-400 text-xs">Tap mic & speak</span>}
                    {!isRecording && transcript && <span className="text-gray-800 font-bold px-4 text-center">"{transcript}"</span>}
                </div>

                {!feedback ? (
                    <button 
                        onClick={() => toggleRecording(wordData.word)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all transform ${
                            isRecording ? 'bg-red-500 scale-110' : 'bg-pink-600 hover:scale-105'
                        }`}
                    >
                        <Mic className="text-white" size={28} />
                    </button>
                ) : (
                    <div className="w-full animate-fade-in">
                        <div className={`p-3 rounded-lg mb-3 flex items-center justify-between ${
                            feedback.score === 'Excellent' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                        }`}>
                            <span className="font-bold">{feedback.score}</span>
                            <span className="text-sm">{feedback.feedback}</span>
                        </div>
                         <div className="flex gap-2 w-full">
                            <button 
                                onClick={() => { setFeedback(null); setTranscript(''); }}
                                className="flex-1 py-2 rounded-lg border border-gray-200 font-bold text-gray-600 text-sm"
                            >
                                Retry
                            </button>
                            <button 
                                onClick={handleNext}
                                className="flex-1 py-2 rounded-lg bg-pink-600 text-white font-bold text-sm shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                
                {loadingFeedback && <span className="text-xs text-pink-500 animate-pulse mt-2">Analyzing stress...</span>}
            </div>
        </div>
    );
  };

  const renderSpeaking = () => {
    const challenge = unit.speaking[step];
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 max-w-lg mx-auto w-full">
         <div className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
            Situation: {challenge.context}
         </div>
         
         <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4">
                "{challenge.sentence}"
            </h2>
            <button onClick={() => playAudio(challenge.sentence)} className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-800">
                <Volume2 size={18} /> Hear it
            </button>
         </div>

         {/* Visualizer Placeholder */}
         <div className="w-full h-32 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 relative overflow-hidden">
            {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 bg-purple-500 rounded-full animate-bounce" style={{ height: '40%', animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            )}
            {!isRecording && !transcript && <span className="text-gray-400">Tap microphone to start</span>}
            {!isRecording && transcript && <span className="text-gray-800 font-medium px-4 text-center">"{transcript}"</span>}
         </div>

         {/* Controls */}
         <div className="flex flex-col items-center gap-4 w-full">
            {!feedback && (
                <button 
                    onClick={() => toggleRecording(challenge.sentence)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform ${
                        isRecording ? 'bg-red-500 scale-110' : 'bg-purple-600 hover:scale-105'
                    }`}
                >
                    <Mic className="text-white" size={32} />
                </button>
            )}

            {loadingFeedback && <div className="text-purple-600 font-bold animate-pulse">AI Judge is listening...</div>}

            {feedback && (
                <div className={`w-full p-4 rounded-xl border-l-4 ${
                    feedback.score === 'Excellent' ? 'bg-green-50 border-green-500' :
                    feedback.score === 'Good' ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'
                } animate-fade-in`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg">{feedback.score}</span>
                        {feedback.score === 'Excellent' ? <CheckCircle className="text-green-500"/> : <AlertCircle className="text-yellow-500"/>}
                    </div>
                    <p className="text-gray-700 text-sm">{feedback.feedback}</p>
                    {feedback.correctedPronunciation && (
                         <div className="mt-2 text-xs text-gray-500">
                            Tip: {feedback.correctedPronunciation}
                         </div>
                    )}
                </div>
            )}
            
            {feedback && (
                <div className="flex gap-4 w-full mt-2">
                    <button 
                        onClick={() => { setFeedback(null); setTranscript(''); }}
                        className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600"
                    >
                        Retry
                    </button>
                    <button 
                        onClick={handleNext}
                        className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-md"
                    >
                        Next <ArrowRight size={18} className="inline ml-1" />
                    </button>
                </div>
            )}
         </div>
      </div>
    );
  };

  const renderCompleted = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
        <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-6xl shadow-lg">
            🏆
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Lesson Complete!</h2>
        <p className="text-gray-500 mb-8">You've earned +50 XP and mastered new skills.</p>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <span className="block text-gray-400 text-xs uppercase font-bold">XP Gained</span>
                <span className="text-2xl font-bold text-green-600">+50</span>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <span className="block text-gray-400 text-xs uppercase font-bold">Accuracy</span>
                <span className="text-2xl font-bold text-blue-600">100%</span>
             </div>
        </div>

        <button 
            onClick={onExit}
            className="w-full max-w-sm bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition"
        >
            Continue Learning
        </button>
    </div>
  );

  const getProgressPercentage = () => {
      if (completed) return 100;
      let total = 0;
      if (mode === 'vocab') total = unit.vocab.length;
      else if (mode === 'speaking') total = unit.speaking.length;
      else if (mode === 'pronunciation' && unit.pronunciation) total = unit.pronunciation.words.length;
      else return 50; // listening and grammar are one-page
      return ((step + 1) / total) * 100;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-4 bg-white">
        <button onClick={onExit} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-500" />
        </button>
        <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
             <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
             />
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {completed ? renderCompleted() : (
            mode === 'vocab' ? renderVocab() : 
            mode === 'listening' ? renderListening() :
            mode === 'grammar' ? renderGrammar() :
            mode === 'pronunciation' ? renderPronunciation() :
            renderSpeaking()
        )}
      </div>
    </div>
  );
};