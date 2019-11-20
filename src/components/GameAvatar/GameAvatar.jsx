import React, {Component} from 'react';
import classNames from 'classnames';

class GameAvatar extends Component {
  render() {
    const {src, name, value, selected} = this.props;

    return (
      <>
        <div
          className={ classNames(
            'game-avatar__wrapper',
            {'game-avatar__selected': selected}
          ) }
          onClick={ () => this.props.onClick(value) }
        >
          <img className='game-avatar__logo' src={ src } alt='' />
          <p className='game-avatar__title'>{ name }</p>
        </div>
      </>
    );
  }
}

export default GameAvatar;