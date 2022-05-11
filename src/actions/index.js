import axios from 'axios';

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=b_jaeger';

axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
  // do something with response.data  (some json)
}).catch((error) => {
  // hit an error do something else!
});

// or
// const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  DELETE_POST: 'DELETE_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  ERROR_SET: 'ERROR_SET',
};

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // dispatch error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePost(id, navigate) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
        navigate('../');
      })
      .catch((error) => {
        // dispatch error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, post)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createPost(post, navigate) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then((response) => {
        // dispatch a redux action with the response data
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        navigate('/');
      })
      .catch((error) => {
        // dispatch error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
