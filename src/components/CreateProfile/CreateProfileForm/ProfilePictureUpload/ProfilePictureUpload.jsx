

import React, {Component} from 'react';
import axios from 'axios';
import {avatar, avatar_frame, avatar_frame_over, avatar_over} from '../../../../assets/images/avatar';
import {translate} from '../../../../utility/GeneralUtils';
/**
 * @state {File} selectedFile (selected image file),
 * @state {number} loaded (loading percentage of file upload)
 * @props {number} maxFileSize (max file size for image in bytes)
 * @props {function} error (function which takes in a string. Use this to return errors)
 */
class ProfilePictureUpload extends Component{
  constructor(props) {
    super(props);

    this.state = {selectedFile: null, loaded: null};
    
    this.onChooseFile = this.onChooseFile.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }
  
  onChooseFile(event) {
    const file = event.target.files[0];
    
    if(!!file && this.checkMimeType(file) && this.maxSelectFile(file)) {
      this.setState({
        selectedFile: file
      });
      
      this.onUpload(file);
    }
  }

  onUpload() {
    const data = new FormData(); 
    data.append('file', this.state.selectedFile);

    axios.post('http://localhost:8082/upload', data, {
      onUploadProgress: (ProgressEvent) => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100)
        });
      }
    }).catch((err) => {
      !!this.props.error ? this.props.error(err) : console.log(err);
    });
  }

  maxSelectFile(file) {
    const maxFileSize = !!this.props.maxFileSize ? this.props.maxFileSize : 1024000; //1MB

    if(file.size > maxFileSize) {
      const err = file.type + translate('errors.username.maxFileSize');
      !!this.props.error ? this.props.error(err) : console.log(err);

      return false;
    } else {
      return true;
    }
  }

  checkMimeType(file) {
    let err = null;
    // list allow mime type
    const types = ['image/png', 'image/jpeg'];

    if(types.every((type) => file.type !== type)) {
      err = file.type + translate('errors.username.imageTypeUnsupported');
      !!this.props.error ? this.props.error(err) : console.log(err);

      return false;
    } else {
      return true;
    }

  }

  changeImage(e, image) {
    e.currentTarget.src = image;
  }

  defaultProfilePicture() {
    return (
      <>
        <label htmlFor='file-input'>
          <img className='profile-frame' src={ avatar }  onMouseOver={ (e) => this.changeImage(e, avatar_over) } onMouseOut={ (e) => this.changeImage(e, avatar) } alt=''/>
        </label>

        <input className='image-upload' id='file-input' type='file' onChange={ this.onChooseFile }/>
      </>
    );
  }

  userProfilePicture() {
    return (
      <>
        <div className='profile-picture-wrapper'>
          <label htmlFor='file-input'>
            <img className='profile-picture' src={ URL.createObjectURL(this.state.selectedFile) } alt=''/>
            <img className='profile-frame' src={ avatar_frame } onMouseOver={ (e) => this.changeImage(e, avatar_frame_over) } onMouseOut={ (e) => this.changeImage(e, avatar_frame) } alt=''/>
          </label>
        </div>

        <input className='image-upload ' id='file-input' type='file' onChange={ this.onChooseFile }/>
      </>
    );
  }

  render(){
    return(
      <>
        {this.state.loaded === 100 ?  this.userProfilePicture() : this.defaultProfilePicture()}
      </>
    );
  }
}

export default ProfilePictureUpload;