import React from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';


var db = SQLite.openDatabase('Awesome')

class StartTrainingSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Name,
            Art: this.props.Art,
            Messure: this.props.Messure,
            Date: this.props.Date,
            Weight: "0",
            Time: null,
            Set: this.props.Set,
            Save: this.props.Save,
            Count: "0",
            id: this.props.id
        };

    }

    componentDidMount() {
        console.log(this.props.Set)
        if(this.props.Weight && this.props.Count)
        {
            let weight = this.props.Weight.toString()
            this.setState({Weight : weight})
            this.setState({Count : this.props.Count})
            
        }
    }

    handleTextinput = (text) => {

        if (this.state.Count != 0) {

            db.transaction(tx => {
                date = this.state.Date
                name = this.state.Name
                count = this.state.Count
                messure = this.state.Messure
                art = this.state.Art
                weight = this.state.Weight
                set = this.state.Set

                tx.executeSql('SELECT * FROM TestData WHERE date=? AND name=? AND setnumber=?',
                    [date, name, set],
                    (tx, result) => {
                        var length = result.rows.length
                        // for (i = 0; i < length; i++) {
                        //     console.log(result.rows.item(i))
                        //   }
                        var check = result.rows.length
                        if (check != 0) {

                            // console.log(count)
                            // console.log(weight)
                            tx.executeSql('UPDATE TestData SET weight=? , wdh=? WHERE date=? AND name=? AND setnumber=?',
                                [weight, count, date, name, set], () => { console.log("UPDATE") }, (e) => console.log("rrorr"))
                        } else {
                            tx.executeSql('insert into TestData (date, name, messure, art, wdh, weight, setnumber) values (?,?,?,?,?,?,?)',
                                [date, name, messure, art, count, weight, set], () => { console.log("INSERT") }, (e) => console.log("rrorr"))
                        }
                    },
                    (t, e) => { console.log("error") }
                );
            })
        }
    }



    

    render() {

        const gewicht = (this.props.Weight) ? this.props.Weight : ''
        const wdh = (this.props.Count) ? this.props.Count : ''

        return (
            <View style={styles.wrapDetail}>
                <View style={styles.wrapDetail}>
                    <Text style={styles.textSet}>Set: {this.state.Set}</Text>
                </View>
                <View
                    style={styles.input, { flexDirection: 'row' }}>
                    <Text style={styles.textSet}>Weight:</Text>
                    <TextInput
                        
                        underlineColorAndroid='transparent'
                        style={styles.textInput}
                        defaultValue= {gewicht.toString()}
                        onChangeText={text => this.setState({ Weight: text })}
                        onSubmitEditing={this.handleTextinput}
                        keyboardType={'numeric'}

                    />
                </View>
                <View
                    style={styles.input, { flexDirection: 'row' }}>
                    <Text style={styles.textSet}>Count:</Text>
                    <TextInput
                        defaultValue= {wdh.toString()}
                        underlineColorAndroid='transparent'
                        style={styles.textInput}
                        onSubmitEditing={this.handleTextinput}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setState({ Count: text })}
                    />
                </View>
            </View>
        );
    }
}

export default StartTrainingSet;