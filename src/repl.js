const { prompt } = require('inquirer');
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');
const { parse } = require('@babel/core');

const ask = () => {
  const questions = [
    {
      name: 'COMMAND',
      type: 'input',
      message: chalk.blue('>>'),
    },
  ];
  return prompt(questions);
};

const repl = async () => {
  while (true) {
    const res = await ask();
    try {
      console.log(parseAndEvaluate(res.COMMAND));
    } catch (error) {
      console.error(error);
    }
  }
};

if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
