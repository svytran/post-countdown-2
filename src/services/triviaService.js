const fetchQuestions = async (limit = 5) => {
  try {
    const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=${limit}`);
    const data = await response.json();
    return data.map(q => ({
      ...q,
      answers: [...q.incorrectAnswers, q.correctAnswer].sort(() => Math.random() - 0.5)
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export { fetchQuestions }; 