//@ts-check

import {questions} from './data/questions.js';
import { Question } from './models/Question.js';
import {Quiz} from "./models/Quiz.js";
import {UI} from './models/UI.js'

/**
 * 
 * @param {Quiz} quiz the main quiz object
 * @param {UI} ui UI object
 */

var savedIndex = new Array() //saves the question Index

const renderPage = (quiz, ui) => {
        if (quiz.isEnded() == false){
            ui.createNavegationButtons(true, true)
            ui.createActionButtons(true, true)
            ui.displayContent(quiz.getQuestionIndex().type, quiz.getQuestionIndex().question, quiz.getQuestionIndex().answers, quiz.getQuestionIndex().media, quiz.questionIndex, (currentChoice) => {
                quiz.guess(currentChoice); 
            });
            ui.showSavedAnswers(quiz.questionIndex) 
            ui.showSavedAnswersAlert()           

            const save = document.getElementById("buttonSave")
            save.onclick = () => {
                for(let i=0; i<quiz.getQuestionIndex().answers.length; i++){
                    if(document.getElementById(quiz.getQuestionIndex().answers[i]).checked == true){
                        
                        var x = document.getElementById(quiz.getQuestionIndex().answers[i]).value
                        localStorage.setItem(quiz.questionIndex, x)
                        ui.showSavedAnswersAlert(true)
                    }
                }
            }

            if(localStorage.getItem(quiz.questionIndex) != null){
                ui.showSavedAnswersAlert(true)
            }

            if(quiz.getQuestionIndex().type == "listening"){
                setTimeout(() => {
                    ui.countdown(0.05)
                    var audio = document.getElementById("audio")
                    if(audio){
                        audio.play()
                    }
                    setTimeout(() => {
                        quiz.questionIndex++
                        renderPage(quiz, ui) 
                    }, 7000);
                }, 4000);
            }

            //Go to next question
            const btnNext = document.getElementById("buttonForward")
            btnNext.onclick = () =>{
                    quiz.questionIndex++
                    renderPage(quiz, ui)
            }

            //Go to previous question
            const btnBack = document.getElementById("buttonBack")
            btnBack.onclick = () =>{  
                
                if(quiz.questionIndex != 0){
                    quiz.questionIndex--
                    renderPage(quiz, ui)   
                }
            }
           
            //Disable button Back if it's the first question
            if(quiz.questionIndex == 0){ ui.disableButtonBack() }
            else{ ui.enableButtonBack() }

            // Disable the button Next and enable the button Send only if it's the last question and 
            if(quiz.questionIndex == quiz.questions.length-1){
                ui.disableButtonNext()
                ui.enableButtonSend()
            }
            else{
                ui.enableButtonNext()
                ui.disableButtonSend()
            }
            //Show progress
            ui.showProgress(quiz.questionIndex, quiz.numQuestions, quiz.getQuestionIndex().type)
        }  
};

function main() {
    const quiz = new Quiz(questions)
    const ui = new UI()
    
    renderPage(quiz, ui)
}

main();