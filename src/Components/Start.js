import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/asyncstatestorage";
import Loading from "./Loading";
import { createStackNavigator } from "react-navigation";
import DeckList from "./DeckList";
import SingleDeckNav from "./OneDeck";
import NewDeckTitle from "./NewDeckTitle";
import NewQuestion from "./NewQuestion";
import OneDeck from "./OneDeck";
import Card from "./Card";
import { setLocalNotification } from "../utils/Notifications";

const StartStackNavigator = createStackNavigator(
    {
        DeckList: {
            screen: DeckList
        },
        SingleDeckNav: {
            screen: SingleDeckNav
        },
        NewDeckTitle: {
            screen: NewDeckTitle
        },
        NewQuestion: {
            screen: NewQuestion
        },
        OneDeck: {
            screen: OneDeck
        },
        Card: {
            screen: Card
        }
    },
    {
        initialRouteName: "DeckList"
    }
);

class Start extends Component {
    componentDidMount() {
        this.props.handleInitialData();
        setLocalNotification();
    }
    render() {
        const { loading } = this.props;
        if (loading) {
            return <Loading />;
        }
        return <StartStackNavigator />;
    }
}

function mapStateToProps({ loading }) {
    return {
        loading
    };
}

function mapStateToDispatch(dispatch) {
    return bindActionCreators({ handleInitialData }, dispatch);
}
export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Start);
