import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import withRouter from './withRouter';
import { createPost } from '../actions/index';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {

      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      incompletePopup: false,
      newPageTransition: true,

    };
  }

  // onTitleChange
  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  // onTagChange
  onTagChange = (event) => {
    this.setState({ tags: event.target.value });
  };

  // onContentChange
  onContentChange = (event) => {
    this.setState({ content: event.target.value });
  };

  onCoverChange = (event) => {
    this.setState({ coverUrl: event.target.value });
  };

  onSubmit = (event) => {
    if (this.state.title === '' || this.state.tags === '' || this.state.content === '' || this.state.coverUrl === '') {
      this.setState({ incompletePopup: true });
    } else {
      // const newPostTagsArray = this.state.tags.split(',');
      const newPost = {
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        coverUrl: this.state.coverUrl,
      };
      this.props.createPost(newPost, this.props.navigate);
    }
  };

  onDiscard = (event) => {
    this.setState({
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
    });
  };

  render() {
    return (
      <div className="new-post-page">
        <Grow in={this.state.newPageTransition}>
          <div className="new-post-box">
            <div className="create-header">
              <div className="create-title"> Post a <br />New Friend. </div>
              <span id="waving-hand" className="material-symbols-outlined">
                waving_hand
              </span>
            </div>
            <div className="new-post-input-spacer" />
            <TextField label="Name" variant="standard" type="text" className="new-post-title" onChange={this.onTitleChange} value={this.state.title} />
            <div className="new-post-input-spacer" />
            <TextField label="Tags" variant="standard" type="text" className="new-post-tags" onChange={this.onTagChange} value={this.state.tags} />
            <div className="new-post-input-spacer" />
            <TextField label="Description" variant="standard" type="text" className="new-post-content" onChange={this.onContentChange} value={this.state.content} />
            <div className="new-post-input-spacer" />
            <TextField label="Cover URL" variant="standard" type="text" className="new-post-coverURL" onChange={this.onCoverChange} value={this.state.coverUrl} />
            <div className="new-post-input-spacer" />
            <div className="post-button-menu">
              <Button type="button" onClick={this.onDiscard}>
                <Link to="../">

                  <span className="material-symbols-outlined">
                    arrow_back
                  </span>

                </Link>
              </Button>
              <Button type="submit" onSubmit={this.onSubmit} onClick={this.onSubmit} value={this.state}>
                <span className="material-symbols-outlined">
                  done
                </span>
              </Button>
            </div>
            {this.state.incompletePopup ? (
              <Alert severity="error"> Please Complete All Fields </Alert>
            ) : null}
          </div>
        </Grow>
      </div>
    );
  }
}

export default (withRouter(connect(null, { createPost })(NewPost)));
