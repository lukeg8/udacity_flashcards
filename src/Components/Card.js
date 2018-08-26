import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Card extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Quiz - ${navigation.state.params.deckTitle}`,
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
        deckQuestionArray: this.props.deckQuestionArray,
        deckQuestionLength: this.props.deckQuestionLength,
        deckQuestionIndex: 0,
        numberOfCorrect: 0,
        cardSide: "question"
    };
    resetQuiz = () => {
        this.setState({
            cardSide: "question",
            deckQuestionIndex: 0,
            numberOfCorrect: 0
        });
    };
    nextQuestion = result => {
        if (result === "correct") {
            this.setState(prevState => ({
                numberOfCorrect: prevState.numberOfCorrect + 1
            }));
        }
        this.setState(prevState => ({
            cardSide: "question",
            deckQuestionIndex: prevState.deckQuestionIndex + 1
        }));
    };
    toggleCardSide = () => {
        if (this.state.cardSide === "question") {
            this.setState({
                cardSide: "answer"
            });
        } else {
            this.setState({
                cardSide: "question"
            });
        }
    };
    render() {
        const {
            deckQuestionArray,
            deckQuestionLength,
            deckQuestionIndex,
            cardSide
        } = this.state;
        const { navigation, deckTitle } = this.props;
        if (deckQuestionIndex < deckQuestionLength) {
            return (
                <View>
                    <Text style={styles.textDeck}>{`Deck: ${deckTitle}`}</Text>
                    <TouchableOpacity onPress={this.toggleCardSide}>
                        <View style={styles.card}>
                            <Text
                            >{`${deckQuestionIndex}/${deckQuestionLength}`}</Text>
                            <Text>
                                {deckQuestionArray[deckQuestionIndex][cardSide]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View style={styles.buttonView}>
                            <Button
                                onPress={this.toggleCardSide}
                                title="Flip Card"
                                color="green"
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                onPress={() => this.nextQuestion("correct")}
                                title="Correct"
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                onPress={() => this.nextQuestion("incorrect")}
                                title="Incorrect"
                                color="red"
                            />
                        </View>
                    </View>
                </View>
            );
        } else {
            const { numberOfCorrect, deckQuestionLength } = this.state;
            return (
                <View>
                    <View style={styles.card}>
                        <Text style={styles.textDeck}>Result</Text>
                        <Text
                            style={{ fontSize: 30 }}
                        >{`Score: ${(numberOfCorrect / deckQuestionLength) *
                            100}%`}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            onPress={() => this.resetQuiz()}
                            title="Restart Quiz"
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            onPress={() =>
                                navigation.navigate("OneDeck", { deckTitle })
                            }
                            title="Back to Deck"
                        />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    textDeck: {
        fontSize: 20
    },
    card: {
        borderColor: "black",
        borderWidth: 10,
        borderRadius: 20,
        padding: 5,
        margin: 10,
        backgroundColor: "#cddbf2",
        height: 150,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonView: {
        margin: 20,
        borderWidth: 3,
        borderColor: "black"
    }
});

function mapStateToProps({ asyncStateStorage }, { navigation }) {
    const deckTitle = navigation.getParam("deckTitle");
    const deckQuestionArray = asyncStateStorage[deckTitle].questions;
    const deckQuestionLength = deckQuestionArray.length;
    return {
        deckTitle,
        deckQuestionArray,
        deckQuestionLength
    };
}

export default connect(mapStateToProps)(Card);
