export class Question{
    /**
     * @param {*} title title of the quiz
     * @param {string} text  text of the question
     * @param {string[]} choices choices of the question
     * @param {*} answer answer of the question
     * @param {*} image image of the question
     */
    constructor(question, answers, correctAns, type, media, config){
        this.question = question;
        this.answers = answers;
        this.correctAns = correctAns;
        this.type = type;
        this.media = media;
        this.config = config;
    }
    /**
     * 
     * @param {string} choice some text to guess
     * @returns {boolean} return true if the answer is correct
     */
    correctAnswer(choice) {
        return choice == this.correctAns;
    }
}