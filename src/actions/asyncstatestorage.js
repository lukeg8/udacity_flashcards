import { showLoading, hideLoading } from "./loading";
import {
    setInitialData,
    setAsyncTitle,
    setAsyncQuestion
} from "../utils/AsyncStorage";

export const SYNC_ASYNC_DATA = "SYNC_ASYNC_DATA";
export const NEW_DECK_TITLE = "NEW_DECK_TITLE";
export const NEW_CARD = "NEW_CARD";
export const NEW_DECK_QUESTION = "NEW_DECK_QUESTION";

export function syncAsyncWithState(asyncObj) {
    return {
        type: SYNC_ASYNC_DATA,
        flashcardsObj: asyncObj
    };
}

function newDeckTitle(deckTitle) {
    return {
        type: NEW_DECK_TITLE,
        deckTitle
    };
}

export function handleDeckTitle(deckTitle) {
    return dispatch => {
        dispatch(newDeckTitle(deckTitle));
        return setAsyncTitle(deckTitle);
    };
}

export function newDeckQuestion(deckTitle, question, answer) {
    return {
        type: NEW_DECK_QUESTION,
        deckTitle,
        question,
        answer
    };
}
export function handleDeckQuestion(deckTitle, question, answer) {
    return dispatch => {
        dispatch(newDeckQuestion(deckTitle, question, answer));
        return setAsyncQuestion(deckTitle, question, answer);
    };
}

export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading());
        return setInitialData().then(asyncObj => {
            dispatch(syncAsyncWithState(asyncObj));
            dispatch(hideLoading())
        });
    };
}
