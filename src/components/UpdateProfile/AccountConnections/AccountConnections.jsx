import React, {Component} from 'react';
import {ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import styles from '../MUI.css';
import {withStyles} from '@material-ui/core/styles';
import {ConnectButton, DisconnectButton} from '../../../assets/images/updateProfile/index';
import classNames from 'classnames';
class AccountConnections extends Component {
  /**
   * Renders connection header: E.G 'Peerplays Wallet'.
   *
   * @param {string} headerText - Text displayed in header.
   * @returns {ExpansionPanelSummary} - Html for header.
   * @memberof AccountConnections
   */
  renderHeader = (headerText) => {
    const {classes} = this.props;

    return (
      <div
        aria-controls='panel1a-content'
        id='panel1a-header'
        className='update-link-accounts__header'
        classes={ {content: classes.header} }
      >
        {headerText}
      </div>
    );
  }
  //renders connection select: E.G 'Select Your Cryptocurrency account'
  /**
   * @param {object} type - Object containing imgs, text, and username for a service.
   * @returns {ExpansionPanelDetails} Html for account select.
   * @memberof AccountConnections
   */
  renderConnectionSelect = (type) => {
    return (
      <div>
        <div className='update-link-accounts__wrapper'>
          <div className='update-link-accounts__content'>
            <p className='update-link-accounts__content-header'>{ type.header }</p>
            <div className='update-link-accounts__content-body'>
              {this.renderIcons(type.connections)}
            </div>
          </div>
          {this.renderConnections(type.connections)}
        </div>
      </div>
    );
  };
  renderConnections = (connections) => {
    // eslint-disable-next-line array-callback-return
    return connections.map((connection) => connection.bodyUsername ? (
      <div key={ connection.bodyIcon } className='update-link-accounts__connection'>
        <img className='update-link-accounts__connection-icon' src={ connection.bodyIcon } alt='' />
        <div className='update-link-accounts__connection-wrapper'>
          <p className='update-link-accounts__connection-user'>{ ConnectButton }</p>
        </div>
      </div>
    ) : null);
  }

  /**
   * Renders an icon for each available connection. Gets called in renderConnections.
   *
   * @param {File} imgArray - Array of png/svg.
   * @returns {HTMLElement} Img html.
   * @memberof AccountConnections
   */
  renderIcons = (imgArray) => {
    if(imgArray) {
      return imgArray.map((connection,index) => (
        <div key={ index } className={ classNames('update-link-accounts__content-body-parent',{'update-link-accounts__content-body-parent-dark':!connection.username}) }>
          <div className='update-link-accounts__content-body-icon__wrapper'>
            <img src={ connection.headerIcon }
              key={ connection.headerIcon }
              className={ classNames('update-link-accounts__content-body-icon',
                {'update-link-accounts__content-body-icon-fb':connection.name === 'facebook'},
                {'update-link-accounts__content-body-icon-league':connection.name === 'league'})
              } alt=''/>
          </div>
          <div className='update-link-accounts__content-body-text'>
            <p className='update-link-accounts__content-body-name'>{ connection.name }</p>
            <p className='update-link-accounts__content-body-username'>{ connection.username }</p>
          </div>
          <div className='update-link-accounts__content-body-btn__wrapper'>
            {connection.name === 'peerplays' && this.props.peerplaysAccountName && this.props.peerplaysAccountName.startsWith('se-')?
              <img src={ DisconnectButton }
                alt = 'disconnect button'
                className='update-link-accounts__content-body-btn-notAllowed'/> :
              connection.username ?
                <img src={ DisconnectButton }
                  onClick={ () => this.props.openUnlinkAccountModal(connection.name) }
                  alt = 'disconnect button'
                  className='update-link-accounts__content-body-btn'/> :
                <img src={ ConnectButton }
                  onClick={ () => this.props.openLinkAccountModal(connection.name) }
                  alt = 'connect button'
                  className='update-link-accounts__content-body-btn'/>
            }
          </div>
        </div>));
    }
  }

  render() {
    const {classes, connections} = this.props;
    return (
      <div className='update-connections__wrapper'>
        {/* Peerplays Wallet Connections */}
        <div  >
          { this.renderConnectionSelect(connections.peerplays) }
        </div>

        {/* SOCIAL CONNECTIONS */}
        <div  >
          { this.renderConnectionSelect(connections.social) }
        </div>

        {/* GAME CONNECTIONS */}
        <div className={ classes.expansion } >
          { this.renderConnectionSelect(connections.game) }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AccountConnections);
