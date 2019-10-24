import React, {Component} from 'react';
import {ChallengeUtil} from '../../../utility';
import ChallengeCard from '../ChallengeCard';
import Paginate from 'react-paginate';
import pubg_placeholder from '../../../assets/images/dashboard/placeholder/pubg_placeholder.png';

class ChallengeGrid extends Component {

  state = {
    challenges: [],
    currentPage: 0,
    offset: 0,
    perPage: 9
  };

  changePage = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({currentPage: selectedPage, offset: offset});
  }


  render() {
    let challenges = this.props.challenges;
    let challengeCount = 0;

    if (challenges) {
      return (
        <>
          <div className='challenge-card__container'>
            {challenges.filter((challenge) => {
              return challenge.joinedUsers.length > 0 ? true : false;
            }).map((challenge) => {
              challengeCount++;
              return (<ChallengeCard key={ challenge.name } name={ challenge.name } users={ challenge.joinedUsers }
                reward={ challenge.ppyAmount } game={ challenge.game } image={ pubg_placeholder }date={ ChallengeUtil.formatDate(challenge.endDate) }/>);
            }).slice(this.state.offset, this.state.offset + this.state.perPage)}
          </div>
                  <Paginate
                    previousLabel={ '←' }
                    nextLabel={ '→' }
                    breakLabel={ '...' }
                    breakClassName={ 'break-me' }
                    pageCount={ challengeCount / 9 }
                    forcePage={ this.state.currentPage }
                    marginPagesDisplay0ed={ 1 }
                    pageRangeDisplayed={ this.state.perPage }
                    onPageChange={ this.changePage }
                    containerClassName={ 'pagination' }
                    subContainerClassName={ 'pages pagination' }
                    activeClassName={ 'active' }
                  />
                </>
      );
    }

  }
}

export default ChallengeGrid;
