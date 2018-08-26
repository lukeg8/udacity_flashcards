import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import reducers from "./src/reducers";
import middleware from "./src/middleware";
import Start from "./src/Components/Start";
const store = createStore(reducers, middleware);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Start />
            </Provider>
        );
    }
}
