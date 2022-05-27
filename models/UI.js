import { Quiz } from "./Quiz.js";
export class UI{
    constructor(){
    }
    /**
     * @param {String} title title to render
     */
    /*showTitle(title){
        const quizTitle = document.getElementById("title")
        quizTitle.innerText = title
    }*/

    /**
     * 
     * @param {string[]} choices choices of the question
     */
    displayContent(type, question, choices, media, index, callback){
        const containersContainer = document.getElementById("container")
        containersContainer.innerHTML = "";
        
        var newLine = document.createElement("hr")
        newLine.id = "newline"
        //Standard Template
        if(type == "standard"){
            var standardContainer = document.createElement("div")
            standardContainer.id = "standardContainer"
            containersContainer.append(standardContainer)
            this.addQuestions(question, choices, standardContainer, callback)
        }

        //Reading Template
        if(type == "reading"){
            var readingContainer = document.createElement("div")
            readingContainer.id = "readingContainer"
            containersContainer.append(readingContainer)

            var lectureContainer = document.createElement("div")
            var questionsContainer = document.createElement("div")
            lectureContainer.id = "lectureContainer"
            questionsContainer.id = "readingQuestionsContainer"

            readingContainer.append(lectureContainer)
            readingContainer.append(questionsContainer)

            //Add lecture texts
            var lectureTitle = document.createElement("p")
            lectureTitle.id = "lectureTitle"
            lectureTitle.innerText = media[0].title

            var lectureParagraph = document.createElement("p")
            lectureParagraph.id = "lectureParagraph"
            lectureParagraph.innerText = media[0].paragraph

            lectureContainer.append(lectureTitle)
            lectureContainer.append(lectureParagraph)

            //Add lecture questions
            for(let i=0; i<question.length; i++){
                var divQuestion = document.createElement("div")
                divQuestion.className = "singleQuestionContainer"
                divQuestion.id = "singleQuestionContainer"+i
                this.addQuestions(question[i].subQuestion, choices[i], divQuestion, callback)
                questionsContainer.append(newLine)
                questionsContainer.append(divQuestion)
                
            }
        }
        //Listening Template
        if(type == "listening"){
            var listeningContainer = document.createElement("div")
            listeningContainer.id = "listeningContainer"
            containersContainer.append(listeningContainer)

            var timer = document.createElement("h3")
            timer.innerText = "-- : --"
            timer.id  = "timer"

            var audio = document.createElement("audio")
            audio.id = "audio"
            audio.src = media

            listeningContainer.append(audio)
            listeningContainer.append(timer)
            listeningContainer.append(newLine)

            var questionsContainer = document.createElement("div")
            questionsContainer.id = "listeningQuestionsContainer"
            listeningContainer.append(questionsContainer)

            //Add lecture questions
            for(let i=0; i<question.length; i++){
                var divQuestion = document.createElement("div")
                divQuestion.className = "singleQuestionContainer"
                divQuestion.id = "singleQuestionContainer"+i
                this.addQuestions(question[i].subQuestion, choices[i], divQuestion, callback)
                questionsContainer.append(divQuestion)
            }
        }
        
    }

    addQuestions(question, choices, container, callback){
        var questionText = document.createElement("p")
            questionText.id = "question"
            questionText.innerText = question
            container.appendChild(questionText)
        for(let i=0; i < choices.length; i++){
            const button = document.createElement("input")
            button.type="radio"
            button.name = container.id
            button.id = choices[i]
            button.value = choices[i]
            button.className = "radioInput"

            var label = document.createElement("label")
            label.htmlFor = choices[i]
            label.className = "radio"
            label.id = "questionLabel"

            var div = document.createElement("span")
            div.className="radio_radio"

            var description = document.createTextNode(choices[i])
            
            label.appendChild(div)
            label.appendChild(button)
            label.appendChild(description)
            
            button.addEventListener("click", () => callback(choices[i]));
            container.appendChild(label)
        }
    }

    countdown(startingMinutes){
        var distance = startingMinutes * 1000 * 60
        // Update the count down every 1 second
        var x = setInterval(function() {
            distance = distance-1000

            // Time calculations for minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element

            var timer = document.getElementById("timer")
            if(timer){
                timer.innerHTML = minutes + "m " + seconds + "s ";
            }
            // If the count down is finished, write some text
            if(distance < 0) {
                clearInterval(x);
                if(timer){
                    timer.innerHTML = "Timed";
                }
            }
        }, 1000);
    }

    showSavedAnswers(index){
        var saved = localStorage.getItem(index)
        if(saved != null){
            document.getElementById(saved).checked = true
        }
    }

