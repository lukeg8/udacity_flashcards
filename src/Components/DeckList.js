import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { connect } from "react-redux";

class DeckList extends Component {
    static navigationOptions = {
        title: "Home",
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
    render() {
        const { deckList, asyncStateStorage } = this.props;
        return (
            <ScrollView>
                {deckList ? (
                    deckList.map(deckTitle => {
                        const deckCardLength =
                            asyncStateStorage[deckTitle].questions.length;
                        return (
                            <TouchableOpacity
                                key={deckTitle}
                                onPress={() => {
                                    this.props.navigation.navigate("OneDeck", {
                                        deckTitle
                                    });
                                }}
                            >
                                <View style={styles.deckCard}>
                                    <Text style={styles.deckTitle}>
                                        {deckTitle}
                                    </Text>
                                    <Text style={styles.deckCardLength}>
                                        {`Card Size: ${deckCardLength}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <Text>No Decks</Text>
                )}
                <View style={styles.buttonNewDeck}>
                    <Button
                        onPress={() =>
                            this.props.navigation.navigate("NewDeckTitle")
                        }
                        title="NEW DECK"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deckCard: {
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
    deckTitle: {
        fontSize: 40
    },
    deckCardLength: {
        fontSize: 30
    },
    buttonNewDeck: {
        borderWidth: 2,
        borderRadius: 5,
        margin: 30
    }
});

function mapStateToProps({ asyncStateStorage }) {
    const deckList = Object.keys(asyncStateStorage);
    return {
        asyncStateStorage,
        deckList
    };
}
export default connect(mapStateToProps)(DeckList);
