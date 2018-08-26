import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    Dimensions
} from "react-native";
import { handleDeckTitle } from "../actions/asyncstatestorage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const screenWidth = Dimensions.get("window").width;
class NewDeckTitle extends Component {
    static navigationOptions =  {
        title: "Enter New Deck",
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
    state = {
        deckTitle: ""
    };
    handleSubmit = () => {
        this.props.handleDeckTitle(this.state.deckTitle);
        this.props.navigation.navigate("OneDeck", {
            deckTitle: this.state.deckTitle
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textQuestion}>What is the Deck Title?</Text>
                <View style={styles.formView}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={deckTitle => this.setState({ deckTitle })}
                        value={this.state.deckTitle}
                        placeholder="New Deck Title"
                    />
                    <View style={styles.buttonStyle}>
                        <Button
                            disabled={this.state.deckTitle === ""}
                            onPress={this.handleSubmit}
                            title="Submit"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1
    },
    textQuestion: {
        margin: 20,
        fontSize: 30
    },
    textInputTitle: {
        margin: 20
    },
    textInputStyle: {
        backgroundColor: "white"
    },
    buttonStyle: {
        margin: 40
    },
    formView: {
        flex: 1,
        width: screenWidth - 20
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleDeckTitle }, dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(NewDeckTitle);
