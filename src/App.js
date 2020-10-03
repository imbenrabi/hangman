import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Solution from './components/Solution';
import Score from './components/Score';
import Letters from './components/Letters';
import { render } from '@testing-library/react';
import EndGame from './components/EndGame';

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solution: {
        word: 'SECRET',
        hint: 'Its a secret.',
        revealed: false
      },
      score: 100
    }
  }

  generateLetterStatuses() {
    let letterStatus = {};
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false;
    }

    return letterStatus;
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
      <div>
        <Score score={this.state.score} scoreClass={this.setScoreClass()} />
        <Solution letterStatus={this.state.letterStatus} solution={this.state.solution} />
        <Letters letterStatus={this.state.letterStatus} pickLetter={this.pickLetter} />
      </div>
    )
  }

  render() {
    return this.state.solution.revealed || this.state.score <= 0 ?
      <EndGame win={this.state.solution.revealed} secretWord={this.state.solution.word} /> :
      this.renderGame()
  }

}

export default App;
