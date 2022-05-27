// @ts-nocheck
import {Question} from './Question.js'
export class Quiz{
    questionIndex = 0
    score = 0 // puntaje
    maxScore = 0 // numero maximo de puntos
    scoreCorrect = 0 //preguntas respondidas correctamente
    numQuestions = 0 //numero total de preguntas
    percentage = 0 // porcentaje de preguntas respondidas correctamente
    repetitions = 0 // repeticiones
    

    /**
     * 
     * @param {Question[]} questions 
     */
    constructor(questions){
        this.questions = questions;
    }

    /**
     * 
     * @returns {Question} the question found
     */
    getQuestionIndex(){
        return this.questions[this.questionIndex]
    }


    isEnded(){
        this.score = Math.round((100 / this.numQuestions) * this.scoreCorrect)
        this.maxScore = 100
        this.percentage = Math.round(this.scoreCorrect * 100 / this.numQuestions)
        this.numQuestions = this.questions.length
        return this.questions.length === this.questionIndex
    }

    /**
     * 
     * @param {string} answer 
     */
    guess(answer){
        if(this.getQuestionIndex().correctAnswer(answer)){
            this.scoreCorrect++;
        }
    }
    
}