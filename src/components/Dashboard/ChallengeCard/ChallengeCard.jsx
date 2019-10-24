import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigateActions} from '../../../actions';
import {withStyles} from '@material-ui/core/styles';
import {GenUtil} from '../../../utility';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import susdImg from '../../../assets/images/dashboard/susd.png';
import dateIcon from '../../../assets/images/dashboard/date-icon.svg';

import styles from './MUI.css';
const translate = GenUtil.translate;

class ChallengeCard extends Component {

  handleClick = () => {
    console.log('handleClick');
  }

  render() {
    const {classes, name, date, reward, game, users, identifier, image} = this.props;
    const cardClass = 'challenge-' + (identifier ? identifier : 'card');
    let cardMediaClass = 'challenge-card__card';
    let cardImageClass = classes.card;
    let cardRewardClass = 'challenge-card__reward';
    let cardMainClass = 'challenge-card__main';
    let cardDateClass = 'challenge-card__date';
    let cardCategoryClass = 'challenge-card__tag-category';
    let cardTagClass = 'challenge-card__tag';
    let cardTagTypeClass = 'challenge-card__tag-type';

    // Dynamically assign a class name based on identifier.
    if (identifier === 'card-1') {
      cardMediaClass = 'challenge-card__media-main';
      cardImageClass = classes.cardCarouselMain;
      cardRewardClass = 'challenge-card__reward-carousel';
      cardMainClass = 'challenge-card__main-carousel';
      cardDateClass = 'challenge-card__date-carousel';
      cardCategoryClass = 'challenge-card__tag-category-main';
      cardTagClass = 'challenge-card__tag-main';
      cardTagTypeClass = 'challenge-card__tag-type-main';

    } else if (identifier) {
      cardMediaClass = 'challenge-card__media';
      cardImageClass = classes.cardCarousel;
      cardRewardClass = 'challenge-card__reward-carousel';
      cardCategoryClass = 'challenge-card__tag-category-main';
    }

    return (
      <>
        <div className={ cardClass }>
          {!identifier ? <div className='challenge-card__join-minor'>
            <span className='challenge-card__tag-join-minor'>{translate('dashboard.join')}</span>
          </div> : null}
          <Card className={ cardMediaClass }>
            <CardActionArea>
              <CardMedia
                className={ cardImageClass }
                component='img'
                alt={ name }
                height='341'
                width='587'
                image={ image }
                title={ name }
                onClick={ this.handleClick }
              />
              <div className={ cardMainClass }>
                { name }
              </div>
              <div className={ cardDateClass }>
                {identifier === 'card-1' ? <img className = 'challenge-card__icon' src={ dateIcon } alt='dateIcon'/> : null}
                {date}
              </div>
              <div className={ cardRewardClass }>
                <img src={ susdImg } alt='sUSD'/>
                {translate('dashboard.susd')} {reward}
              </div>
              {identifier ? <div className='challenge-card__join'>
                <span className='challenge-card__tag-join'>{translate('dashboard.join')}</span>
              </div> : null}
            </CardActionArea>
            <div className='challenge-card__tag-container'>
              <div className={ cardTagClass + ' streaming' }>
            0 <span className={ cardTagTypeClass }>{translate('dashboard.streaming')}</span>
              </div>
              <div className={ cardTagClass }>
                {users.length} <span className={ cardTagTypeClass }>{translate('dashboard.accepted')}</span>
              </div>
              <div className={ cardCategoryClass }>
                {translate('dashboard.category')} <span className='challenge-card__tag-category--green'>{game}</span>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ChallengeCard));
