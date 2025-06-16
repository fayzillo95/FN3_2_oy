export const validationPipesConfig = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: false,
  validationError: {
    target: false,
    value: false,
  },
  exceptionFactory: (errors) => {
    return new Error(
      `Validation failed: ${errors.map((err) => err.toString()).join(', ')}`,
    );
  },
};
