import React from 'react';
import {

    View,
    Text,
    Alert,


} from 'react-native';

import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';
import { TouchableOpacity } from 'react-native-gesture-handler';


var db = SQLite.openDatabase('Awesome')

class UebungVerwaltenEinheit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refs: [],
            Name: this.props.Name,
            Art: 'GK',
            Messure: 'Wiederholung',
            refs: [],
            Feedback: [],
            AuswahlUebung: [],
            Einheiten: [],
            remove: false,

        };
    }

    componentDidMount() {
        // this.props.navigation.navigate('UebungenAdd')
    }

    deleteUebung = () => {

        db.transaction(function (tx) {

            tx.executeSql('delete from Uebungen2 where name = ?', [this.state.Name], (tx, results) => {
                // console.log("this.state.Set.length")
                var length = results.rows.length
            }, (t, e) => {
                console.log(e)
            })
        }.bind(this))

        this.setState({ remove: true })

    }


    alert = () => {
        Alert.alert(
            'Löschen',
            'Wirklich Löschen?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {

                        this.deleteUebung()
                    }
                },
            ],
            { cancelable: false },
        );

    }
    navigate = () => {
        this.props.navigate(this.state.Name)
    }
    render() {

        const toggleVisible = (!this.state.remove) ? "flex" : "none"
        return (
            <View style={{ display: toggleVisible }}>
                <View style={styles.uebungWrap}>

                    <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={styles.uebungButton2} onPress={() => this.alert()}>

                            <Text style={styles.textUebungen}>Del</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uebungButton} onPress={() => this.navigate()}>

                            <Text style={styles.textUebungen}>Bearbeiten</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={styles.uebungColumn}>
                        <Text style={styles.textUebungen}>{this.state.Name}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default UebungVerwaltenEinheit;