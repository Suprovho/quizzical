export default function Start(props) {
    return(
        <div className="start-container">
            <h1 className="start-heading">Quizzical</h1>
            <p className="start-p">Quick and easy quiz game</p>
            <button className="start-button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}