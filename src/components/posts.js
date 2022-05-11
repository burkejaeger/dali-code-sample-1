// some imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slide from '@mui/material/Slide';
import {
  fetchPosts,
} from '../actions/index';
import Post from './post';

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
  };
}

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSlide: true,
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (this.props.posts) {
      return (
        <div className="posts-background">
          <Slide direction="up" in={this.state.isSlide} mountOnEnter unmountOnExit>
            <div className="posts-display">
              {Object.entries(this.props.posts).map(([key, post]) => {
                return (
                  <li className="post-thumb" key={post.id} id={post.id} post={post}>
                    <Post key={post.id} id={post.id} post={post} />
                  </li>
                );
              })}
            </div>
          </Slide>
        </div>
      );
    } else {
      return (
        <div> NO POSTS YET</div>
      );
    }
  }
}

export default connect(mapStateToProps, { fetchPosts })(AllPosts);
