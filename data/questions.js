import {Question} from '../models/Question.js';

var arr = [];
var data;
function add(value){
    arr.push(value)
};

function getData(){
    $.ajax({
        async: false,
        url:'readData.php',
        method: 'GET',
        dataType: 'json',
        success: function(response){
            data = JSON.stringify(response);
            data = JSON.parse(response);
            $.each(data, function(i){ 
                add(data[i])
            });
        }
    });
}
getData();
export const questions =  arr.map(question=> new Question(
    (question.question || question.subQuestion),
    question.answers, 
    question.correctAns,
    question.type, 
    question.media,
    question.config));
