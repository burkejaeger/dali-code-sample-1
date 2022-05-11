// some imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchPost,
} from '../actions/index';
import withRouter from './withRouter';

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

class Post extends Component {
  componentDidMount() {
  }

  openPost = (event) => {
    this.state.currentID = this.props.post.id;
  };

  // eslint-disable-next-line class-methods-use-this
  parseTags = (stringTags) => {
    const splitTags = stringTags.split(',');
    return splitTags;
  };

  // on-error image method adapted from https://www.codegrepper.com/code-examples/javascript/show+default+image+if+image+not+found+react
  render() {
    const defaultImg = 'https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif';
    return (
      <Link to={`./posts/${this.props.post.id}`} onClick={this.openPost}>
        <div className="post-thumbnail" role="link" tabIndex={this.props.id}>
          <img className="post-thumb-img" src={this.props.post.coverUrl} alt="cover" onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} />
          <div className="post-thumb-text">
            <span className="post-thumb-title"> Meet {this.props.post.title}! </span>
            <span className="post-thumb-tags"> Tags: {this.parseTags(this.props.post.tags)}</span>
          </div>
        </div>
      </Link>
    );
  }
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default withRouter(connect(mapStateToProps, { fetchPost })(Post));
