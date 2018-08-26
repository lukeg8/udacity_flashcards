import React, { Component } from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { handleDeckQuestion } from "../actions/asyncstatestorage";
import { bindActionCreators } from "redux";

class NewQuestion extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `New Question - ${navigation.state.params.deckTitle}`,
            headerStyle: {
                backgroundColor: "#5b23c4"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                flex: 1
            }
        };
    };
    state = {
        question: "",
        answer: ""
    };
    handleSubmit = () => {
        const deckTitle = this.props.deckTitle;
        this.props.handleDeckQuestion(
            deckTitle,
            this.state.question,
            this.state.answer
        );
        this.props.navigation.navigate("OneDeck", {
            deckTitle
        });
    };
    render() {
        const { deckTitle } = this.props;
        return (
            <View style={styles.container}>
                <Text
                    style={styles.textDeck}
                >{`Add Card to Deck : ${deckTitle}`}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={question => this.setState({ question })}
                    value={this.state.question}
                    placeholder="Question here"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={answer => this.setState({ answer })}
                    value={this.state.answer}
                    multiline={true}
                    numberOfLines={2}
                    placeholder="Answer here"
                />
                <Button
                    disabled={
                        this.state.question === "" || this.state.answer === ""
                    }
                    onPress={this.handleSubmit}
                    title="submit"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    textDeck: {
        fontSize: 20
    },
    textInput: {
        alignSelf: "stretch",
        margin: 10,
        backgroundColor: "white"
    }
});

function mapStateToProps({}, { navigation }) {
    const deckTitle = navigation.getParam("deckTitle");
    return {
        deckTitle
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleDeckQuestion }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewQuestion);
