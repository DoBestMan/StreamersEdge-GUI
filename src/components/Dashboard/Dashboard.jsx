import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigateActions} from '../../actions';
import {GenUtil} from '../../utility';
import {RouteConstants} from '../../constants';
import {withStyles} from '@material-ui/core/styles';
import {ChallengeService} from '../../services';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ChallengeGrid from './ChallengeGrid';
import ChallengeCarousel from './ChallengeCarousel';
import FortniteCover from '../../assets/images/dashboard/games/fortnite-cover.jpg';
import PubgCover from '../../assets/images/dashboard/games/pubg-cover.jpg';
import LolCover from '../../assets/images/dashboard/games/lol-cover.jpg';
import ViewMore from '../../assets/images/dashboard/viewMore.png';
import styles from './MUI.css';

const translate = GenUtil.translate;

class Dashboard extends Component {

  state = {
    challenges: []
  };

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

  componentDidMount = () => {
    this.fetchChallenges();
  }

  fetchChallenges = () => {
    ChallengeService.getChallenges().then((challengeData) => {
      this.setState({
        challenges: challengeData
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  viewMore = (type) => {
    return(
      <div className='dashboard__view-more' id={ type } >
        <img
          className='dashboard__view-more-img'
          src={ ViewMore }
          alt={ type }
          onClick={ (e) => this.viewMoreClick(e, type) }
        />
      </div>
    );
  }

  clickLeague = () => {
    console.log('League of Legends');
  }

  clickPubg = () => {
    console.log('Pubg');
  }

  clickFortnite= () => {
    console.log('Fortnite');
  }

  render() {
    const {classes} = this.props;

    return (
      <>
        <div className='dashboard'>
          <ChallengeCarousel challenges={ this.state.challenges }/>
          <div className='dashboard__categories'>
            <div className='dashboard__header'>
              <span className='dashboard__header-txt'>
                {translate('dashboard.recommended')}
                <span className='categories'> {translate('dashboard.categories')}</span>
              </span>
              {this.viewMore('categories')}
              <div className='dashboard__header-bar'>
                <div className='dashboard__header-bar--blue'/>
              </div>

              <div className='dashboard__card-container'>
                <Card className='dashboard__card'>
                  <CardActionArea>
                    <CardMedia
                      className={ classes.card }
                      component='img'
                      alt={ translate('dashboard.games.fortnite') }
                      height='380'
                      image={ FortniteCover }
                      title={ translate('dashboard.games.fortnite') }
                      onClick={ this.clickFortnite }
                    />
                    <div className='dashboard__card-overlay'>
                      Fortnite
                    </div>
                    <div className='dashboard__card-genre'>{translate('dashboard.genres.shooter')}</div>
                  </CardActionArea>
                </Card>

                <Card className='dashboard__card'>
                  <CardActionArea>
                    <CardMedia
                      className={ classes.card }
                      component='img'
                      alt={ translate('dashboard.games.pubg') }
                      height='380'
                      image={ PubgCover }
                      title={ translate('dashboard.games.pubg') }
                      onClick={ this.clickPubg }
                    />
                    <div className='dashboard__card-overlay'>
                      Pubg
                    </div>
                    <div className='dashboard__card-genre'>{translate('dashboard.genres.shooter')}</div>
                  </CardActionArea>
                </Card>

                <Card className='dashboard__card'>
                  <CardActionArea>
                    <CardMedia
                      className={ classes.card }
                      component='img'
                      alt={ translate('dashboard.games.lol') }
                      height='380'
                      image={ LolCover }
                      title={ translate('dashboard.games.lol') }
                      onClick={ this.clickLeague }
                    />
                    <div className='dashboard__card-overlay'>
                      Lol
                    </div>
                    <div className='dashboard__card-genre'>{translate('dashboard.genres.strategy')}</div>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>

          <div className='dashboard__challenges'>
            <div className='dashboard__header'>
              <span className='dashboard__header-txt'>
                {translate('dashboard.recommended')}
                <span className='challenges'> {translate('dashboard.challenges')}</span>
              </span>
              {this.viewMore('challenges')}
              <div className='dashboard__header-bar'>
                <div className='dashboard__header-bar--green'/>
              </div>
              <ChallengeGrid challenges={ this.state.challenges }/>
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
)(withStyles(styles)(Dashboard));
