import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Picker,


} from 'react-native';

import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UebungVerwaltenEinheit from './UebungVerwaltenEinheit'
import Header from './Header'


var db = SQLite.openDatabase('Awesome')
//var db2 = SQLITE.openDatabase('Awesome'

class UebungVerwalten extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refs: [],
            BackgroundColor: '',
            Name: '',
            Art: 'GK',
            Messure: 'Wiederholung',
            refs: [],
            Feedback: [],
            AuswahlUebung: [],
            Einheiten: [],
            TextHolder: "",
            TestDate: new Date(),
            Save: 0,
            remove: false,
        }
    }
    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Settings',
                [], (tx, results) => {
                    this.setState({ BackgroundColor: results.rows['_array'][0].backgroundColor })
                    // console.log(results.rows['_array'][0].backgroundColor)
                },
                (a, b) => console.log("error main")
            )
        });
    }

    getBy = (input) => {
        this.setState({ AuswahlUebung: [] })

        if (input == 'GK' || input == 'Legs' || input == "Push" || input == "Pull") {


            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Uebungen2 WHERE art LIKE ?', [input], (tx, results) => {
                    var length = results.rows.length

                    if (length > 0) {
                        this.setState({ AuswahlUebung: results.rows["_array"] })
                        // for (i = 0; i < length; i++) {
                        //     console.log(results.rows.item(i).name)
                        //     // this.setState({ AuswahlUebung: [...this.AuswahlUebung,{...results.rows.item(i)}] })
                        //     this.setState({ AuswahlUebung: [...this.state.AuswahlUebung, results.rows.item(i)] })
                        // }
                        // console.log(this.state.AuswahlUebung)
                    }
                    else {
                        this.setState({ AuswahlUebung: ['empty'] })
                    }

                    // console.log(this.state)

                })
            }.bind(this))

        }
        else if (input == 'all') {

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Uebungen2', [], (tx, results) => {
                    var length = results.rows.length

                    if (length > 0) {
                        this.setState({ AuswahlUebung: results.rows["_array"] })
                        // for (i = 0; i < length; i++) {
                        //     console.log(results.rows.item(i).name)
                        //     // this.setState({ AuswahlUebung: [...this.AuswahlUebung,{...results.rows.item(i)}] })
                        //     this.setState({ AuswahlUebung: [...this.state.AuswahlUebung, results.rows.item(i)] })
                        // }
                        // console.log(this.state.AuswahlUebung)
                    }
                    else {
                        this.setState({ AuswahlUebung: ['empty'] })
                    }

                    // console.log(this.state)

                })
            }.bind(this))
        }

        else {
            letter = input + '%'

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Uebungen2 WHERE name LIKE ?', [letter], (tx, results) => {
                    var length = results.rows.length

                    if (length > 0) {
                        this.setState({ AuswahlUebung: results.rows["_array"] })

                    }
                    else {
                        this.setState({ AuswahlUebung: ['empty'] })
                    }

                })
            }.bind(this))
        }
    }

    navigate = (name) => {
      
        this.props.navigation.navigate('UebungenAdd', name)
    }

    rerenderParentCallback = (prop) => {
        
        this.setState({ BackgroundColor: prop })
        // this.forceUpdate();
    }


    render() {


        const renderUebung = []
        if (this.state.AuswahlUebung.length > 0 && this.state.AuswahlUebung != 'empty') {

            this.state.AuswahlUebung.forEach((value, index) => {

                renderUebung.push(


                    <UebungVerwaltenEinheit key={index} navigate={this.navigate} Name={value.name} />
                )


            })
        }

        return (

            <View style={[styles.backgroundNight, { backgroundColor: this.state.BackgroundColor }]}>
                <ScrollView>
                    <Header navigation={this.props.navigation} rerenderParentCallback={this.rerenderParentCallback} />

                    <View style={styles.alphabetWrap}>
                        <View style={styles.alphabetRows}>
                            <TouchableOpacity onPress={() => this.getBy('A')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>A</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('B')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>B</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('C')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>C</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('D')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>D</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('E')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>E</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('F')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>F</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('G')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>G</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('H')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>H</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.alphabetRows}>
                            <TouchableOpacity onPress={() => this.getBy('I')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>I</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('J')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>J</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('K')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>K</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('L')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>L</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.getBy('M')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>M</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('N')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>N</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('O')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>O</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('P')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>P</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('Q')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>Q</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.alphabetRows}>
                            <TouchableOpacity onPress={() => this.getBy('R')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>R</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('S')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>S</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('T')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>T</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('U')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>U</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('V')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>V</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('W')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>W</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('X')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>X</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('Y')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>Y</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('Z')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>Z</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.alphabetRows}>
                            <TouchableOpacity onPress={() => this.getBy('1')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>1</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('2')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>2</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('3')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>3</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('4')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>4</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('5')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>5</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('6')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>6</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('7')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>7</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('8')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>8</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('9')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>9</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getBy('0')}>
                                <View style={styles.alphabetZeichen}>
                                    <Text style={styles.text}>0</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.alphabetWrap}>
                        <View style={styles.alphabetWrap, { flexDirection: 'row', marginTop: 15 }}>
                            <View style={styles.wrapDetail}>
                                <TouchableOpacity onPress={() => this.getBy('all')}>
                                    <View style={styles.alphabetZeichen}>
                                        <Text style={styles.text}>All</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.wrapDetail}>
                                <Text style={styles.textButtonUebungen}>Select by Type</Text>
                            </View>

                            <View style={styles.wrapDetail}>
                                <Picker
                                    selectedValue={this.state.Art}
                                    style={styles.textButtonUebungen, { height: 40, width: 100, backgroundColor: 'white', }}
                                    onValueChange={(itemValue, itemIndex) => { this.setState({ Art: itemValue }) || this.getBy(itemValue) }
                                    }>
                                    <Picker.Item label="GK" value="GK" />
                                    <Picker.Item label="Pull" value="Pull" />
                                    <Picker.Item label="Push" value="Push" />
                                    <Picker.Item label="Legs" value="Legs" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    {renderUebung}
                </ScrollView>
            </View >

        );
    }
}

export default UebungVerwalten;