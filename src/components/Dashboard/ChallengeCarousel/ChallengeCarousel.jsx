import React, {Component} from 'react';
import {DashboardConstants} from '../../../constants';
import ChallengeCard from '../ChallengeCard';
import ChallengeUtil from '../../../utility/ChallengeUtil';
import pubg_placeholder from '../../../assets/images/dashboard/placeholder/pubg.jpg';
import fortnite_placeholder from '../../../assets/images/dashboard/placeholder/fortnite.jpg';
import Slider from 'react-slick';
import {GenUtil} from '../../../utility';
import './slick.scss';

const translate = GenUtil.translate;

class ChallengeCarousel extends Component {
  renderFeatured = () => {
    let {challenges} = this.props;

    challenges = challenges.filter((challenge) => {
      return challenge.joinedUsers.length > 0 ? true : false;
    }).slice(0, DashboardConstants.DASHBOARD_CHALLENGES_MAX-1);

    if (challenges.length < 3) {
      return null;
    }

    challenges = challenges.slice(0,3);

    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 1,
      speed: 500
    };

    let challengeImg = pubg_placeholder;

    return (
      <div>
        <h2>{translate('dashboard.featured.header')}</h2>
        <Slider { ...settings }>
          {challenges.map((challenge) => {
            if (challenge.game === 'fortnite') {
              challengeImg = fortnite_placeholder;
            }

            return (
              <ChallengeCard
                identifier='card-1'
                image={ challengeImg }
                key={ challenge.name }
                name={ challenge.name }
                users={ challenge.joinedUsers }
                reward={ challenge.ppyAmount }
                game={ challenge.game }
                date={ ChallengeUtil.formatDate(challenge.endDate) }
              />
            );
          })}
        </Slider>
      </div>
    );
  }

  render() {
    if (this.props.challenges.length) {
      return (
        <div className='dashboard__carousel'>
          {this.renderFeatured()}
        </div>
      );
    }

    return null;
  }
}

export default ChallengeCarousel;
