const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parenthesize = (tokens) => {
  const token = pop(tokens);
  if (isOpeningParenthesis(token.value)) {

    const expression = [];
    while (!isClosingParenthesis(peek(tokens).value)) {
      expression.push(parenthesize(tokens))
    }
    pop(tokens);
    return expression;
  }
  return token;
};

const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    const [firsToken, ...rest] = tokens;
    return {
      type: 'CallExpression',
      name: firsToken.value,
      arguments: rest.map((t) => parse(t)),
    };
  }
  const token = tokens;
  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }
  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }
  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }
};

module.exports = {
  parse: (tokens) => parse(parenthesize(tokens)),
  parenthesize,
};
