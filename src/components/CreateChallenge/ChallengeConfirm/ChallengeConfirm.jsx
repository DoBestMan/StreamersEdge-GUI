import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CustomInput from '../../CustomInput';
import {ModalTypes} from '../../../constants';
import {ModalActions} from '../../../actions';
import {GenUtil} from '../../../utility';
import {PeerplaysService, ChallengeService} from '../../../services';

import {CancelButton, ContinueButton} from '../../../assets/images/challenge';
import {IconPassword, IconPasswordActive} from '../../../assets/images/login';

const trans = GenUtil.translate;

class ChallengeConfirm extends Component {
  state = {
    password: '',
    isPeerplaysAccount: !(/^se/.test(this.props.peerplaysAccountName)),
    errors: []
  };

  componentDidMount() {
    if (!this.props.isPeerplaysConnected) {
      PeerplaysService.connectToBlockchain(true);
    }
  }

  numberWithCommas(x) {
    return Number(x).toLocaleString();
  }

  openModal(modalData, modalType) {
    this.props.toggleModal();
    this.props.setModalData(modalData);
    this.props.setModalType(modalType);
    this.props.toggleModal();
  }

  handlePasswordChange = (password) => {
    this.setState({
      password,
      errors: []
    });
  }

  handleCancel = () => {
    this.props.toggleModal();
  }

  handleContinue = () => {
    if (this.state.isPeerplaysAccount && !this.state.password) {
      this.setState({
        errors: [trans('createChallenge.ppyPassword.required')]
      });
      return;
    }

    const {challenge} = this.props;
    const startDate = challenge.startDate;
    startDate.setHours(startDate.getHours() + 1);

    const data = {
      name: challenge.name,
      startDate: startDate.toISOString(),
      game: challenge.game,
      accessRule: challenge.accessRule,
      ppyAmount: challenge.ppyAmount,
      conditionsText: challenge.conditionsText,
      conditions: challenge.conditions,
      invitedAccounts: challenge.invitedAccounts
    };

    if (!challenge.isUndefinedEndDate) {
      data.endDate = challenge.endDate.toISOString();
    }

    if (data.conditions.length > 1) {
      data.conditions[0].join = data.conditions[1].join;
    }

    data.conditions[data.conditions.length - 1].join = 'END';

    if (this.state.isPeerplaysAccount) {
      const tr = PeerplaysService.createTransaction(this.props.peerplaysAccountName, this.state.password, challenge.ppyAmount);

      tr.then((deposit) => {
        // Create challenge with peerplays account
        ChallengeService
          .createChallenge({...data, depositOp: deposit})
          .then((result) => {
            this.openModal(result.id, ModalTypes.CREATE_CHALLENGE_SUCCESS);
          })
          .catch((err) => {
            this.openModal({
              headerText: trans('createChallenge.modal.failedHeader'),
              subText: err,
              type: 'error'
            }, ModalTypes.SUBMIT);
          });
      }).catch(() => {
        // open error modal
        this.openModal({
          headerText: trans('createChallenge.modal.failedHeader'),
          subText: trans('createChallenge.modal.failedTransaction'),
          type: 'error'
        }, ModalTypes.SUBMIT);
      });
    } else {
      // Create challenge with social account
      ChallengeService
        .createChallenge(data)
        .then((result) => {
          // open success modal
          this.openModal(result.id, ModalTypes.CREATE_CHALLENGE_SUCCESS);
        })
        .catch((err) => {
          // open error modal
          this.openModal({
            headerText: trans('createChallenge.modal.failedHeader'),
            subText: err,
            type: 'error'
          }, ModalTypes.SUBMIT);
        });
    }
  }

  render() {
    const {challenge} = this.props;

    return challenge ? (
      <>
        <div className='challenge-confirm'>
          <p className='challenge-confirm__txt'>
            {trans('createChallenge.header')}:
            <span className='challenge-confirm__txt-name'>{challenge.name}</span>
          </p>
          <div className='challenge-confirm__field'>
            <div className='challenge-confirm__field-label'>{trans('createChallenge.confirm.bounty')}</div>
            <div className='challenge-confirm__field-value'>{this.numberWithCommas(challenge.ppyAmount)}</div>
          </div>
          <div className='challenge-confirm__field'>
            <div className='challenge-confirm__field-label'>{trans('createChallenge.confirm.fee')}</div>
            <div className='challenge-confirm__field-value'>{this.numberWithCommas(1000)}</div>
          </div>
          <div className='challenge-confirm__field'>
            <div className='challenge-confirm__field-label'>{trans('createChallenge.confirm.total')}</div>
            <div className='challenge-confirm__field-value'>{this.numberWithCommas(challenge.ppyAmount + 1000)}</div>
          </div>
          {this.state.isPeerplaysAccount && (
            <div className='challenge-confirm__field'>
              <CustomInput
                name='password'
                type='password'
                hasActiveGlow={ true }
                placeholder={ trans('createChallenge.confirm.ppyPassword.placeholder') }
                handleChange={ this.handlePasswordChange }
                iconLeft={ IconPassword }
                iconLeftActive={ IconPasswordActive }
                required
              />
            </div>
          )}
          {this.state.errors.length > 0 && (
            <div className='create-challenge__error'>
              {this.state.errors.map((error, index) => <p key={ index }>{error}</p>)}
            </div>
          )}
          <div className='challenge-confirm__buttons'>
            <img className='challenge-confirm__buttons-button' src={ CancelButton } onClick={ this.handleCancel } alt='' />
            <img className='challenge-confirm__buttons-button' src={ ContinueButton } onClick={ this.handleContinue } alt='' />
          </div>
        </div>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  challenge: state.getIn(['modal', 'data', 'challenge']),
  peerplaysAccountName: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountName']),
  isPeerplaysConnected: state.getIn(['peerplays', 'connected'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeConfirm);
