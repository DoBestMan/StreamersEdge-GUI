import React, {Component} from 'react';
import {DashboardConstants} from '../../../constants';
import ChallengeCard from '../ChallengeCard';
import ChallengeUtil from '../../../utility/ChallengeUtil';
import carousel_placeholder from '../../../assets/images/dashboard/placeholder/carousel_placeholder.png';

class ChallengeCarousel extends Component {
  state = {
    start: 0,
    challenges: []
  };

  handleNext = () => {
    this.setState({
      start : (this.state.start >= DashboardConstants.DASHBOARD_CHALLENGES_MAX-1) ? 0 : (this.state.start+1)
    });
  }

  handlePrev = () => {
    this.setState({
      start : (this.state.start <= 0) ? DashboardConstants.DASHBOARD_CHALLENGES_MAX-1 : (this.state.start-1)
    });
  }

  shiftChallenges = (arr, num) => {
    for (let i = 0; i < num; i++) {
      arr.push(arr.shift());
    }

    return arr;
  }

  renderFeatured = () => {
    let {challenges} = this.props;

    challenges = challenges.filter((challenge) => {
      return challenge.joinedUsers.length > 0 ? true : false;
    }).slice(0, DashboardConstants.DASHBOARD_CHALLENGES_MAX-1);

    let index = 0;

    let tempArray = challenges;

    if (this.state.start > 0) {
      challenges = this.shiftChallenges(tempArray, this.state.start);
    }

    challenges = challenges.slice(0,3);

    return (challenges.map((challenge) => {
      return (
        <ChallengeCard
          identifier= { `card-${index++}` }
          image={ carousel_placeholder }
          key={ challenge.name }
          name={ challenge.name }
          users={ challenge.joinedUsers }
          reward={ challenge.ppyAmount }
          game={ challenge.game }
          date={ ChallengeUtil.formatDate(challenge.endDate) }
        />);
    }));
  }

  render() {

    if (this.props.challenges) {
      return (
        <div className='dashboard__carousel'>
          <button className='carousel__button-left' onClick={ this.handlePrev }>
          ›
          </button>
          <button className='carousel__button-right' onClick={ this.handleNext }>
          ‹
          </button>
          {this.renderFeatured()}
        </div>
      );
    }
  }
}

export default ChallengeCarousel;
