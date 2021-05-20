import React, { Component } from 'react';
import Snake from './Snake'; //importeert alle info uit snake.js
import Food from './Food'; //importeert alle info uit snake.js

const getRandomCoordinates = () => { // arrowfunction wordt gemaakt voor random positie 
  let min = 1; //2 integers tussen 1-98 tot waar die maximaal en minimaal word gerenderd
  let max = 98; //let word gebruikt om het alleen bruikbaar te maken in deze code block  // these can be consts
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2; 
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = { //food cordinate in de state (dit wordt random gedaan)
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT', //direction start me right 
  snakeDots: [
    [0,0],
    [2,0]
  ]
}
 //elke snake dote heeft een eigen unieke coridinate die voortbewegen in classname snake dot 
class App extends Component { //start van class //class base component

  state = initialState;

  componentDidMount() { // eerste keer dat component ready zal zijn aka mounted
    setInterval(this.moveSnake, this.state.speed); //opnieuw iets laten zien op het scherm voor een aantal tijd 

    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() { //met 1 van deze 3 mogelijke gebeurtenissen kan het game over zijn. Hier word er nagekeken of 1 van deze mogelijkheden daadwerkerlijk gebeuren
    this.checkIfOutOfBorders(); //met this word method aangeroepen om dit na te kijken. 
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => { //arrow function onkeydown
    e = e || window.event;
    switch (e.keyCode) { //switch case voor alle keys 
      case 38:
        this.setState({direction: 'UP'}); //in het geval dat kuy 38 (up) wordt gebruikt gaat de snake naar boven
        break;
      case 40:
        this.setState({direction: 'DOWN'}); //zelfde
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => { //in deze arrowfunction word de illusie gemaakt hoe de snake zich voort beweeegt

    // neem snake poisiton voordat het zich voort beweegt
    let dots = [...this.state.snakeDots]; //state die alle puntjes bewaart van snake 
    let head = dots[dots.length - 1]; //head vinden 

  
    //berekent nieuwe positie van de snake op basis van elke key die wordt gebruikt
    switch (this.state.direction) { //switch case voor elke direction en dan word elke kant berekent
      case 'RIGHT':
        head = [head[0] + 2, head[1]]; //op het moment dat je naar rechts gaat schuift de head 1 kant op
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]; //voor elke mogelijke kant wordt er een berekening gemaakt 
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]; //head positie, .. , plus 
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }

    //update snake position and commit nieuwe positie in de react 'state'
    dots.push(head); //duwt de hoofd naar een nieuwe positie 
    dots.shift(); //shift method om de eerste item uit de array te halen. dit shift en push method moeten allebij uitgevoerd worden om de illusie zijn werk te laten doen.
  }

  checkIfOutOfBorders() { // start van method. checkt of de cordinaten binnen de game area zitten
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]; //set let variabele //get where the head is  
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) { // met deze if statement kun je een berekenen of de snake uit de border is geweest dan is het game over. 0=x position and x = y position
      this.onGameOver(); //method gets called om de game te laten stoppen. deze method worden beneden aangemaakt. 
    }
  }

  checkIfCollapsed() { //nakijken of snake zichzelf heeft geraakt.
    let snake = [...this.state.snakeDots]; //positie van snake
    let head = snake[snake.length - 1]; 
    snake.pop(); //snake pop methode om head te verwijderen
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) { // if statement om te kijken of hoofd zichzelf raakt
        this.onGameOver();
      }
    })
  }

  checkIfEat() { //als de snake het eten heeft gegeten wordt er een stukje aan het einde van de staart toegevoegd. De array incremment op dit moment.
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() { //snelheid word ge increment
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`); //alert geeft aan dat het game over is en haalt de gegevens op met ths.state om te laten wat je highscore is :)
    this.setState(initialState) //this state word aangeroepen
  }

  render() { //renderd 2 react components, geeft props door aan snake met snake dots en geeft food in food props
    return (
      <div className="game-area"> 
        <Snake snakeDots={this.state.snakeDots}/> 
        <Food dot={this.state.food}/>
      </div>
    );
  }
}

export default App;
