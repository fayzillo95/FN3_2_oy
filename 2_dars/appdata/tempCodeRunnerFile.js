const fs = require('fs');
const readline = require('readline');
const path = require('path');

// File paths
const appDataPath = path.join(__dirname, 'appdata');
const quizFilePath = path.join(appDataPath, 'quiz.json');
const usersFilePath = path.join(appDataPath, 'users.json');
const totalFilePath = path.join(appDataPath, 'total.json');

// Ensure appdata directory exists
if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath);
}

// Sample data
const sampleQuiz = [
    { id: 1, question: 'What is JavaScript?', options: { A: 'Language', B: 'Framework', C: 'Library' }, answer: 'A' },
    { id: 2, question: 'What is Node.js?', options: { A: 'Runtime', B: 'IDE', C: 'Database' }, answer: 'A' },
    // Add 8 more questions here
];

const sampleUsers = [{ id: 1, name: 'Ali' }];

// Write sample data to JSON files
fs.writeFileSync(quizFilePath, JSON.stringify(sampleQuiz, null, 4));
fs.writeFileSync(usersFilePath, JSON.stringify(sampleUsers, null, 4));

// Readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Functions
function loadQuiz() {
    const data = fs.readFileSync(quizFilePath, 'utf-8');
    return JSON.parse(data);
}

function saveResults(results) {
    fs.writeFileSync(totalFilePath, JSON.stringify(results, null, 4));
}

function startQuiz(userId) {
    const quiz = loadQuiz();
    const results = [];
    let currentQuestion = 0;

    function askQuestion() {
        if (currentQuestion < quiz.length) {
            const q = quiz[currentQuestion];
            console.log(`Question ${q.id}: ${q.question}`);
            console.log(`A: ${q.options.A}`);
            console.log(`B: ${q.options.B}`);
            console.log(`C: ${q.options.C}`);
            rl.question('Your answer: ', (answer) => {
                results.push({ userId, quizId: q.id, answer });
                currentQuestion++;
                askQuestion();
            });
        } else {
            console.log('Quiz completed!');
            saveResults(results);
            rl.close();
        }
    }

    askQuestion();
}

// Start the quiz
rl.question('Enter your user ID: ', (userId) => {
    startQuiz(parseInt(userId));
});