/* eslint-disable jsdoc/valid-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import {ErrorBoxActions} from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/**
 * @enum {margin}
 */
const margin = {
  NONE: 'none',
  DENSE: 'dense',
  NORMAL: 'normal'
};

/**
 * @private
 * You may optionally provide some image files.
 *
 * @param {Image} iconLeft - The default state of the left side icon.
 * @param {Image} iconLeftActive - The active state of the left side icon.
 * @param {Image} iconRight - The default state of the right side icon.
 * @param {Image} iconRightActive - The active state of the right side icon.
 * Providing the left or right without an active version will result in the active image being supplemented with the provided image.
 *
 * You may provide a theme to use.
 * @param {string} theme - Ie: `basic`, `login`, `minimal`.
 * `basic` is the default.
 *
 * Other optional props, some are required depending on others.
 * @param {string} placeholder - Placeholder text.
 * @param {Function} handleChange - Callback handler for onChange event.
 * @param {Function} onBlur - Callback handler for onBlur event.
 * @param {Function} handleRightIconClick - Callback handler for onClick event for the icon-right.
 * @param {boolean} hasActiveGlow - Default `false`. Sets the style that controls whether or not the elements will have a glow on "active" state.
 * @param {boolean} required - If true, the label is displayed as required and the input element` will be required.
 * @param {boolean} multiline - If true, a textarea element will be rendered instead of an input.
 * @param {string | number} rows - Number of rows to display when multiline option is set to true.
 * @param {string | number} rowsMax - Maximum number of rows to display when multiline option is set to true.
 * @param {string} name - Name attribute of the input element.
 * @param {boolean} autoFocus - If true, the input element will be focused during the first mount.
 * @param {boolean} fullWidth - Default `true`. If true, the input will take up the full width of its container.
 * @param {margin} margin - Default `normal`. If dense or normal, will adjust vertical spacing of this and contained components.
 * @param {string} type - Default `string`. Type of the input element. It should be a valid HTML5 input type.
 * @param {string} inputClass - Name of class to pass into MUI's InputProps.
 *
 * @class CSSInput
 * @augments {Component}
 */
class CustomInput extends Component {
  constructor(props) {
    super(props);

    const dummyHandler = () => {};

    const value = this.props.value;
    const theme = this.props.theme || 'basic';
    const glow = this.props.hasActiveGlow || false;
    const activeClass = glow ? '--active' : '--active-glowless';
    const iconLeft = this.props.iconLeft || null;
    const iconRight = this.props.iconRight || null;
    const handleChange = this.props.handleChange || dummyHandler;
    const onBlur = this.props.onBlur || dummyHandler;
    const handleRightIconClick = this.props.handleRightIconClick || dummyHandler;
    const wrapperClassName = `custom-input-${theme}__wrapper`;
    let inputClassName = `custom-input-${theme}__mui`;
    let iconRightWrapperClassName = `custom-input-${theme}__icon-right-wrapper`;

    if (iconLeft && iconRight) {
      inputClassName += '-icon-both';

      if (handleRightIconClick !== dummyHandler) {
        iconRightWrapperClassName += '-callback';
      }
    } else if (iconRight) {
      inputClassName += '-icon-right';
    } else if (iconLeft) {
      inputClassName += '-icon-left';
    }

    this.state = {
      activeClass,
      inputClassName,
      iconLeft,
      iconRight,
      handleChange,
      handleRightIconClick,
      wrapperClassName,
      errorBoxValidation: {
        visibility: false,
        validationConditions: []
      },
      iconRightWrapperClassName,
      value: value || '',
      isInputActive: false,
      theme,
      onBlur
    };
  }

  toggleActiveImage = (value, type) => {
    const useActiveImages = () => {
      this.setState({
        wrapperClassName: this.state.wrapperClassName + this.state.activeClass,
        iconRightWrapperClassName: this.state.iconRightWrapperClassName + this.state.activeClass,
        iconLeft: this.props.iconLeftActive || this.state.iconLeft,
        iconRight: this.props.iconRightActive || this.state.iconRight
      });
    };

    const useDefaultImages = () => {
      this.setState({
        wrapperClassName: this.state.wrapperClassName.replace(this.state.activeClass, ''),
        iconRightWrapperClassName: this.state.iconRightWrapperClassName.replace(this.state.activeClass, ''),
        iconLeft: this.props.iconLeft || this.state.iconLeft,
        iconRight: this.props.iconRight || this.state.iconRight
      });
    };

    const wrappersAreActive = () => {
      let hasActive = false;

      if (
        this.state.wrapperClassName.indexOf(this.state.activeClass) === -1 ||
        this.state.iconRightWrapperClassName.indexOf(this.state.activeClass) === -1
      ) {
        return true;
      }

      return hasActive;
    };

    switch(type) {
      case 'mouseOver':
        if (wrappersAreActive()) {
          useActiveImages();
        }

        break;
      case 'focus':
        this.setState({
          isInputActive: true
        });

        if (wrappersAreActive()) {
          useActiveImages();
        }

        break;
      case 'mouseOut':
      case 'divMouseOut':
        if (!this.state.isInputActive && this.state.value === '') {
          useDefaultImages();
        }

        break;
      case 'blur':
        if (this.state.value === '') {
          this.setState({
            isInputActive: false
          });

          useDefaultImages();
        }

        break;

      // no default
    }
  }

