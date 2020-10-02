import React, { Component } from 'react';

class Letter extends Component {
    renderSecretLetter = () => {
        if (this.props.letterStatus[this.props.letter] === true) {
            return <span className="letter">{this.props.letter}</span>
        } else {
            return <span className="letter">_ </span>
        }
    }

    handleLetterClick = () => {
        this.props.pickLetter(this.props.letter)
    }

    renderAvailableLetter = () => {
        if (this.props.letterStatus[this.props.letter] === false) {
            return <span className="letter" onClick={this.handleLetterClick} > {this.props.letter} </span>
        } else {
            return <span className="letter-crossed"> {this.props.letter} </span>
        }
    }

    renderLetter = (secret) => {
        if (secret) {
            return this.renderSecretLetter()
        } else {
            return this.renderAvailableLetter()
        }
    }

    render() {
        return <span>
            {this.renderLetter(this.props.secret)}
        </span>
    }
}

export default Letter;