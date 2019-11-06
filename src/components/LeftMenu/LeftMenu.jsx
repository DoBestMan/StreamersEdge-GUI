import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {List, ListItem, Button} from '@material-ui/core';
import ResultForm from './ResultForm';
import {GenUtil} from '../../utility';
import {ChallengeService} from '../../services';
import {ModalActions} from '../../actions';
import ModalTypes from '../../constants/ModalTypes';
import styles from './Mui.css';

const trans = GenUtil.translate;
const categoriesLabel = 'leftMenu.links.categories';
const popularLabel = 'leftMenu.links.popular';
class LeftMenu extends Component {
  state = {
    options: [
      {label: trans(categoriesLabel), value: 'categories', selected: false},
      {label: trans(popularLabel), value: 'popular', selected: false}
    ],
    searchString: '',
    searchResult: [],
    openResult: false,
    challenges: [],
    category: '',
    hasTransition: false,
    hasUpdated: false,
    update: false,
    displayList: false
  };

  componentDidMount() {
    ChallengeService.getChallenges().then((res) => {
      this.setState({
        challenges: res
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Close search result form when the left menu is closed
    if (!this.props.open && this.state.openResult) {
      this.setState({
        openResult: false,
        searchString: '',
        searchResult: [],
        category: '',
        options: [
          {label: trans(categoriesLabel), value: 'categories', selected: false},
          {label: trans(popularLabel), value: 'popular', selected: false}
        ],
        hasUpdated: false,
        displayList: false
      });
    }

    // Up to date with category modal
    if (this.props.modalData && this.props.modalData !== prevProps.modalData) {
      const newOptions = this.state.options;
      newOptions[0].selected = true;
      newOptions[0].label = `${trans(categoriesLabel)} - ${this.props.modalData}`;
      this.setState({
        options: newOptions,
        category: this.props.modalData,
        hasUpdated: true
      }, () => {
        this.handleSearch();
      });
    }

    if (prevState.openResult !== this.state.openResult) {
      this.setState({
        hasTransition: false
      });
    } else if (prevProps.open !== this.props.open) {
      this.setState({
        hasTransition: true
      });
    }
  }

  toggleOpen = () => {
    this.setState({
      openResult: !this.state.openResult
    });
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value
    });
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    const query = this.state.searchString.toLowerCase();
    let result = this.state.challenges;

    // Arrange challenges by popular
    if (this.state.options[1].selected) {
      result = result.sort((a, b) => {
        return b.joinedUsers.length - a.joinedUsers.length;
      });
    }

    // Search challenges by category
    if (this.state.options[0].selected && this.state.category) {
      result = result.filter((challenge) => {
        return challenge.game.toLowerCase() === this.state.category.toLowerCase();
      });
    }

    // Search challenges by search string
    if (query) {
      result = result.filter((challenge) => {
        return this.searchChallenge(query,challenge);
      });
    }

    this.setState({
      openResult: true,
      searchResult: result
    });
  }

  searchChallenge(query, challenge) {
    if (challenge.name.toLowerCase().includes(query)) {
      return true;
    }

    if (challenge.game.toLowerCase().includes(query)) {
      return true;
    }

    if (challenge.endDate.toString().includes(query)) {
      return true;
    }

    if (challenge.ppyAmount.toString().includes(query)) {
      return true;
    }

    return false;
  }

  handleFilterClicked = () => {
    this.setState({displayList: !this.state.displayList});
  }

  handleReset = () => {
    this.setState({
      category: '',
      options: [
        {label: trans(categoriesLabel), value: 'categories', selected: false},
        {label: trans(popularLabel), value: 'popular', selected: false}
      ],
      hasUpdated: false
    }, () => {
      this.handleSearch();
    });
  }

  handleClickOption = (option) => {
    switch (option) {
      case 'categories': {
        this.props.setModalType(ModalTypes.SELECT_CATEGORY);
        this.props.setModalData(this.state.category);
        this.props.toggleModal();
        break;
      }

      case 'popular': {
        const newOptions = this.state.options;
        newOptions[1].selected = true;
        this.setState({
          options: newOptions,
          hasUpdated: true
        }, () => {
          this.handleSearch();
        });
        break;
      }

      default: break;
    }
  }

  render() {
    const {open, toggleOpen} = this.props;
    const {openResult, displayList} = this.state;

    return (
      <>
        <div className={ classNames('left-menu', {'left-menu__open': open}) }>
          <div className='left-menu-search'>
            <input
              className='left-menu-search__input'
              placeholder={ trans('leftMenu.search.placeholder') }
              value={ this.state.searchString }
              onChange={ this.handleChange }
              onKeyUp={ this.handleKeyUp }
            />
            <div className='left-menu-search__icon-search' onClick={ this.handleSearch }>
              <i className='fas fa-search left-menu-search__icon--color' />
            </div>
          </div>
          <div className='left-menu-filter-text' onClick={ this.handleFilterClicked }>
            {trans('leftMenu.links.filters')} <i className={ classNames('fas fa-chevron-down', {'fas fa-chevron-up': displayList}) } />
          </div>
          {
            displayList ?
              <div>
                <hr/>
                <List className='left-menu-search__options' disablePadding>
                  {this.state.options.map((option, index) => (
                    <ListItem
                      key={ index }
                      className={ classNames('navlink-item', {'navlink-item__active': option.selected}) }
                      onClick={ () => this.handleClickOption(option.value) }
                      disableGutters
                    >
                      {option.label}
                    </ListItem>
                  ))}
                </List>
                <Button className='left-menu-reset-button' onClick={ this.handleReset }>{trans('leftMenu.reset')}</Button>
              </div>
              : null
          }

        </div>
        {openResult && (
          <ResultForm
            challenges={ this.state.searchResult }
            searchString={ this.state.searchString }
            toggleOpen={ this.toggleOpen }
          />
        )}
        <div
          className={ classNames(
            'left-menu-indicator',
            {
              'left-menu-indicator__open': open,
              'left-menu-indicator__open-result': openResult,
              'left-menu-indicator__transition': this.state.hasTransition
            }
          ) }
          onClick={ toggleOpen }
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  modalData: state.getIn(['modal', 'data'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LeftMenu));
