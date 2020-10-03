import React, { Component } from 'react';
import './App.css';
import Solution from './components/Solution';
import Score from './components/Score';
import Letters from './components/Letters';
import EndGame from './components/EndGame';
import { getRandomInt } from './utils/getRandomInt'
import { solutions } from "./solutions/solutions";

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solution: this.generateSolution(),
      solutionIndexesHistory: { 0: true },
      score: 100,
      solutionsDepleted: false
    }
  }

  generateLetterStatuses() {
    let letterStatus = {};
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false;
    }

    return letterStatus;
  }

  generateSolution = () => {
    if (!this.state) {
      const solution = solutions[0];
      solution.revealed = false;

      return solution;
    } else {
      let solutionIndex = getRandomInt(solutions.length);
      while (this.state.solutionIndexesHistory[solutionIndex]) {
        solutionIndex = getRandomInt(solutions.length);
      }

      const solution = solutions[solutionIndex];
      solution.revealed = false;

      this.state.solutionIndexesHistory[solutionIndex] = true
      return solution;
    }
  }

  pickLetter = (letter) => {
    const currentLetterStatus = { ...this.state.letterStatus };
    currentLetterStatus[letter] = true;
    this.updateScore(letter);

    this.setState({
      letterStatus: currentLetterStatus
    }, this.isSecretRevealed)
  }

  updateScore = (letter) => {
    if (this.state.solution.word.includes(letter)) {
      this.setState({ score: this.state.score + 5 });
    } else {
      this.setState({ score: this.state.score - 20 });
    }

  }

  setScoreClass = () => {
    let scoreClass;

    switch (true) {
      case this.state.score > 80:
        scoreClass = 'high-score';
        break;

      case this.state.score < 80 && this.state.score >= 50:
        scoreClass = 'medium-score';
        break;

      case this.state.score < 50:
        scoreClass = 'low-score';
        break;

      default:
        break;
    }

    return scoreClass;
  }

  secretRevealed = () => {
    const currentSolution = { ...this.state.solution };
    currentSolution.revealed = true;

    this.setState({
      solution: currentSolution
    })
  }

  isSecretRevealed = () => {
    let secretRevealed = true;

    for (let letter of this.state.solution.word) {
      if (this.state.letterStatus[letter] === false) {
        secretRevealed = false;
        break;
      }
    }

    if (secretRevealed === true) {
      this.secretRevealed();
    }
  }

  renderGame = () => {
    return (
      <div className="game">
        <Score score={this.state.score} scoreClass={this.setScoreClass()} />
        <Solution letterStatus={this.state.letterStatus} solution={this.state.solution} />
        <Letters letterStatus={this.state.letterStatus} pickLetter={this.pickLetter} />
      </div>
    )
  }

  renderEndGame = () => {
    return <EndGame win={this.state.solution.revealed} secretWord={this.state.solution.word} restart={this.restartGame} depleted={this.state.solutionsDepleted} />
  }

  stopGame = () => {
    const depletion = true;
    this.setState({ solutionsDepleted: depletion });
  }

  restartGame = async () => {
    if (solutions.length === Object.keys(this.state.solutionIndexesHistory).length) {
      console.log('Game completed, stopping...');
      return this.stopGame()
    }

    const newSolution = this.generateSolution();
    const resetLetterStatus = this.generateLetterStatuses();
    const resetScore = 100;

    this.setState({ solution: newSolution, letterStatus: resetLetterStatus, score: resetScore });

  }

  isGameEnd = () => {
    if (this.state.solutionsDepleted || this.state.solution.revealed || this.state.score <= 0) {
      return true;
    } else { return false; }
  }

  render() {
    return this.isGameEnd() ? this.renderEndGame() : this.renderGame()
  }

}

export default App;
