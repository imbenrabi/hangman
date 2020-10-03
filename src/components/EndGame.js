import React, { Component } from 'react';

class EndGame extends Component {
    renderMessage = () => {
        if (this.props.depleted === true) {
            return <p>You have completed the game, come back in 674 days.</p>
        } else {
            return this.props.win ? <p>Congarts! The word is: {this.props.secretWord}</p> : <p>Loser! The word is: {this.props.secretWord}</p>
        }
    }

    handleRestartClick = () => {
        this.props.restart();
    }

    render() {
        return (
            <div className='end-game'>
                {this.renderMessage()}
                <button onClick={this.handleRestartClick} >Restart</button>
            </div>
        );
    }
}

export default EndGame;