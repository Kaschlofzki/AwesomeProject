import React from 'react';
import {
    View,
    Text,
    AppState,
    TouchableHighlight,
    Alert,

} from 'react-native';

import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';
import StartTrainingSet from './StartTrainingSet';

var db = SQLite.openDatabase('Awesome')

class StartTrainingUebung extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            Name: this.props.Name,
            Art: this.props.Art,
            Messure: this.props.Messure,
            Date: this.props.Date,
            Weight: null,
            ResultSets: [],
            Time: null,
            remove: false,
            hide: true,
            visibility: "-",

            //   Date: this.props.Date,

            Set: [],
            modalVisible: false,
        }
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        // console.log(this.props.ResultSets)
        let anzahl = 1;
        let Sets = []
        if (this.props.ResultSets) {
            this.setState({ ResultSets: this.props.ResultSets })
            // for (let index = 0; index < this.props.ResultSets.length; index++) {
            //     this.addSet()

            // }

            // this.props.ResultSets.forEach(set => {

            //     this.addSet()
            // });

            // console.log(this.state.Set)

        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/active/) &&
            nextAppState === 'background'
        ) {
            console.log('App has come to the foreground!');
        }
        this.setState({ appState: nextAppState });
    };


    // Add = () => {

    //     NewValue = this.state.Set
    //     NewValue++

    //     this.setState({ Volume: { Set: NewValue } })
    // }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getStuff = () => {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM TestData where date = ? AND name = ?', [this.state.Date, this.state.Name], (tx, results) => {
                var length = results.rows.length
                for (i = 0; i < length; i++) {
                    console.log(results.rows.item(i))
                }
            }, (t, e) => {
                console.log(e)
            })
        }.bind(this))
    }

    removeUebung = () => {
        this.setState({ remove: false })
    }

    hide = () => {

        this.setState(prevState => ({
            hide: !prevState.hide
        }))


        if (this.state.hide == true) {
            this.setState({ visibility: "+" })
        }
        else {
            this.setState({ visibility: "-" })
        }
    }


    removeSet = () => {

        console.log(this.state.Set.length != [])
        if (this.state.ResultSets != [] && this.state.Set.length == 0) {

            console.log(this.state.ResultSets[this.state.ResultSets.length - 1]["setnumber"])
            db.transaction(function (tx) {

                tx.executeSql('delete from TestData where date = ? AND name = ? AND setnumber = ?', [this.state.Date, this.state.Name, this.state.ResultSets[this.state.ResultSets.length - 1]["setnumber"]], (tx, results) => {
                    console.log("this.state.Set.length")
                    var length = results.rows.length

                    for (i = 0; i < length; i++) {
                        console.log(results.rows.item(i))

                    }
                }, (t, e) => {
                    console.log(e)
                })

                let arr2 = this.state.ResultSets
                arr2.splice(-1, 1)
                this.setState({ ResultSets: arr2 })
            }.bind(this))
        }
        else {

            db.transaction(function (tx) {

                tx.executeSql('delete from TestData where date = ? AND name = ? AND setnumber = ?', [this.state.Date, this.state.Name, this.state.ResultSets[this.state.ResultSets.length - 1]["setnumber"]], (tx, results) => {
                    console.log("this.state.Set.length3")

                    var length = results.rows.length

                    for (i = 0; i < length; i++) {
                        console.log(results.rows.item(i))

                    }
                }, (t, e) => {
                    console.log(e)
                })

                arr = this.state.Set
                // console.log(this.state.Set)
                arr.splice(-1, 1)
                this.setState({ Set: arr })
                // this.setState({ remove: true })
            }.bind(this))

        }



    }

    deleteUebung = () => {

        db.transaction(function (tx) {

            tx.executeSql('delete from TestData where name = ?', [this.state.Name], (tx, results) => {
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

    addSet = () => {


        if (this.state.ResultSets.length == 0) {

            let Sets = this.state.Set

            let index = Sets.length + 1

            Sets.push(index)

            this.setState({ Set: Sets })


        } else {

            db.transaction(function (tx) {

                tx.executeSql('Select setnumber from TestData order by setnumber ', [], (tx, results) => {
                    // console.log("this.state.Set.length3")

                    let length = results.rows.length
                    let last = ""
                    for (i = 0; i < length; i++) {
                        last = results.rows.item(i).setnumber
                        // console.log(results.rows.item(i).setnumber)

                    }
                    if (last +1 == this.state.Set[this.state.Set.length - 1]) {
                        let Sets = this.state.Set
                        let index = last + 2

                        Sets.push(index)
                        this.setState({ Set: Sets })
                        
                    } else {
                        let Sets = this.state.Set
                        let index = last + 1
                        console.log("gleoich")
                        console.log(last)
                        console.log(this.state.Set[this.state.Set.length - 1])
                        Sets.push(this.state.Set[this.state.Set.length - 1])
                        this.setState({ Set: Sets })
                    }

                }, (t, e) => {
                    console.log(e)
                })
            }.bind(this))



        }
    }


    remo = () => {
        this.setState({ Name: "succ" })
    }

    render() {

        let remove = (this.state.remove) ? "none" : "flex"
        let hide = (this.state.hide) ? "flex" : "none"
        let visibility = ''


        const savedSet = []
        id = 1
        this.state.ResultSets.map((value, index) => {
            // console.log("erste schleife")
            savedSet.push(
                <StartTrainingSet key={index} id={value.setnumber} ref="child" Weight={value.weight} Count={value.wdh} Set={value.setnumber} Name={value.name} Date={value.date} Art={value.art} Messure={value.messure} Save={this.props.Save}>


                </StartTrainingSet>
            )
            id++
        })


        const set = []

        this.state.Set.map((value, index) => {
            // console.log("zweit schleife")
            set.push(
                <StartTrainingSet key={index} id={value} ref="child" Set={value} Name={this.state.Name} Date={this.state.Date} Art={this.state.Art} Messure={this.state.Messure} Save={this.props.Save}>


                </StartTrainingSet>
            )
            id++
        })




        return (
            <View style={{ display: remove }}>
                <View style={styles.wrap}>
                    <View style={styles.nowrap}>
                        <View style={styles.wrapHeader}>
                            <Text style={styles.textButtonUebungen}>{this.state.Name}</Text>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.hide()}>
                            <View style={styles.wrapHeader2}>
                                <Text style={styles.textButtonUebungen}>{this.state.visibility}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {/* <TextInput
                    placeholder="Enter Your Mobile Number"
                    underlineColorAndroid='transparent'
                    style={styles.text}
                    keyboardType={'numeric'}
                /> */}
                    <View style={{ display: hide }}>
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={styles.wrapDetail}>
                                <TouchableHighlight onPress={() => this.addSet()}>
                                    <View style={styles.wrapDetailComponent}>
                                        <Text style={styles.text}>Add Set +</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.removeSet()} style={{ display: 'flex' }}>
                                    <Text style={styles.removeButtonSet}>RemoveSet</Text>
                                </TouchableHighlight>

                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                                <TouchableHighlight style={styles.deleteUebung} onPress={() => this.alert()} style={{ display: 'flex' }}>
                                    <Text style={styles.deleteUebung}>Del</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        {savedSet}
                        {set}
                    </View>
                </View>
            </View>
        )
    }
}



export default StartTrainingUebung;