const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('./inquirer');

(async function () {
    clear();

    console.log(
        chalk.green(
            figlet.textSync('epm-crm', {horizontalLayout: 'full'})
        )
    );

    await inquirer.run();

    console.log(chalk.green(process.cwd()))
})()