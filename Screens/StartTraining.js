import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Picker,
} from 'react-native';

import styles from "./StyleSheet"
import DateTimePicker from "react-native-modal-datetime-picker";
import Header from './Header'
import { SQLite } from 'expo-sqlite';
import StartTrainingUebung from './StartTrainingUebung'

var db = SQLite.openDatabase('Awesome')
//var db2 = SQLITE.openDatabase('Awesome')


class StartTraining extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Art: 'GK',
      Messure: 'Wiederholung',
      refs: [],
      Feedback: [],
      AuswahlName: [],
      Date: [],
      UnsavedData: [],
      ResultUebungen: [],
      Einheiten: [],
      TextHolder: "",
      TestDate: new Date(),
      Save: 0,
      BackgroundColor: '',
    }

    

  }

  
  rerenderParentCallback = (prop) => {
    
    this.setState({BackgroundColor: prop})
   // this.forceUpdate();
 }

  componentDidMount() {

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

    db.transaction(tx => {
      tx.executeSql('insert into Settings values (?)',
        ['black'], () => console.log("yyyy"),
        (a, b) => console.log("error main")
      )
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Settings',
        [], (tx, results) => {
          this.setState({BackgroundColor : results.rows['_array'][0].backgroundColor})
          // console.log(results.rows['_array'][0].backgroundColor)
        },
        (a, b) => console.log("error main")
      )
    });

    this.setState({ Art: 'GK' })
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM Uebungen2 where art = ?', [this.state.Art], (tx, results) => {
        var count = results.rows.length
        this.setState({ Feedback: [] })
        for (i = 0; i < count; i++) {
          this.setState({ Feedback: [...this.state.Feedback, results.rows.item(i)] })
        }
      })
    }.bind(this))

    this.ConvertDatePicked(this.state.TestDate)
    
    if (this.props.navigation.state.params) {
      this.setState({ Date: this.props.navigation.state.params })

      db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM TestData where date = ? group by name',
          [this.state.Date],
          (t, results) => {
   
            var length = results.rows.length
 
            var ergebnis = []
            for (i = 0; i < length; i++) {

              tx.executeSql('select * from TestData where date = ? and name = ? order by setnumber', [results.rows.item(i).date, results.rows.item(i).name], (t, results2) => {

                var length2 = results2.rows.length
                var zwErgebnis = []
                var resErgebnis = []
                var checkvalue = 0;


                zwErgebnis = [...zwErgebnis, ...results2.rows['_array']]

                resErgebnis = [zwErgebnis]

                if (checkvalue == 0) {

                  ergebnis = [...ergebnis, ...resErgebnis]

                  checkvalue = 0

                }
                this.setState({ ResultUebungen: ergebnis })
              })

            }
          },
          (e) => console.log("e"))
      }.bind(this))
    }
  }

  // Convert picked string. Example: ["2019-02-15"]

  ConvertDatePicked = (date) => {
    // alert(this.state.TestDate)
    let resultDateArray = []
    this.setState({ TestDate: date });
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

  }




  getStuff = async () => {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM TestData', [], (tx, results) => {
        var length = results.rows.length
        console.log("STUFF")
        for (i = 0; i < length; i++) {
          console.log(results.rows.item(i).name)
          console.log(results.rows.item(i).date)
          console.log(results.rows.item(i).setnumber)
        }
        console.log("STUFF")
      }, (t, e) => {
        console.log(e)
      })
    }.bind(this))
  }

  deleteStuff = async () => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM TestData', [], (tx, results) => {

        console.log("DELETE")
      }, (t, e) => {
        console.log(e)
      })
    }.bind(this))
  }


  setTypes = (prop) => {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM Uebungen2 where art = ?', [prop], (tx, results) => {
        var count = results.rows.length
        this.setState({ Feedback: [] })
        for (i = 0; i < count; i++) {
          this.setState({ Feedback: [...this.state.Feedback, results.rows.item(i)] })
        }
      })
    }.bind(this))
  }
  addUebung = async () => {
    let check = true
    if (this.state.AuswahlName[0] !== undefined) {

      this.state.Einheiten.forEach((value, index) => {

        if (this.state.AuswahlName[0] == value.name) {
          check = false;
        }
      })

      if (check) {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM Uebungen2 where name = ?', [this.state.AuswahlName[0]], (tx, results) => {
            this.setState({
              Einheiten: [...this.state.Einheiten, results.rows.item(0)],
            })
          })
        }.bind(this))
      } else {
        this.state.refs.forEach((value, index) => {
          if (value.props["Name"] == this.state.AuswahlName[0]) {
            this.state.refs[index].removeUebung()
          }
        })
      }
    } else { alert('Erst Übung auswählen') }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.ConvertDatePicked(date)
    this.hideDateTimePicker();
  };

  setRef = ref => {
    this.state.refs.push(ref);
  }

 




  render() {

    const uebungComponent = []
    const uebungComponentSaved = []

    id = 1
    this.state.ResultUebungen.forEach((value, index) => {
      uebungComponentSaved.push(
        <StartTrainingUebung ref={this.setRef} removeUebung={this.removeUebung} key={id} Name={value[0].name} ResultSets={value} Date={value[0].date} Art={value[0].art} Messure={value[0].messure}  />
      )
      id++
    })

    this.state.Einheiten.forEach((value, index) => {
      uebungComponent.push(
        <StartTrainingUebung ref={this.setRef} removeUebung={this.removeUebung} key={id} Name={value.name} Date={this.state.Date} Art={this.state.Art} Messure={this.state.Messure} />
      )
      id++
    })


    return (
      <ScrollView style={[styles.backgroundNight,{backgroundColor: this.state.BackgroundColor}]}>
        <View style={[styles.backgroundNight,{backgroundColor: this.state.BackgroundColor}]}>
          <Header navigation={this.props.navigation} rerenderParentCallback={this.rerenderParentCallback}/>
          <TouchableOpacity
            style={styles.menuNavi}
            onPress={() => this.getStuff()}>
            <Text style={styles.buttonText}> Get Database </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.menuNavi}
            onPress={() => this.deleteStuff()}>
            <Text style={styles.buttonText}> DELETE </Text>
          </TouchableOpacity> */}
          {uebungComponentSaved}
          {uebungComponent}
          <View>
            <Text style={styles.buttonText}>
              Übung Hinzufügen :
          </Text>

            {/******************************** Add Section **********************************/}

            <View style={styles.addSection} >


              {/******************************** Pickers **********************************/}

              {/******************************** Picker Arten **********************************/}
              <View style={styles.addSectionArea}>
                <Text style={styles.buttonText}>
                  Art:
              </Text>
                <Picker
                  selectedValue={this.state.Art}
                  style={{ height: 20, width: 100, backgroundColor: 'white', }}
                  onValueChange={(itemValue, itemIndex) => { this.setState({ Art: itemValue }) || this.setTypes(itemValue) }
                  }>
                  <Picker.Item label="GK" value="GK" />
                  <Picker.Item label="Pull" value="Pull" />
                  <Picker.Item label="Push" value="Push" />
                  <Picker.Item label="Legs" value="Legs" />
                </Picker>
              </View>
              {/******************************** Picker Übung **********************************/}
              <View style={styles.addSectionArea}>
                <Text style={styles.buttonText}>
                  Übung:
              </Text>
                <Picker
                  selectedValue={this.state.AuswahlName[0]}
                  style={{ height: 20, width: 100, backgroundColor: 'white' }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ AuswahlName: [itemValue, itemIndex] })
                  }>
                  {this.state.Feedback.map((item, key) => (
                    <Picker.Item key={key} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.menuNavi}
                onPress={() => this.addUebung()}>
                <Text style={styles.plusButton}>
                  +
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapDateSave}>
            {/******************************** Datepicker **********************************/}

            <TouchableOpacity onPress={this.showDateTimePicker}>
              <Text style={styles.date}>Set Date</Text>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={this.save}>
              <Text style={styles.save}>
                SAVE
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>


    )

  }
}

export default StartTraining
