import React from 'react';
import {
    RefreshControl,
    View,
    Text,
    Switch,
    TouchableOpacity,
} from 'react-native';
import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';
var db = SQLite.openDatabase('Awesome')

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            BackgroundColor: ''
        };
    }
    componentDidMount() {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Settings',
                [], (tx, results) => {
                    if(results.rows.length > 0) {
                    if (results.rows['_array'][0].backgroundColor == 'white') {
       
                        tx.executeSql('UPDATE Settings SET backgroundColor = ? ',
                            ['white'], (tx, results) => {
                                this.setState({ switchValue: true })
                                this.props.rerenderParentCallback('white');
                                
                            },
                            (a, b) => console.log("error main")
                        )


                    } else {
                        tx.executeSql('UPDATE Settings SET backgroundColor = ? ',
                            ['black'], (tx, results) => {
                                this.setState({ switchValue: false })
                                this.props.rerenderParentCallback('black');
                                
                            },
                            (a, b) => console.log("error main")
                        )

                    }
                }
                   

                },
                (a, b) => console.log("error main")
            )
        });
    }

    _handleToggleSwitch = () => {

        db.transaction(tx => {

            this.setState(state => ({
                switchValue: !state.switchValue,
            }));

            tx.executeSql('SELECT * FROM Settings',
                [], (tx, results) => {

                    if (this.state.switchValue) {
                        
                        tx.executeSql('UPDATE Settings SET backgroundColor = ? ',
                            ['white'], (tx, results) => {

                                this.props.rerenderParentCallback('white');
                                console.log("White in HEADER")
                                this.setState({ BackgroundColor: 'white' })
         

                            },
                            (a, b) => console.log("error main")
                        )


                    } else {
                        tx.executeSql('UPDATE Settings SET backgroundColor = ? ',
                            ['black'], (tx, results) => {

                                this.props.rerenderParentCallback('black');
                                console.log("Black in HEADER")
                                this.setState({ BackgroundColor: 'black' })

                            },
                            (a, b) => console.log("error main")
                        )

                    }
                    

                },
                (a, b) => console.log("error main")
            )
        });


    }



    render() {
        return (
            <View style={styles.headerSection}>
                <View>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => this.props.navigation.navigate('Home',this.state.BackgroundColor)}
                    >
                        <Text style={styles.buttonText}> Home </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>

                    <Text style={styles.glow}>Track ur Train</Text>
                    <Text style={styles.glowSmall}>...and become AWESOME</Text>
                </View>
                <Switch
                refreshControl={
                    <RefreshControl refreshing={true} onRefresh={true} />
                  }
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue}
                />
            </View>
        );
    }
}

export default Header;
