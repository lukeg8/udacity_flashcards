import {
    SYNC_ASYNC_DATA,
    NEW_DECK_TITLE,
    NEW_DECK_QUESTION
} from "../actions/asyncstatestorage";

export default function asyncStateStorage(state = {}, action) {
    switch (action.type) {
        case SYNC_ASYNC_DATA:
            return action.flashcardsObj;
        case NEW_DECK_TITLE:
            return {
                ...state,
                [action.deckTitle]: {
                    title: action.deckTitle,
                    questions: []
                }
            };
        case NEW_DECK_QUESTION:
            return {
                ...state,
                [action.deckTitle]: {
                    ...state[action.deckTitle],
                    questions: [
                        ...state[action.deckTitle].questions,
                        {
                            question: action.question,
                            answer: action.answer
                        }
                    ]
                }
            };
        default:
            return state;
    }
}
