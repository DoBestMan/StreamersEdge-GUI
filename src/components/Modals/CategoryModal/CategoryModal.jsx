import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import Dropdown from '../../Dropdown';
import {ModalActions} from '../../../actions';
import {GenUtil} from '../../../utility';

const trans = GenUtil.translate;

const CATEGORIES = [
  'Fortnite',
  'PUBG',
  'League of Legends'
];

class CategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.modalData || 'Fortnite'
    };
  }

  handleChangeCategory = (value) => {
    this.setState({
      category: value
    });
  }

  handleSave = () => {
    this.props.setModalData(this.state.category);
    this.props.toggleModal();
  }

  render() {
    return (
      <>
        <div className='category-wrapper'>
          <p className='category-header'>{trans('category.title')}</p>
          <div className='category-form'>
            <div className='category-form__group'>
              <span className='category-form__label'>{trans('category.select')}</span>
              <Dropdown value={ this.state.category } dropdownList={ CATEGORIES } handleChange={ this.handleChangeCategory } />
            </div>
            <div className='category-form__submit'>
              <Button className='button-save category-form__submit-button' onClick={ this.handleSave }> </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  modalData: state.getIn(['modal', 'data'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalData: ModalActions.setModalData
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryModal);
