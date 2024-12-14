import React, { useState, useEffect, useRef } from 'react';

// (Keep the quizQuestions array the same as in your original code)

const EnvironmentSoundsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset audio when question changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentQuestion]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.log('Audio play failed:', error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    // Check if answer is correct
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or complete quiz
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">測驗結果</h2>
        <p className="text-xl mb-4">
          您的得分：{score} / {quizQuestions.length}
        </p>
        <button 
          onClick={restartQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          重新開始測驗
        </button>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">環境聲音測驗</h1>
      
      {/* Custom Audio Player */}
      <div className="mb-4 bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="bg-blue-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center"
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          {/* Volume Slider */}
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume}
            onChange={handleVolumeChange}
            className="flex-grow"
          />
        </div>

        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef} 
          src={currentQuizQuestion.sound}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* Question */}
      <div className="mb-4">
        <p className="text-lg font-semibold mb-2">{currentQuizQuestion.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {currentQuizQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full p-2 text-left border rounded 
              ${selectedAnswer === option 
                ? 'bg-blue-100 border-blue-500' 
                : 'bg-white hover:bg-gray-100'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className={`w-full mt-4 p-2 rounded 
          ${selectedAnswer 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {currentQuestion < quizQuestions.length - 1 ? '下一題' : '完成測驗'}
      </button>

      {/* Progress Indicator */}
      <div className="mt-4 text-center">
        題目 {currentQuestion + 1} / {quizQuestions.length}
      </div>
    </div>
  );
};

export default EnvironmentSoundsQuiz;
