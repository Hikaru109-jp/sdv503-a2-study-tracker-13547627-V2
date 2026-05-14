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
    sessions.push({topic, duration});
}