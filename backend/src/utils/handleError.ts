const handleError = (error: unknown, message: string) => {
  console.error(`${message}:`, error);
  throw error;
};

export default handleError;