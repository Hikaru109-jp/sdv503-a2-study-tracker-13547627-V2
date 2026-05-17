import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//This function is for displaying a question from readline and waiting until user enters.
function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

let topic = "";
let duration = 0;
let sessions = [];
let totalDuration = 0;


//this function is for prompting the user to enter both "topic" and "duration" after selecting "add" in the first question.
async function tracker() { //uses async method for using await.
    const topic = await ask ("Enter topics: ");
    const duration = await ask ("Enter times: ")

    //this can validate the data for rejecting invalid data.
    const error = validateInput(topic, duration);
        if(error) {
            console.log(error);
            return;
        }
    sessions.push({topic, duration});
}


//This function is for validating whether the input is valid.
const validateInput = (topic, duration) => {
    if(topic.trim() === ""){ //empty or whitespace-only topics provide no useful information. Using trim() method, it allows to reject space only as well.
        return "topic must be a string";
    } else if(isNaN(duration)) { //rejects inputs like "Hikaru" to ensure only numbers are stored
        return "duration must be a number";
    } else if(duration <= 0){ //rejects inputs numbers under 1 because it absolutely must be greater than 0 when you study. 
        return "duration must be greater than 0";
    } else if(!Number.isInteger(duration)) { //rejects inputs like "2.4" because this system adopts integer.
        return "number must be integer";
    }
        
}


//This function is for listing the record you entered.
const displaySessions = (sessions) => {
    if(sessions.length === 0){
        console.log("No record");
    }
    sessions.forEach((session) => { //forEach method is for listing each topic and duration in a session.
        console.log(session.topic, session.duration);
    })

}


//This function is for displaying the total duration with calculating.
const displayTotal = (sessions) => {
    const total = sessions.reduce((total, session) => { //This code is for calculating the durations from start one by one.
        return total + Number(session.duration);
    }, 0);

    console.log(total); //This code is for displaying the calculated total.
}

async function exitWork() {
    const answer = await ask ("Are you sure to finish this work? ");
        if(answer === "yes"){
            console.log("complete this work");
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
            } else if(menu === "exit") {
                await exitWork();
            } else {
                console.log("the command doesn’t exist");
            }
        }
}

mainMenu()