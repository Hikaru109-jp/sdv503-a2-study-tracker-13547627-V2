import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

let topic = "";
let duration = 0;
let sessions = [];
let totalDuration = 0;

async function tracker() {
    const topic = await ask ("Enter topics: ");
    const duration = await ask ("Enter times: ")
    const error = validateInput(topic, duration);
        if(error) {
            console.log(error);
            return;
        }
    sessions.push({topic, duration});
}

const validateInput = (topic, duration) => {
    if(topic === ""){
        return "topic must be a string";
    } else if(isNaN(duration)) {
        return "duration must be a number";
    } else if(duration <= 0){
        return "duration must be greater than 0";
    }
        
}


const displaySessions = (sessions) => {
    sessions.forEach((session) => {
        console.log(session.topic, session.duration);
    })
}


const displayTotal = (sessions) => {
    const total = sessions.reduce((total, session) => {
        return total + Number(session.duration);
    }, 0);

    console.log(total);
}

async function exitWork() {
    const answer = await ask ("Are you sure to finish this work? ");
        if(answer === "yes"){
            process.exit();
        } else {
            return
        }
}


async function mainMenu() {
    while(true){
        const menu = await ask ("Enter Command: [add, list, total, exit]: ");
            if(menu === "add"){
               await tracker();
            } else if(menu === "list"){
                displaySessions(sessions);
            } else if(menu === "total"){
                displayTotal(sessions);
            } else {
                await exitWork();
            }
        }
}

mainMenu()