    showSavedAnswersAlert(display){
        const buttonsContainer = document.getElementById("actionButtonsContainer")
        if(display){
            const labelSavedAnswer = document.createElement("label")
            labelSavedAnswer.id ="labelSavedAnswer"
            labelSavedAnswer.innerText = "Saved Answer"
            buttonsContainer.append(labelSavedAnswer)
        }
        
    }

/**
 * 
 * @param {number} score total score
 * @param {number} scoreCorrect correct answers
 */
    /*showScores(scoreCorrect, numQuestions, percentage, score, maxScore){
        const quizEndHTML = `
        <h1 id="result">Ergebnis</h1>
        <p>Score: ${score}</p>
        <p>Maximum Points: ${maxScore}</p>
        <p>Correctly answered questions: ${scoreCorrect}</p>
        <p>Total number of questions: ${numQuestions}</p>
        <p>Percentage of questions answered correctly: ${percentage}%</p>
        <p>Reps: 1</p>
        <br>
        <h1 id="result">Review</h1>
        <div id="answers"></div>
        `
        const element = document.getElementById("quiz")
        element.innerHTML = quizEndHTML
        element.style = "height: fit-content;"
    }
*/
    /**
     * 
     * @param {number} currentIndex current of index of the question
     * @param {number} total total number of questions
     */
    showProgress(currentIndex, total, type){
        const element = document.getElementById("progress");
        
        var aux = total
        if(type == "reading" || type == "listening"){
            element.innerHTML = `${currentIndex+1} - ${aux} / ${total}`;
        }
        else{
            element.innerHTML = `${currentIndex+1} / ${total}`;
        }
    }

    createNavegationButtons(create_btnBack, createBtnNext, createBtnSave, createBtnSend){
        const buttonsContainer = document.getElementById("navegationButtonsContainer")
        buttonsContainer.innerHTML = "";
        if(create_btnBack){
            this.createButtonBack()
        }
        if(createBtnNext){
            this.createButtonForward()
        }
    }

    createActionButtons(createBtnSave, createBtnSend){
        const buttonsContainer = document.getElementById("actionButtonsContainer")
        buttonsContainer.innerHTML = "";

        if(createBtnSave){
            this.createButtonSave()
        }
        if(createBtnSend){
            this.createButtonSend()
        }
    }

    createButtonForward(){
        const buttonsContainer = document.getElementById("navegationButtonsContainer")

        var btnForward = document.createElement("button")
        btnForward.id  ="buttonForward"
        btnForward.className = "navegationButtons"

        var imgForward = document.createElement("img")
        imgForward.src = "./media/Forward.png"
        imgForward.className = "navegationButtonsImage"
        btnForward.append(imgForward)

        buttonsContainer.append(btnForward)
    }

    createButtonBack(){
        const buttonsContainer = document.getElementById("navegationButtonsContainer")

        var btnBack = document.createElement("button")
        btnBack.id  ="buttonBack"
        btnBack.className = "navegationButtons"

        var imgBack = document.createElement("img")
        imgBack.src = "./media/Back.png"
        imgBack.className = "navegationButtonsImage"
        btnBack.append(imgBack)

        buttonsContainer.append(btnBack)
    }

    createButtonSave(){
        const buttonContainer = document.getElementById("actionButtonsContainer")

        var btnSave = document.createElement("button")
        btnSave.id  ="buttonSave"
        btnSave.innerText = "Save answer"
        btnSave.className = "actionButtons"
    
        buttonContainer.append(btnSave)
    }

    createButtonSend(){
        const buttonContainer = document.getElementById("actionButtonsContainer")

        var btnSend = document.createElement("button")
        btnSend.id  ="buttonSend"
        btnSend.innerText = "Send"
        btnSend.className = "actionButtons"
    
        buttonContainer.append(btnSend)
    }    

    disableButtonBack(){
        var btn = document.getElementById("buttonBack");
        btn.disabled = true;
    }

    disableButtonNext(){
        var btn = document.getElementById("buttonForward");
        btn.disabled = true;
    }

    disableButtonSend(){
        var btn = document.getElementById("buttonSend");
        btn.disabled = true;
        btn.style = "color: rgb(146, 144, 144)"
    }
    //Enable buttons
    enableButtonBack(){
        var btn = document.getElementById("buttonBack");
        btn.disabled = false;
    }

    enableButtonNext(){
        var btn = document.getElementById("buttonForward");
        btn.disabled = false;
    }
    
    enableButtonSend(){
        var btn = document.getElementById("buttonSend");
        btn.disabled = false;
        btn.style = "color: rgb(0, 0, 0)"
    }
}
