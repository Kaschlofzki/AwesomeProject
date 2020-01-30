import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker
} from 'react-native';
import styles from "./StyleSheet"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import YouTube from 'react-native-youtube';
// import { YouTubeStandaloneAndroid } from 'react-native-youtube';
// import RCTYouTubeExample from './RCTYouTubeExample'
import { SQLite } from 'expo-sqlite';
import Header from './Header'

var db = SQLite.openDatabase('Awesome')


class UebungenAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      alterName: '',
      BackgroundColor: '',
      Name: '',
      Beschreibung: 'Keine',
      Art: 'GK',
      Messure: 'Wiederholung',
      Einheit: 'kg',
      Zeit: false,
      toggleText: true,
    };
  }


  // Just for adjusting the PopUp uebungAddTextfield properly

  // _scrollToInput(reactNode: any) {
  //   // Add a 'scroll' ref to your ScrollView
  //   this.scroll.props.scrollToFocusedInput(reactNode)

  //   this._onChooseButton = this._onChooseButton.bind(this)
  // }
  componentDidMount() {

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Settings',
        [], (tx, results) => {
          this.setState({BackgroundColor : results.rows['_array'][0].backgroundColor})
          // console.log(results.rows['_array'][0].backgroundColor)
        },
        (a, b) => console.log("error main")
      )
    });

    this.setState({ Name: this.props.navigation.state.params })
    this.setState({ alterName: this.props.navigation.state.params })
    if (this.props.navigation.state.params) {
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Uebungen2 WHERE name= ?', [this.state.Name], (tx, results) => {
          // result=this.results.rows['_array'][0]
          var length = results.rows.length
          // console.log(length)

          // for (i = 0; i < length; i++) {
          // console.log(results.rows['_array'][0].name)
          this.setState({
            Name: results.rows['_array'][0].name,
            Beschreibung: results.rows['_array'][0].beschreibung,
            Art: results.rows['_array'][0].art,
            Messure: results.rows['_array'][0].messure,
            Einheit: results.rows['_array'][0].einheit
          })

        })
      }.bind(this))



      this.setState(prevState => ({
        toggleText: !prevState.toggleText
      }))
    }
  }

  // Save the Data to a new or existing File


  getStuff = async () => {

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM Uebungen2', [], (tx, results) => {

        var length = results.rows.length

        for (i = 0; i < length; i++) {
          console.log(results.rows.item(i))
        }
      })
    })
  }

  delete = async (prop) => {

    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM Uebungen2 where messure = "Wiederholung"')
    })
  }

  setValue = async () => {
    var len = this.state.id
    var check = 0

    const Name = this.state.Name
    const Messure = this.state.Messure
    const Einheit = this.state.Einheit
    const Art = this.state.Art
    const Beschreibung = this.state.Beschreibung

    if (this.state.toggleText) {
      if (this.state.Name !== ''
        && this.state.Beschreibung !== ''
        && this.state.Art !== ''
        && this.state.Messure !== ''
        && this.state.Einheit !== '') {
        if (this.state.id === null) {
          db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Uebungen2', [], (tx, results) => {
              len = results.rows.length
              len = len + 1
            })
          })
        }

        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM Uebungen2 where name = ?', [Name], (tx, results) => {
            if (results.rows.length === 0) {
              tx.executeSql('INSERT INTO Uebungen2 (id, name, messure, einheit, art, beschreibung) VALUES (?,?,?,?,?,?)',
                [len, Name, Messure, Einheit, Art, Beschreibung])
            } else { alert('Übung existiert schon') }
          })
        })

      }
      else {
        alert('Bitte alle Daten ausfüllen')
      }
    } else {

      if (this.state.Name !== ''
        && this.state.Beschreibung !== ''
        && this.state.Art !== ''
        && this.state.Messure !== ''
        && this.state.Einheit !== '') {

        if (this.state.Name == this.state.alterName) {

          db.transaction(function (tx) {
            tx.executeSql('UPDATE Uebungen2 set messure = ? , einheit = ? , art = ? , beschreibung = ? WHERE name = ?', [this.state.Messure,this.state.Einheit,this.state.Art,this.state.Beschreibung,this.state.Name], (tx, results) => {

            })
          }.bind(this))

        }
        else
        {
          db.transaction(function (tx) {
            tx.executeSql('UPDATE Uebungen2 set name = ? , messure = ? , einheit = ? , art = ? , beschreibung = ? WHERE name = ?', [this.state.Name,this.state.Messure,this.state.Einheit,this.state.Art,this.state.Beschreibung,this.state.alterName], (tx, results) => {
             this.setState({alterName: this.state.Name})

            })
          }.bind(this))
        }
      } else {
        alert('Bitte alle Daten ausfüllen')
      }

    }
  }


  toggle = () => {

    this.setState(prevState => ({
      Zeit: !prevState.Zeit
    }));
  }

  rerenderParentCallback = (prop) => {
    console.log("_----PARENT CALL ANFANG--------------")
      console.log("Prop von Parent Call : "+prop)
    this.setState({ BackgroundColor: prop })
    console.log("State von Parent : "+this.state.BackgroundColor)
    // this.forceUpdate();
    console.log("_----PARENT CALL ENDE--------------")
 }


  render() {

    const text = (this.state.toggleText) ? "Übung hinzufügen" : "Übung speichern"

    return (


      <KeyboardAwareScrollView style={[styles.backgroundNight,{backgroundColor: this.state.BackgroundColor}]}>
        <View style={styles.backgroundNight,{backgroundColor: this.state.BackgroundColor}}>
          <Header navigation={this.props.navigation} rerenderParentCallback={this.rerenderParentCallback} />

          <View style={styles.uebungAddTextField}>
            <Text style={styles.uebeungAddText}>Name der Übung: </Text>
            <TextInput
              style={styles.uebungAddTextInput}
              onChangeText={(Name) => this.setState({ Name })}
              value={this.state.Name}
            />
          </View>
          <View style={styles.uebungAddTextField}>
            <Text style={styles.uebeungAddText}>Beschreibung: </Text>
            <TextInput
              style={styles.uebungAddTextInput}
              onChangeText={(Beschreibung) => this.setState({ Beschreibung })}
              value={this.state.Beschreibung}
            />
          </View>
          <View style={styles.selectSection} >
            <View style={styles.uebungAddTextField}>
              <Text style={styles.uebungAddTextArt}>Art :</Text>
            </View>
            <View>
              <Picker
                selectedValue={this.state.Art}
                style={{ width: 200, backgroundColor: 'white', }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ Art: itemValue })
                }>
                <Picker.Item label="GK" value="GK" />
                <Picker.Item label="Pull" value="Pull" />
                <Picker.Item label="Push" value="Push" />
                <Picker.Item label="Legs" value="Legs" />
              </Picker>
            </View>
          </View>
          <View style={styles.selectSection} >
            <View style={styles.uebungAddTextField}>
              <Text style={styles.uebungAddTextArt}>Messung :</Text>
            </View>
            <View>
              <Picker
                selectedValue={this.state.Messure}
                style={{ width: 200, backgroundColor: 'white', }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ Messure: itemValue }) ||
                  this.toggle()
                }>
                <Picker.Item label="Wiederholung" value="Wiederholung" />
                <Picker.Item label="Zeit" value="Zeit" />
              </Picker>
            </View>
          </View>

          <View style={styles.selectSection} >
            <View style={styles.uebungAddTextField}>
              <Text style={styles.uebungAddTextArt}> {!this.state.Zeit ? "Einheit" : 'Zeit'} </Text>
            </View>
            <View>

              {!this.state.Zeit && (
                <Picker
                  selectedValue={this.state.Einheit}
                  style={{ width: 200, backgroundColor: 'white', }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ Einheit: itemValue })
                  }>
                  <Picker.Item label="KG" value="kg" />
                  <Picker.Item label="Keine" value="keine" />
                  <Picker.Item label="Stufen" value="stufen" />

                </Picker>)}

              {this.state.Zeit && (
                <Picker
                  selectedValue={this.state.Einheit}
                  style={{ width: 200, backgroundColor: 'white', }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ Einheit: itemValue })
                  }>
                  <Picker.Item label="Sekunden" value="sekunden" />
                  <Picker.Item label="Minuten" value="minuten" />

                </Picker>)}
            </View>
          </View>

          <TouchableOpacity
            style={styles.uebungAddmenuNavi}
            onPress={() => this.setValue()}
          >
            <Text
              style={styles.uebungAddButtonText}> {text} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uebungAddmenuNavi}
            onPress={() => this.getStuff()}
          >
            <Text
              style={styles.uebungAddButtonText}> Get Database </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default UebungenAdd