const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


/*Questions that will appear on the website*/
let questions = [
    {
        question: "A What is 2+2?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: "B What is 2+4?",
        choice1: '6',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
    {
        question: "C What is 2+25?",
        choice1: '2',
        choice2: '4',
        choice3: '27',
        choice4: '17',
        answer: 3,
    },
    {
        question: "D What is 2+0?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


/*... is a spread operator, contained in an array */
startGame = () => {

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

/*Keeps track of the score here. sees if the score is set at 0 or if it is more than intended for the quiz. Only does this for two specific occurances*/
getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {

        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/Users/adave/OneDrive/Desktop/Group%20Project%20test//end.html')
    }

    /*Each question has a number linked to it. These numbers go up by one each time, replacing the initial number value. */
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    /*Below doesn't work and messes up the quiz. It should calcualte how much of the bar should be filled each question.*/
    /* progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` */

    /*Keeps track of what question that teh person is on, and what the question actually is.*/
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    /**/
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    /*Removes parts of the array that is being used for the questions.*/
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

/*Sees if the accepted answer is correct, and returns accordingly.*/
choices.forEach(choice => {

    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        /*If answer is answered correctly, points are given (const SCORE_POINTS at top) */
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        /*Adds score to the current user score*/
        selectedChoice.parentElement.classList.add(classToApply)

        /*Current question that has been answered to removed, and function NewQuestion is called (to get one of the remaniing questions)*/
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {

    score +=num
    scoreText.innerText = score
}

startGame()