type ErrorResponse = {
  error: {
    message: string;
    stack?: string;
  };
};

export default ErrorResponse;
