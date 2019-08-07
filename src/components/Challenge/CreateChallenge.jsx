import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ChallengeService from '../../services/ChallengeService';
class CreateChallenge extends Component {
  // Redirect to dashboard, if the user is not logged in then they will go to the login page instead.
  state = {
    challenge: {
      name: 'testchallenge'+(Math.floor(Math.random() * 1000) + 1),
      endDate: new Date('December 24, 2019 05:35:32').toISOString(),
      game: 'pubg',
      accessRule: 'anyone',
      sUSD: 20,
      conditionsText: 'a test'
      // conditions: [{
      //   'param': 'resultPlace',
      //   'operator': '>',
      //   'value': 1,
      //   'join': 'END'
      // }]
    },
    invite: {
      userId: 1,
      challengeId: 21
    }
  }

  createChallenge = () => {
    const {challenge} = this.state;

    ChallengeService.createChallenge(challenge).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err.response);
    });
  }

  sendChallengeInvite = () => {
    const {invite} = this.state;

    ChallengeService.sendChallengeInvite(invite).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err.response);
    });
  }

  getChallengeById = () => {

    ChallengeService.getChallengeById(21).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err.response);
    });
  }

  render() {
    return (
      <div className='challenge'>
        <Button onClick={ this.createChallenge }> Create Challenge </Button>
        <br />
        <Button onClick={ this.sendChallengeInvite }> Send Invite </Button>
        <br />
        <Button onClick={ this.getChallengeById }> Get Challenge By Id </Button>
      </div>
    );
  }
}

export default CreateChallenge;

