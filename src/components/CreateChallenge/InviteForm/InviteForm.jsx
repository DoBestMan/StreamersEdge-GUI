import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {Grid, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import ReactTags from 'react-tag-autocomplete';
import {GenUtil} from '../../../utility';
import AuthService from '../../../services/AuthService';
import styles from './Mui.css';

const trans = GenUtil.translate;

class InviteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: []
    };
  }

  componentDidMount() {
    AuthService.getUserList().then((res) => {
      this.setState({
        suggestions: res.map((user) => ({id: user.id, name: user.username}))
      }, () => {
        const tags = this.props.invitedAccounts.map((invitedId) => {
          const finded = this.state.suggestions.find((suggestion) => suggestion.id === invitedId);

          return finded;
        });

        this.setState({tags});
      });
    });
  }

  handleChangeAccessRule = (event) => {
    this.props.onChange('accessRule', event.target.value);
  }

  handleRemoveSuggestion = (index) => {
    const tags = this.state.tags.slice(0);
    tags.splice(index, 1);
    this.setState({tags});

    const invited = this.props.invitedAccounts;
    invited.splice(index, 1);
    this.props.onChange('invitedAccounts', invited);
  }

  handleAddSuggestion = (tag) => {
    const tags = [
      ...this.state.tags,
      {
        id: tag.id,
        name: `@${tag.name}`
      }
    ];
    this.setState({tags});

    this.props.onChange('invitedAccounts', [...this.props.invitedAccounts, tag.id]);
  }

  handleFilterSuggestion = (item, query) => {
    const hasItem = this.state.tags.find((tag) => tag.name === `@${item.name}`);

    if (hasItem) {
      return false;
    }

    let newQuery = query;

    if (!!query.length && query[0] === '@') {
      newQuery = query.slice(1);
    }

    return item.name.includes(newQuery);
  }

  render() {
    const {classes} = this.props;

    return (
      <>
        <div className='invite-form'>
          <Grid container>
            <Grid item xs={ 4 }>
              <p className='invite-form--label'>{ trans('createChallenge.invite.condition.label') }</p>
              <RadioGroup
                aria-label='invite-conditions'
                name='invite'
                value={ this.props.accessRule }
                onChange={ this.handleChangeAccessRule }
              >
                <FormControlLabel
                  classes={ {label: classes.formLabel} }
                  value='invite'
                  control={ <Radio classes={ {root: classes.radio} } /> }
                  label={ trans('createChallenge.invite.condition.conditions.invite') }
                />
                <FormControlLabel
                  classes={ {label: classes.formLabel} }
                  value='anyone'
                  control={ <Radio classes={ {root: classes.radio} } /> }
                  label={ trans('createChallenge.invite.condition.conditions.any') }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={ 8 } className={ classNames({'invite-form__invisible': this.props.accessRule === 'anyone'}) }>
              <p className='invite-form--label'>{ trans('createChallenge.invite.challenge') }</p>
              <ReactTags
                tags={ this.state.tags }
                suggestions={ this.state.suggestions }
                placeholder=''
                minQueryLength={ 1 }
                maxSuggestionsLength={ this.state.suggestions.length }
                suggestionsFilter={ this.handleFilterSuggestion }
                handleDelete={ this.handleRemoveSuggestion }
                handleAddition={ this.handleAddSuggestion }
              />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(InviteForm);