import { AsyncStorage } from "react-native";

const initialDataObj = {
    React: {
        title: "React",
        questions: [
            {
                question: "What is React?",
                answer: "A library for managing user interfaces"
            },
            {
                question: "Where do you make Ajax requests in React?",
                answer: "The componentDidMount lifecycle event"
            }
        ]
    },
    JavaScript: {
        title: "JavaScript",
        questions: [
            {
                question: "What is a closure?",
                answer:
                    "The combination of a function and the lexical environment within which that function was declared."
            }
        ]
    },
    Naturalization: {
        title: "Naturalization",
        questions:[
            {
                question: "What is the political party of the President now?",
                answer: "Republican"
            },
            {
                question: "Where is the Statue of Liberty?",
                answer: "New York"
            },
            {
                question: "What is the capital of your state?",
                answer: "Albany"
            },
            {
                question: "Who is the Commander in Chief of the military?",
                answer: "the President"
            },
            {
                question: "What was one important thing that Abraham Lincoln did?",
                answer: "freed the slaves"
            },
            {
                question: "What is the highest court in the United States?",
                answer: "the Supreme Court"
            },
            {
                question: "What does the judicial branch do?",
                answer: "reviews laws, explains law, resolves disputes"
            },
            {
                question: "Why does the flag have 13 stripes?",
                answer: "13 original colonies"
            },
            {
                question: "What is the name of the national anthem?",
                answer: "The Star-Spangled Banner"
            },
            {
                question: "Who signs bills to become laws?",
                answer: "The President"
            },
        ]
    }

};

const ASYNC_KEY = "FLASHCARDS";

export const setInitialData = async () => {
    try {
        let response0 = await AsyncStorage.setItem(
            ASYNC_KEY,
            JSON.stringify(initialDataObj)
        );
        let response1 = await getAsyncData();
        return response1; // return an object back
    } catch (err) {
        console.log("setInitialData", err);
    }
};

export const getAsyncData = async () => {
    try {
        let response = await AsyncStorage.getItem(ASYNC_KEY);
        return JSON.parse(response); // returns an object back
    } catch (err) {
        console.log("getAsyncData", err);
    }
};

export const setAsyncTitle = async deckTitle => {
    try {
        const asyncObj = await getAsyncData();
        let response = await AsyncStorage.mergeItem(
            ASYNC_KEY,
            JSON.stringify({
                ...asyncObj,
                deckTitle: { title: deckTitle, questions: [] }
            })
        );
        return response;
    } catch (err) {
        console.log("setAsyncTitle", err);
    }
};

export const setAsyncQuestion = async (deckTitle, question, answer) => {
    try {
        const asyncObj = await getAsyncData();
        let response = await AsyncStorage.mergeItem(ASYNC_KEY, JSON.stringify({
            ...asyncObj,
            deckTitle: {
                ...asyncObj.deckTitle,
                questions: [
                    ...asyncObj.deckTitle.questions,
                    {
                        question,
                        answer
                    }
                ]
            }
        }));
        return response;
    } catch (err) {
        console.log("setAsyncQuestion", err);
    }
};
