import React, { Fragment } from 'react';
import {
  ScrollView,
  View,
  Text,

  TouchableOpacity,
} from 'react-native';
import Header from './Header'
import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite'


var db = SQLite.openDatabase('Awesome')


class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      BackgroundColor: '',
      TestDate: new Date(),
      Date: ''
    };

    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists TestData (date text, name text, messure text, art text, wdh int, weight int, setnumber int);',
        [], () => console.log(),
        (a, b) => console.log("error main")
      )
    });


    db.transaction(tx => {
      tx.executeSql('create table if not exists Uebungen2 (id integer primary key not null, name text, messure text, einheit text, art text, beschreibung text)',
        [], () => console.log(),
        (a, b) => console.log("error main")
      )
    });

    db.transaction(tx => {
      tx.executeSql('create table if not exists Settings (backgroundColor text)',
        [], () => console.log(),
        (a, b) => console.log("error main")
      )
    });


  }

  componentDidUpdate() {

    // let array = this.props.navigation.state.params
    // console.log(this.props.navigation.state.params)
    // if (typeof (this.props.navigation.state.params) === 'object') {
    //   let res = '' + array[0] + '' + array[1] + '' + array[2] + '' + array[3] + '' + array[4] + ''
    //   if (this.state.BackgroundColor != res) {
    //     this.setState({ BackgroundColor: res })

    //   }



    // }
  }


  componentDidMount() {

    let resultDateArray = []
    var SampleText = this.state.TestDate.toString();
    var myArray = SampleText.split(' ');
    switchResult = ''
    switch (myArray[1]) {
      case "Jan":
        myArray[1] = "01"
        break;
      case "Feb":
        myArray[1] = "02"
        break;
      case "Mar":
        myArray[1] = "03"
        break;
      case "Apr":
        myArray[1] = "04"
        break;
      case "May":
        myArray[1] = "05"
        break;
      case "Jun":
        myArray[1] = "06"
        break;
      case "Jul":
        myArray[1] = "07"
        break;
      case "Aug":
        myArray[1] = "08"
        break;
      case "Sep":
        myArray[1] = "09"
        break;
      case "Oct":
        myArray[1] = "10"
        break;
      case "Nov":
        myArray[1] = "11"
        break;
      case "Dec":
        myArray[1] = "12"
        break;

      default:
      // code block

    }

    resultDateArray.push([myArray[3], myArray[1], myArray[2]])
    resultDate = resultDateArray.toString()
    resultDate = resultDate.replace(/,/g, '-');
    // console.log(resultDate)

    this.setState({ Date: resultDate })

    //  console.log(this.props.navigation.state.params)

    this.setState({ BackgroundColor: this.props.navigation.state.params })
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


  rerenderParentCallback = (prop) => {
    console.log("_----PARENT CALL ANFANG--------------")
    console.log("Prop von Parent Call : " + prop)
    this.setState({ BackgroundColor: prop })
    console.log("State von Parent : " + this.state.BackgroundColor)
    // this.forceUpdate();
    console.log("_----PARENT CALL ENDE--------------")
  }

  render() {
    return (
      <ScrollView style={[styles.backgroundNight, { backgroundColor: this.state.BackgroundColor }]}>
      <View >
        <Header rerenderParentCallback={this.rerenderParentCallback} navigation={this.props.navigation} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('StartTraining', this.state.Date)}
        >
          <Text style={styles.buttonText}> Start Training </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('UebungenAdd')}
        >
          <Text style={styles.buttonText}> Übung hinzufügen </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('UebungVerwalten')}
        >
          <Text style={styles.buttonText}> Übungen verwalten </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Verwalten')}
        >
          <Text style={styles.buttonText}> Trainings verwalten </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Walk')}
        >
          <Text style={styles.buttonText}> Walk </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
         style={styles.button}
         onPress={() => this.props.navigation.navigate('StartTraining')}
        >
         <Text style={styles.buttonText}> Statistik </Text>
       </TouchableOpacity> */}
      </View>
      </ScrollView>
    );

  }
}



export default HomeScreen