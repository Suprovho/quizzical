import React from 'react';
import Start from './components/start';
import Quest from './components/quest.js';
import blob from './images/blob.png';
import blob2 from "./images/blob 5.png"

export default function App(params) {
    const [showStart,setShowStart]=React.useState(true);
    const [questions,setQuestions]=React.useState([])
    const [score, setScore] = React.useState(0)
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [allComplete, setAllComplete] = React.useState(false)
    
    function startQuiz(params) {
        setShowStart(false)
    }

    function playAgain(params) {
        setShowStart(true)
        setShowAnswers(false)
        setAllComplete(false)
    }

    function checkAnswers()
    {
        setShowAnswers(true)
    }

    function selectAnswer(event,quest_id,option_id)
    {
        setQuestions(function(prev) {
            return(questions.map(function(quest,qid) { //quest-id=props.id,option-id=index
                if(quest_id===qid){
                    return({...quest, selected_answer:option_id})
                }else{
                    return(quest)
                }
                
            }))
        })
    }

    React.useEffect(()=>{
       var count=0;
       for(var i = 0; i < questions.length; i++){
         if (typeof questions[i].selected_answer !=='undefined') {
            if (questions[i].options[questions[i].selected_answer] === questions[i].correct_answer) {
                count++;
            }
         }
       }
       setScore(count)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showAnswers])


    React.useEffect(() => {
        
        if(showStart ===false) {
            
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results.map(function(question) {
                return({question:question.question,
                        options:question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                        selected_answer:undefined,
                        correct_answer:question.correct_answer})
            })))
            }
    }, [showStart])

    React.useEffect(()=>{
       setAllComplete(questions.every((quest)=>typeof quest.selected_answer!=='undefined'))
    },[questions])

    const quest=questions.map(function(question,index) {
        return(<Quest 
          key={index}
          question={question}
          showAnswers={showAnswers}
          selectAnswers={selectAnswer}
          id={index}
         />)
    })
    
     

    return(<div className='app'>
    {showStart ? <Start startQuiz={startQuiz}/> : 
        <div className='quiz-container'>
            {quest}
            {showAnswers ? 
                <div className='button-container'>
                    <h3 className='button-container-score'>{"You scored " + score + "/5 correct answers"}</h3>
                    <button className='button' onClick={playAgain}>Play Again</button>
                </div> 
                :
                <button className='button' disabled={!allComplete} onClick={checkAnswers}>Check Answers</button>}
        </div>}
        <img className='blob1' src={blob2} alt=''/>
<img className='blob2' src={blob} alt=''/>
</div>)
}

