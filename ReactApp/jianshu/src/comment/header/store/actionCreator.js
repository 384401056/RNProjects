import * as actionTypes from './actionTypes';

export const search_focus = () => {
    return {
        type: actionTypes.SEACH_FOCUS,
        // value: true
    }
}

export const search_blur = () => {
    return {
        type: actionTypes.SEACH_BLUR,
        // value: false
    }
}

