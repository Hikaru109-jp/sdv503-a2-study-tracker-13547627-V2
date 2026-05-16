import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let topic = "";
let duration = 0;
let sessions = [];
let totalDuration = 0;

async function tracker() {
    const topic = await ask ("Enter topics: ");
    const duration = await ask ("Enter times: ")
    const error = ValidateInput(topic, duration);
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
        return total + session.duration;
    }, 0);

    console.log(total);
}