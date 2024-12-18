export const validateEquation = (equation) => {
  //regular expression to match valid equations
  const validRegex = /^[a-zA-Z0-9+\-*/^().\s_]+$/;

  if (validRegex.test(equation)) {
    return true;
  } else {
    return false;
  }
};

function evaluateExpression(equation, variableName, value) {
  const sanitizedEquation = equation.replace(/\^/g, "**");
  const validPattern = /^[-+*/^0-9x().\s]*$/;
  const operatorPattern = /[+\-*/^]$/;

  if (!validPattern.test(sanitizedEquation)) return false;
  if (operatorPattern.test(sanitizedEquation.trim())) return false;

  if (!validateEquation(sanitizedEquation)) {
    return null;
  }

  try {
    const func = new Function(variableName, `return ${sanitizedEquation}`);
    return func(value);
  } catch (error) {
    console.error("Invalid equation:", error);
    return null;
  }
}

export const evaluateWorkflow = (config, input) => {
  return config.reduce((acc, curr) => {
    if (curr.equation) {
      acc = evaluateExpression(curr.equation, "x", acc);
    }
    return acc;
  }, input);
};
