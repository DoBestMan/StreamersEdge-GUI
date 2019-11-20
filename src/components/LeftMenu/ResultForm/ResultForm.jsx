import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircle';
import PrevIcon from '@material-ui/icons/ChevronLeft';
import NextIcon from '@material-ui/icons/ChevronRight';
import Paginate from 'react-paginate';
import ResultCard from '../ResultCard';
import {GenUtil} from '../../../utility';
import styles from './Mui.css';

const trans = GenUtil.translate;

class ResultForm extends Component {
  state = {
    currentPage: 0,
    searchString: ''
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.challenges) !== JSON.stringify(this.props.challenges)) {
      this.setState({
        currentPage: 0
      });
    }

    if (prevProps.update !== this.props.update) {
      this.props.updateHandler(this.props.update);
      this.setState({searchString: this.props.searchString});
    }
  }

  onPageChangeFromPagination = (newPage) => {
    this.setState({currentPage: newPage.selected});
  }

  handleClickViewAll = () => {
    this.props.history.push('/challenges');
  }

  render() {
    const {challenges} = this.props;

    return (
      <>
        <div className='result-form'>
          <div className='result-form-content'>
            <div className='result-form-block'>
              <div className='result-form-block__header'>
                <p className='result-form-block__title'>{trans('search.challenge.label')}</p>
                <div className='result-form-block__all' onClick={ this.handleClickViewAll }>
                  <AddIcon />
                  <span>{trans('search.viewall')}</span>
                </div>
              </div>
              {!!challenges.length ? (
                <>
                  {challenges.slice(this.state.currentPage * 5, (this.state.currentPage + 1) * 5).map((challenge) => (
                    <ResultCard key={ challenge.id } challenge={ challenge } />
                  ))}
                  <Paginate
                    previousLabel={ <PrevIcon /> }
                    nextLabel={ <NextIcon /> }
                    breakLabel={ '...' }
                    breakClassName={ 'break-me' }
                    pageCount={ Math.ceil(challenges.length / 5) }
                    forcePage={ this.state.currentPage }
                    marginPagesDisplayed={ 1 }
                    pageRangeDisplayed={ 5 }
                    onPageChange={ this.onPageChangeFromPagination }
                    containerClassName={ 'result-form-pagination' }
                    activeClassName={ 'active' }
                  />
                </>
              ) : (
                <p className='result-form-block__noresult'>{trans('search.challenge.noChallenge')}</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(ResultForm));