  onMouseOver = (e) => {
    this.toggleActiveImage(e.target.value, 'mouseOver');
  }

  onMouseOut = (e) => {
    this.toggleActiveImage(e.target.value, 'mouseOut');
  }

  onDivMouseOut = () => {
    this.toggleActiveImage('', 'divMouseOut');
  }

  onFocus = (e) => {
    this.toggleActiveImage(e.target.value, 'focus');
  }

  // Equivalent to losing input focus
  onBlur = (e) => {
    this.state.onBlur();
    this.toggleActiveImage(e.target.value, 'blur');
  }

  onChange = (e) => {
    this.setState({value: e.target.value});
    // Use the props onChange handler.
    this.state.handleChange(e.target.value);
  }

  render() {
    const {classes} = this.props;
    const autofocus = this.props.autofocus || false;
    const rows = this.props.rows || 5;
    const rowsMax = this.props.rowsMax || rows;
    const height = this.props.multiline ? (10 * (rows * 1.7)).toString() + 'px' : '10px';
    const fullWidth = this.props.fullWidth || true;
    const margin = this.props.margin || 'normal';
    const multiline = this.props.multiline || false;
    const name = this.props.name || '';
    const placeholder = this.props.placeholder || '';
    const required = this.props.required || false;
    const type = this.props.type || 'string';
    const muiInputClass = classes[this.props.muiInputClass] || classes.input;

    const showErrorBox = (visibility, validationConditions, position) => {
      this.props.setErrorBox(visibility, validationConditions, position);
      setTimeout(() => {
        this.props.hideErrorBox();
      }, 3500);

    };

    const wrapperStyle = {
      height: height
    };

    let wrapperClassName = this.state.wrapperClassName;
    let iconRight = this.props.iconRight || this.props.iconRightActive || null;

    if (this.props.isValid){
      if (this.props.isValid()){
        iconRight = null;
      } else {
        if (wrapperClassName.endsWith('--active')) {
          wrapperClassName += '-red';
        }
      }
    }

    return (
      <>
        <div
          className={ wrapperClassName }
          onMouseOver={ this.onMouseOver }
          onMouseOut={ this.onDivMouseOut }
          style={ wrapperStyle }
        >
          {
            this.state.iconLeft
              ? <div className='custom-input__left'><img className={ `custom-input-${this.state.theme}__icon-left` } src={ this.state.iconLeft } alt=''/></div>
              : null
          }
          {
            iconRight
              ? <div className={ 'custom-input__right' }>
                <div className={ this.state.iconRightWrapperClassName } onClick={ (e) => showErrorBox(true, this.state.handleRightIconClick(), e.target.getBoundingClientRect()) }>
                  <img className={ `custom-input-${this.state.theme}__icon-right` } src={ this.state.iconRight } alt=''/>
                </div></div>
              : null
          }
          <div className='custom-input__center'>
            <FormControl margin={ margin } fullWidth={ fullWidth }>
              <TextField
                autoFocus={ autofocus }
                className={ this.state.inputClassName }
                InputProps={ {disableUnderline: true} }
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={ {className: muiInputClass} }
                multiline={ multiline }
                name={ name }
                value = { this.state.value }
                onChange={ (e) => this.onChange(e) }
                onFocus={ (e) => this.onFocus(e) }
                onBlur={ (e) => this.onBlur(e) }
                onMouseOver={ this.onMouseOver }
                onMouseOut={ (e) => this.onMouseOut(e) }
                placeholder={ placeholder }
                required={ required }
                rows={ rows }
                rowsMax={ rowsMax }
                type={ type }
              />
            </FormControl>
          </div>
        </div>
      </>
    );
  }
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleRightIconClick: PropTypes.func,
  hasActiveGlow: PropTypes.bool,
  name: PropTypes.string,
  theme: PropTypes.string,
  isValid: PropTypes.func,
  inputClass: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  rowsMax: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  type: PropTypes.string
};


const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setErrorBox: ErrorBoxActions.setErrorBox,
    hideErrorBox: ErrorBoxActions.hideErrorBox
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomInput));
