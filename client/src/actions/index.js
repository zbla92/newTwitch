import streams from '../apis/streams'
import history from '../history';

import { 
    SIGN_IN,
     SIGN_OUT,
      CREATE_STREAM,
      FETCH_STREAMS,
      FETCH_STREAM,
      DELETE_STREAM,
      EDIT_STREAM
      } from './types'

//Action to Sign in the user used by OAuth
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}


//Action to Sign Out the user used by OAuth
export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

//Action to create new stream and post to json server  // 
//GetState is used to get userID and store it in every stream that gets created
export const createStream = formValues => async (dispatch, getState) => {
    //console.log(formValues)
    const {userId} = getState().auth;
    const response = await streams.post('./streams', {...formValues, userId});
    
    dispatch({type: CREATE_STREAM, payload: response.data})
        // how to navigate around using browser history object I created
    history.push('/')
};

//Action creator to fetch lsit of streams
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data})
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`)

    dispatch({type: DELETE_STREAM, payload: id});
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues)

    dispatch({ type: EDIT_STREAM, payload: response.data })
}   

