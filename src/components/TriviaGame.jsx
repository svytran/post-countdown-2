import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography, Button } from '@mui/material';
import QuestionCard from './QuestionCard';
import ScoreTracker from './ScoreTracker';
import { fetchQuestions } from '../services/triviaService';

function TriviaGame() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState({
    correct: 0,
    total: 0
  });

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const newQuestions = await fetchQuestions();
      setQuestions(newQuestions);
      setSelectedAnswers({});
      setFeedback({});
    } catch (error) {
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    if (!feedback[questionId]) {
      setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
      const correctAnswer = questions.find(q => q.id === questionId).correctAnswer;
      const isCorrect = answer === correctAnswer;
      setFeedback({ ...feedback, [questionId]: isCorrect });
      
      // Update running score
      setScore(prevScore => ({
        correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
        total: prevScore.total + 1
      }));
    }
  };

  const allQuestionsAnswered = questions.length > 0 && 
    questions.every(q => feedback[q.id] !== undefined);

  if (isLoading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Loading Questions...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Trivia Game
      </Typography>
      <ScoreTracker 
        correctAnswers={score.correct}
        totalAnswered={score.total}
      />
      {questions.map((question) => (
        <QuestionCard 
          key={question.id} 
          question={question} 
          onSelectAnswer={handleAnswerSelect} 
          selectedAnswer={selectedAnswers[question.id]} 
          feedback={feedback[question.id]} 
        />
      ))}
      {allQuestionsAnswered && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={loadQuestions}
          sx={{ 
            marginTop: 2,
            marginBottom: 4,
            padding: '12px 24px',
            fontSize: '1.1rem'
          }}
        >
          Get New Questions
        </Button>
      )}
    </Container>
  );
}

export default TriviaGame; 