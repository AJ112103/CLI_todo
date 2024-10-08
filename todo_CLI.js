const { Command } = require('commander')
const program = new Command();
const fs = require('fs')

const filepath = '/Users/dhruvjalan/Desktop/WebDev/week4-node/commander.js/todos.json'

function loadTodos(){
    try{
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data)
    } catch(err) {
        return []
    }
}

function saveTodos(){
    fs.writeFileSync(filepath, JSON.stringify(todos, null, 2))
}

let todos = loadTodos();

program
    .name('todo')
    .description('simple todo application in CLI')
    .version('1.0.0')

program.command('add-todo')
    .description('add todo task')
    .argument('<task>', 'task to be added')
    .action((str) => {
        todos.push(str);
        saveTodos(todos);
        console.log(todos);
    })


program.command('remove-todo')
    .description('remove todo task')
    .argument('<task>', 'task in todos to be removed')
    .action((str) => {
        todos = todos.filter(task => task !== str);
        saveTodos(todos);
        console.log(todos);
    })

program.command('update-todo')
    .description('update task')
    .argument('<oldTask>', 'task to be changed')
    .argument('<newTask>', 'task to be added')
    .action((str, str1) => {
        const index = todos.indexOf(str);
        if(index!== -1){
            todos[index] = str1
            saveTodos(todos);
            console.log(todos);
        } else {
            console.log(`The task "${str}" was not found in todos`)
        }
        
    })

program.parse();