import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import '../styles/QuestionCard.css';

function QuestionCard({ question, onSelectAnswer, selectedAnswer, feedback }) {
  const isAnswered = selectedAnswer !== undefined;

  const getButtonColor = (answer) => {
    if (!isAnswered) return '#1976d2';
    if (answer === question.correctAnswer) return 'green';
    if (answer === selectedAnswer) return 'red';
    return '#1976d2';
  };

  const getButtonHoverColor = (answer) => {
    if (!isAnswered) return '#1565c0';
    if (answer === question.correctAnswer) return 'darkgreen';
    if (answer === selectedAnswer) return 'darkred';
    return '#1565c0';
  };

  return (
    <Card sx={{ marginBottom: 3, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {question.question.text}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2 }}>
          {question.answers.map((answer) => (
            <Button
              key={answer}
              variant="contained"
              fullWidth
              onClick={() => onSelectAnswer(question.id, answer)}
              disabled={isAnswered}
              sx={{
                padding: '10px',
                backgroundColor: getButtonColor(answer),
                '&:hover': {
                  backgroundColor: getButtonHoverColor(answer)
                },
                '&.Mui-disabled': {
                  backgroundColor: getButtonColor(answer),
                  color: 'white',
                  opacity: 0.8
                }
              }}
            >
              {answer}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuestionCard; 