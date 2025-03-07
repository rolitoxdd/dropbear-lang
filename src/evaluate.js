const { environment } = require('./standard-library');
const last = (collection) => collection[collection.length - 1];

const apply = (node) => {
  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);
  if (typeof fn !== 'function') {
    throw new TypeError(`${node.name} is not a function`);
  }
  return fn(...args);
};

const getIdentifier = (node) => {
  if (environment[node.name]) {
    return environment[node.name];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

const define = (node) => {
  environment[node.identifier.name] = node.assignment.value;
};

const evaluate = (ast) => {
  if (ast.type === 'VariableDeclaration') {
    return define(ast);
  }
  if (ast.value) {
    return ast.value;
  }
  if (ast.type === 'Identifier') {
    return getIdentifier(ast);
  }
  if (ast.type === 'CallExpression') {
    return apply(ast);
  }
};

module.exports = { evaluate };
