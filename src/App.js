import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Solution from './components/Solution';
import Score from './components/Score';
import Letters from './components/Letters';
import { render } from '@testing-library/react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solution: {
        word: 'SECRET',
        hint: 'Its a secret.'
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
    })
  }

  updateScore = (letter) => {
    if (this.state.solution.word.includes(letter)) {
      this.setState({ score: this.state.score + 5 });
    } else {
      this.setState({ score: this.state.score - 20 });
    }
  }

  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Solution letterStatus={this.state.letterStatus} solution={this.state.solution} />
        <Letters letterStatus={this.state.letterStatus} pickLetter={this.pickLetter} />
      </div>
    );

  }
}

export default App;
