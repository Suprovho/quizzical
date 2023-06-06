export default function Start(props) {
    return(
        <div className="start-container">
            <h1 className="start-heading">Quizzical</h1>
            <p className="start-p">Some description if needed</p>
            <button className="start-button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}