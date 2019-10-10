import React, {Component} from 'react';
import {Card, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../MUI.css';
import {withStyles} from '@material-ui/core/styles';

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
      <ExpansionPanelSummary
        expandIcon={ <ExpandMoreIcon className='expand-icon'/> }
        aria-controls='panel1a-content'
        id='panel1a-header'
        className='link-accounts__header'
        classes={ {content: classes.header} }
      >
        {headerText}
      </ExpansionPanelSummary>
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
      <ExpansionPanelDetails>
        <div className='link-accounts__wrapper'>
          <CardContent className='link-accounts__content'>
            <p className='link-accounts__content-header'>{ type.headerLabel }</p>
            <p className='link-accounts__content-body'>{ type.headerDescription }</p>
            {this.renderIcons(type.connections)}
          </CardContent>
          {this.renderConnections(type.connections)}
        </div>
      </ExpansionPanelDetails>
    );
  };

  renderConnections = (connections) => {
    // eslint-disable-next-line array-callback-return
    return connections.map((connection) => connection.bodyUsername ? (
      <CardContent key={ connection.bodyIcon } className='link-accounts__connection'>
        <img className='link-accounts__connection-icon' src={ connection.bodyIcon } alt='' /> {/* white peerplays icon: iconWhite*/}
        <div className='link-accounts__connection-wrapper'>
          <p className='link-accounts__connection-user'>{ connection.bodyUsername }</p> {/* private key: 1F1XBVCFJKASH23J2LsXBNDOIJWIO2XJ*/}
          <p className='link-accounts__connection-label'>{ connection.bodyLabel }</p> {/* label: Wallet Address*/}
        </div>
        <div className='link-accounts__connection-close' onClick={ () => this.props.openUnlinkAccountModal(connection.name) }/>
      </CardContent>
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
      return imgArray.map((connection) => (
        <Button className='link-accounts__content-icon' disabled={ !(connection.bodyUsername === null || connection.bodyUsername === '') } key={ connection.headerIcon }>
          <img onClick={ () => this.props.openLinkAccountModal(connection.name) } src={ connection.headerIcon } alt=''/>
        </Button>
      ));
    }
  }

  render() {
    const {classes, connections} = this.props;
    return (
      <Card className='link-accounts__card'>
        {/* SOCIAL CONNECTIONS */}
        <ExpansionPanel className={ classes.expansion } defaultExpanded>
          { this.renderHeader(connections.social.header) }
          { this.renderConnectionSelect(connections.social) }
        </ExpansionPanel>

        {/* GAME CONNECTIONS */}
        <ExpansionPanel className={ classes.expansion } defaultExpanded>
          { this.renderHeader(connections.game.header) }
          { this.renderConnectionSelect(connections.game) }
        </ExpansionPanel>
      </Card>
    );
  }
}

export default withStyles(styles)(AccountConnections);
