import React from 'react';
import { Paper, Typography } from '@mui/material';

function ScoreTracker({ correctAnswers, totalAnswered }) {
  const percentage = totalAnswered > 0 
    ? Math.round((correctAnswers / totalAnswered) * 100) 
    : 0;

  return (
    <Paper 
      elevation={3}
      sx={{
        padding: 2,
        marginBottom: 3,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h6">
        Total Score: {correctAnswers} correct out of {totalAnswered} ({percentage}%)
      </Typography>
    </Paper>
  );
}

export default ScoreTracker; 