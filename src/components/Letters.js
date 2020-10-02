import React, { Component } from 'react';
import Letter from './Letter';

class Letters extends Component {
    renderLetters = () => {
        const availableLetters = Object.keys(this.props.letterStatus);
        return availableLetters.map(letter => <Letter key={letter} pickLetter={this.props.pickLetter} letter={letter} letterStatus={this.props.letterStatus} secret={false} />)
    }

    render() {
        return (
            <div className="available-letters">
                {this.renderLetters()}
            </div>
        );
    }
}

export default Letters;