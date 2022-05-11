// some imports
import {
  Alert, TextField, Button, Slide,
} from '@mui/material';
import Grow from '@mui/material/Grow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchPost, deletePost, updatePost,
} from '../actions/index';
import withRouter from './withRouter';

function mapStateToProps(reduxState) {
  return {
    current: reduxState.posts.current,
  };
}

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      incompletePopup: false,
    };
  }

  componentDidMount() {
    const { postID } = this.props.params;
    this.props.fetchPost(postID);
  }

  onStartEdit = (event) => {
    this.setState({
      title: this.props.current.title,
      tags: this.props.current.tags,
      content: this.props.current.content,
      coverUrl: this.props.current.coverUrl,
      isEditing: true,
    });
  };

  onSave = (event) => {
    if (this.state.title === '' || this.state.tags === '' || this.state.content === '' || this.state.coverUrl === '') {
      this.setState({ incompletePopup: true });
    } else {
      this.setState({ isEditing: false });
      const editedPost = {
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        coverUrl: this.state.coverUrl,

      };
      this.props.updatePost(this.props.current.id, editedPost);
    }
  };

  onDelete = (event) => {
    this.props.deletePost(this.props.current.id, this.props.navigate);
  };

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onTagsChange = (event) => {
    this.setState({ tags: event.target.value });
  };

  onContentChange = (event) => {
    this.setState({ content: event.target.value });
  };

  onCoverChange = (event) => {
    this.setState({ coverUrl: event.target.value });
  };

  render() {
    const defaultImg = 'https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif';
    if (!this.state.isEditing) {
      return (
        <div className="post-detail-screen">
          <Slide in={!this.state.isEditing} direction="up" mountOnEnter unmountOnExit>
            <div className="post-detail-box">
              <img className="post-detail-img" src={this.props.current.coverUrl} alt="cover" onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} />
              <div className="post-detail-column">
                <div className="post-detail-text">
                  <div className="detail-title">{this.props.current.title} says hi!</div>
                  <div>{this.props.current.content}</div>
                  <span>Tags: {this.props.current.tags} </span>
                </div>

                <div className="post-detail-button-menu">
                  <Button type="button" onClick={this.onDelete}>
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                  </Button>
                  <Button className="back-button" type="button">
                    <Link to="../">
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                    </Link>

                  </Button>
                  <Button type="button" onClick={this.onStartEdit}>
                    <span className="material-symbols-outlined">
                      edit
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      );
    } else {
      return (
        <div className="post-detail-screen">
          <Grow in={this.state.isEditing}>
            <div className="post-detail-box-editing">
              <div className="detail-title"> Edit <br />{this.state.title}&#39;s listing </div>
              <div className="new-post-input-spacer" />
              <TextField label="Name" variant="standard" type="text" onChange={this.onTitleChange} value={this.state.title} />
              <div className="new-post-input-spacer" />
              <TextField label="Tags" variant="standard" type="text" onChange={this.onTagsChange} value={this.state.tags} />
              <div className="new-post-input-spacer" />
              <TextField label="Description" variant="standard" type="text" onChange={this.onContentChange} value={this.state.content} />
              <div className="new-post-input-spacer" />
              <TextField label="Cover URL" variant="standard" type="text" onChange={this.onCoverChange} value={this.state.coverUrl} />
              <div className="new-post-input-spacer" />
              <div className="post-button-menu">
                <Button type="button" onClick={this.onDelete}>
                  <span className="material-symbols-outlined">
                    delete
                  </span>
                </Button>
                <Button type="button" onClick={this.onSave}>
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
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(PostDetail));
