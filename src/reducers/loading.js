import { IS_LOADING } from "../constants/actions";

const initialState = [];

export default (state=initialState, action) => {
    const {type} = action;
    let id, status, index;
    switch(type) {
        case IS_LOADING:
            id = action.id;
            status = action.status;
            index = state.findIndex(taskId => taskId===id);
            if(status) {
                return [
                    ...state,
                    id
                ];
            } else if(index!==-1) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            break;
            
        default:
            return state;
    }
};
