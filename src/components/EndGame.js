import React, { Component } from 'react';

class EndGame extends Component {
    renderMessage = () => {
        return this.props.win ? <p>Congarts!</p> : <p>The word is: {this.props.secretWord}</p>
    }

    render() {
        return (
            <div className='end-game'>
                {this.renderMessage()}
            </div>
        );
    }
}

export default EndGame;