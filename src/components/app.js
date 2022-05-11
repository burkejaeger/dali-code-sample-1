import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, NavLink,
} from 'react-router-dom';

import PostDetail from './postdetail';
import NewPost from './newpost';
import Posts from './posts';

function App(props) {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost navigate="/" />} />
          <Route path="/posts/:postID" element={<PostDetail />} />
          <Route path="*" element={<div>post not found </div>} />
        </Routes>
      </div>
    </Router>
  );
}

function Nav(props) {
  return (
    <nav>
      <div className="app-standard-header">
        <span id="pawprint-header" className="material-symbols-outlined">
          pets
        </span>
        <div className="new-friends">newfriends</div>
      </div>
      <ul>
        <li>
          <NavLink to="/">
            <span id="home-button" className="material-symbols-outlined">
              home
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts/new">
            <span id="new-post-button" className="material-symbols-outlined">
              add
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default App;
