import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PreviewCard from '../PreviewCard';
import {PreviewTypes, RouteConstants} from '../../constants';
import {NavigateActions} from '../../actions';
import {GenUtil} from '../../utility';
import ViewMore from '../../assets/images/dashboard/view-more.png';
import ViewMoreHover from '../../assets/images/dashboard/view-more--hover.png';
const translate = GenUtil.translate;

class Dashboard extends Component {
  viewMoreClick = (e, type) => {
    e.preventDefault();

    switch (type) {
      case 'streams':
        this.props.navigate(RouteConstants.STREAMS);
        break;
      case 'categories':
        this.props.navigate(RouteConstants.CATEGORIES);
        break;
      case 'challenges':
        this.props.navigate(RouteConstants.CHALLENGES);
        break;
      // no default
    }
  }

  viewMoreMouseOver = (e) => {
    e.preventDefault();
    e.currentTarget.src = ViewMoreHover;
  }

  viewMoreMouseOut = (e) => {
    e.preventDefault();
    e.currentTarget.src = ViewMore;
  }

  viewMore = (type) => {
    return(
      <div className='dashboard__view-more' id={ type } >
        <img
          className='dashboard__view-more-img'
          src={ ViewMore }
          alt={ type }
          onClick={ (e) => this.viewMoreClick(e, type) }
          onMouseOver={ (e) => (this.viewMoreMouseOver(e)) }
          onMouseOut={ (e) => (this.viewMoreMouseOut(e)) }
        />
      </div>
    );
  }

  render() {
    return (
      <>
        <div className='dashboard'>
          <div className='dashboard__carousel'>
            <PreviewCard type={ PreviewTypes.MAIN } id={ 1 }/>
          </div>
          <div className='dashboard__streams'>
            <div className='divider-radial'/>
            <div className='dashboard__header'>
              <span className='dashboard__header-txt'>
                {translate('dashboard.recommended')}
                <span className='streams'> {translate('dashboard.streams')}</span>
              </span>
              {this.viewMore('streams')}
              {
                /* TODO: RECOMMENDED STREAMS HERE */
                <PreviewCard type={ PreviewTypes.CATEGORIES } id={ 2 }/>
              }
            </div>
          </div>

          <div className='dashboard__categories'>
            <div className='divider-radial'/>
            <div className='dashboard__header'>
              <span className='dashboard__header-txt'>
                {translate('dashboard.recommended')}
                <span className='categories'> {translate('dashboard.categories')}</span>
              </span>
              {this.viewMore('categories')}
              {
                /* TODO: RECOMMENDED CATEGORIES HERE */
              }
            </div>
          </div>

          <div className='dashboard__challenges'>
            <div className='divider-radial'/>
            <div className='dashboard__header'>
              <span className='dashboard__header-txt'>
                {translate('dashboard.recommended')}
                <span className='challenges'> {translate('dashboard.challenges')}</span>
              </span>
              {this.viewMore('challenges')}
              {
                /* TODO: RECOMMENDED CHALLENGES HERE */
              }
            </div>
          </div>
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
)(Dashboard);
