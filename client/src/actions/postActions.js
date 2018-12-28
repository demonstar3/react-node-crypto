import {
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  POST_LOADING
} from "./types";
import axios from "axios";

export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/post", postData)
    .then(
      res => history.push(`/post/${res.data._id}`),
      res =>
        dispatch({
          type: ADD_POST,
          payload: res.data
        })
    )

    .catch(err => {
      console.log(err);
    });
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/post")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const deletePost = (id, history) => dispatch => {
  axios
    .delete(`/api/post/${id}`)

    .then(
      dispatch({
        type: DELETE_POST,
        payload: id
      }),
      history.push(`/`)
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};
