const { traverse } = require('./traverse');

const visitor = {
  CallExpression: {
    enter({ node }) {
      if (specialForms[node.name]) {
        specialForms[node.name](node);
      }
    },
  },
};

const transform = (node) => {
  traverse(node, visitor);
  return node;
};

const specialForms = {
  define(node) {
    const [identifier, assignment] = node.arguments;
    node.type = 'VariableDeclaration';
    node.identifier = identifier;
    node.assignment = assignment;
    delete node.name;
    delete node.arguments;
  },
};

module.exports = { specialForms, transform };
