import * as ACTIONS from "../constants/actions";

const initialState = [];

const uportMessagesReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.POLL_CHASQUI: {
      const { callbackId } = action;
      const index = state.findIndex(item => item.id === callbackId);
      if(index === -1) {
        return [
          ...state, {
            id: callbackId,
            loading: true
          }
        ];
      }
      break;
    }

    case ACTIONS.POLL_CHASQUI_OK: {
      const { callbackId } = action;
      const index = state.findIndex(item => item.id === callbackId);
      if(index !== -1) {
        return [
          ...state.slice(0, index), {
            ...state[index],
            loading: false,
            content: action.value
          },
          ...state.slice(index + 1)
        ];
      }
      break;
    }
  }
  return state;
};

export default uportMessagesReducer;
