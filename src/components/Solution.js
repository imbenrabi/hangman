import React, { Component } from 'react';
import Letter from './Letter';

class Solution extends Component {
    renderHiddenWord = () => {
        let secretWord = Array.from(this.props.solution.word);
        for (let i = 0; i < secretWord.length; i++) {
            secretWord[i] = [secretWord[i], i]
        }

        return secretWord.map(letter =>
            <Letter key={letter[1]} letter={letter[0]} letterStatus={this.props.letterStatus} secret={true} />
        )
    }

    render() {
        return (
            <div>
                <div className="hidden-word">{this.renderHiddenWord()}</div>
                <p className="hint">HINT: {this.props.solution.hint}</p>
            </div>
        );
    }
}

export default Solution;