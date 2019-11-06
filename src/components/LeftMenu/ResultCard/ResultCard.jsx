import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Avatar from '../../../assets/images/avatar/profile-default.svg';
import {GenUtil} from '../../../utility';

const translate = GenUtil.translate;
class ResultCard extends Component {
  handleClick = () => {
    this.props.history.push(`/challenge/${this.props.challenge.id}`);
  }

  render() {
    const {challenge} = this.props;

    return (
      <>
        <div className='result-card' onClick={ this.handleClick }>
          <div className='result-card-body'>
            <img className='result-card-body__avatar' src={ (challenge.user && challenge.user.avatar) || Avatar } alt='' />
            <div className='result-card-body-content'>
              <span className='result-card-body-content__title'>
                {challenge.name}
              </span>
              {challenge.user && (
                <span className='result-card__body-content__subTitle'>{`${translate('leftMenu.challenger')}${challenge.user.username}`}</span>
              )}
            </div>
          </div>
          <div className='result-card-footer'>
            {challenge.conditions && challenge.conditions.map((condition) => (
              <div key={ condition.id } className='result-card-footer__item'>
                {`${condition.param} ${condition.operator} ${condition.value}`}
              </div>
            ))}
            <div className='result-card-footer__item'>
              {challenge.status ? challenge.status : translate('leftMenu.defaultStatus')}
            </div>
            <div className='result-card__grow' />
            <div className='result-card-footer__category'>
              {translate('leftMenu.categoryText')}<span>{challenge.game}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ResultCard);
