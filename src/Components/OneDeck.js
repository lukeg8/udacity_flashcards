import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

class OneDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Deck - ${navigation.state.params.deckTitle}`,
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
    render() {
        const { deckTitle, asyncStateStorage } = this.props;
        const questionLength = asyncStateStorage[deckTitle].questions.length;
        return (
            <View>
                <View style={styles.deckView}>
                    <Text style={styles.deckTitle}>{deckTitle}</Text>
                    <Text
                        style={styles.questionLength}
                    >{`Card Size: ${questionLength}`}</Text>
                </View>
                <View style={styles.formView}>
                    <View style={styles.addCard}>
                        <Button
                            onPress={() =>
                                this.props.navigation.navigate("NewQuestion", {
                                    deckTitle
                                })
                            }
                            title="Add Card"
                        />
                    </View>
                    <View style={styles.startQuiz}>
                        <Button
                            disabled={!Boolean(questionLength)}
                            onPress={() =>
                                this.props.navigation.navigate("Card", {
                                    deckTitle
                                })
                            }
                            title="Start Quiz"
                            color="red"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deckView: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 10,
        borderRadius: 20,
        margin: 20,
        backgroundColor: "#cddbf2"
    },
    deckTitle: {
        padding: 5,
        margin: 10,
        fontSize: 40
    },
    questionLength: {
        fontSize: 30
    },
    formView: {
        margin: 20
    },
    addCard: {
        margin: 5
    },
    startQuiz: {
        margin: 20
    }
});

function mapStateToProps({ asyncStateStorage }, { navigation }) {
    const deckTitle = navigation.getParam("deckTitle");
    return {
        asyncStateStorage,
        deckTitle
    };
}

export default connect(mapStateToProps)(OneDeck);
