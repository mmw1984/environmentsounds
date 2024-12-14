import React, { useState, useEffect, useRef } from 'react';

// Quiz questions based on the environment sounds
const quizQuestions = [
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/小溪聲.mp3',
    question: '這是什麼環境聲音？',
    options: [
      '小溪聲',
      '浪聲',
      '雨聲',
      '風聲'
    ],
    correctAnswer: '小溪聲'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/打雷聲.mp3',
    question: '這個聲音可能發生在什麼天氣情況下？',
    options: [
      '晴天',
      '颱風天',
      '雷雨天',
      '下雪天'
    ],
    correctAnswer: '雷雨天'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/救護車聲音香港.mp3',
    question: '這是哪個城市的救護車聲音？',
    options: [
      '北京',
      '上海',
      '香港',
      '台北'
    ],
    correctAnswer: '香港'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/敲打鍵盤.mp3',
    question: '這個聲音最可能來自哪裡？',
    options: [
      '廚房',
      '辦公室',
      '街道',
      '學校'
    ],
    correctAnswer: '辦公室'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/步行聲.mp3',
    question: '這個聲音描述了什麼動作？',
    options: [
      '跑步',
      '步行',
      '騎腳踏車',
      '爬樓梯'
    ],
    correctAnswer: '步行'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/炸彈爆炸.mp3',
    question: '這是什麼危險的聲音？',
    options: [
      '雷聲',
      '煙火',
      '炸彈爆炸',
      '汽車爆胎'
    ],
    correctAnswer: '炸彈爆炸'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/硬幣跌落.mp3',
    question: '這是什麼物品掉落的聲音？',
    options: [
      '鑰匙',
      '硬幣',
      '手機',
      '筆'
    ],
    correctAnswer: '硬幣'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/雨聲.mp3',
    question: '這是什麼天氣的聲音？',
    options: [
      '颱風',
      '雨天',
      '雷雨',
      '下雪'
    ],
    correctAnswer: '雨天'
  },
  {
    sound: 'https://github.com/mmw1984/environmentsounds/raw/refs/heads/gh-pages/風聲.mp3',
    question: '這是什麼自然現象的聲音？',
    options: [
      '海浪',
      '風',
      '河流',
      '樹葉'
    ],
    correctAnswer: '風'
  }
];

const EnvironmentSoundsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Play sound when question changes
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(error => console.log('Audio play failed:', error));
    }
  }, [currentQuestion]);

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
      
      {/* Audio Player */}
      <audio ref={audioRef} className="mb-4 w-full">
        <source src={currentQuizQuestion.sound} type="audio/mpeg" />
        您的瀏覽器不支持音頻元素。
      </audio>

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
