import React, { Component } from "react";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import cars from "./cars.json";

class App extends Component {

    constructor() {
        super();
        this.state = {
            isGuessCorrect: true,
            cars: cars,
            score: 0,
            maxScore: 20,
            highScore: 0,
            message: ""
        };
    }


    handleSaveClick = id => {

        var cars = this.state.cars;

        var carClicked = cars.filter(car => car.id === id);


        if (!carClicked[0].clicked) {

            carClicked[0].clicked = true;

            this.handleCorrectClick();

            this.randomizecars(cars);

            this.setState({ cars });
        } else {
            this.handleIncorrectClick();
        }
    };


    randomizecars = cars => {
        cars.sort((a, b) => {
            return 0.5 - Math.random();
        });
    };


    handleCorrectClick = () => {
        this.setState({ isGuessCorrect: true });
        if (this.state.score + 1 > this.state.highScore) {
            this.setState({ highScore: this.state.highScore + 1 });
        }
        if (this.state.score + 1 >= this.state.maxScore) {
            this.setState({
                score: this.state.score + 1,
                message: "YOU WON!",
            });
        } else {
            this.setState({
                score: this.state.score + 1,
                message: "CORRECT!",
            });
        }
    };


    handleIncorrectClick = () => {
        this.setState({
            message: "INCORRECT! TRY AGAIN!",
            isGuessCorrect: false
        });
        this.resetGame();
    };


    resetGame = id => {
        var cars = this.state.cars;
        for (let i = 0; i < cars.length; i++) {
            cars[i].clicked = false;
        }
        this.setState({ score: 0 });
    };


    render() {
        var { message, score, cars, highScore } = this.state;
        return (             
        <div className="container">

        <div className="row text-center">
            <NavBar
                score={score}
                highScore={highScore}
                message={message}
            />
        </div>

        <div className="row">
            {cars.map(({ id, name, image, clicked }) =>
                <Card
                    key={id}
                    id={id}
                    name={name}
                    image={image}
                    clicked={clicked}
                    clickHandler={this.handleSaveClick}
                />
            )} </div>
             </div>
        );
    }
}

export default App;
