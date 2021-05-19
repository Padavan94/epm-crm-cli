const {messages} = require('./constants');
const files = require('./files');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const questions = [
    {
        name: 'whatToDo',
        type: 'list',
        message: messages.WHAT_YOU_WANT_TO_DO,
        choices: [
            messages.GENERATE_ENTITY
        ],
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return chalk.red(messages.PLEASE_MAKE_CHOICE);
            }
        }
    },
    {
        name: 'entity',
        type: 'input',
        message: messages.ENTER_ENTITY_NAME,
        when: (answers) => answers.whatToDo === messages.GENERATE_ENTITY,
        validate: function (value) {
            const isAlreadyExist = files.directoryExists(value);

            if (isAlreadyExist) return chalk.red(messages.ENTITY_ALREADY_EXIST);

            if (value.length) {
                return true;
            } else {
                return chalk.red(messages.ENTITY_NAME_IS_REQUIRED);
            }
        }
    }
]

module.exports = {
    run: async () => {
        const {entity} = await inquirer.prompt(questions);

        files.generateFolderStructure(entity)
    }
}