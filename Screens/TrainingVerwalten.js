import React from 'react';
import {

    ScrollView,
    View,
    Text,
    TouchableOpacity,

} from 'react-native';

import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';
import TrainingVerwaltenEinheit from './TrainingVerwaltenEinheit'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Header from './Header'

var db = SQLite.openDatabase('Awesome')
//var db2 = SQLITE.openDatabase('Awesome')


class TrainingVerwalten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            BackgroundColor: '',
            Art: 'GK',
            Messure: 'Wiederholung',
            refs: [],
            Feedback: [],
            AuswahlName: [],
            ResultDates: {},
            ResultUebungen: [],
            Date: [],
            Einheiten: [],
            TextHolder: "",
            TestDate: new Date(),
            Save: 0,
        }
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

    rerenderParentCallback = (prop) => {
        console.log("trigger")
        this.setState({BackgroundColor: prop})
       // this.forceUpdate();
     }

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

        this.daySelected(resultDate)
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM TestData',
                [],
                (t, results) => {
                    loop = []
                    var object = {}
                    var object2 = {}
                    var c = results.rows.length
                    for (i = 0; i < c; i++) {
                        loop = [...loop, results.rows.item(i)]
                    }
                    // console.log(loop)
                    loop.forEach(element => {
                        object2 = { [element.date]: { marked: true, dotColor: 'red', activeOpacity: 0 } }
                        object = { ...object, ...object2 }
                    });

                    var check = results.rows.length
                    // console.log(object)
                    // var object2 = { "2019-10-03": { marked: true, dotColor: 'red', activeOpacity: 0 }, "2019-10-04": { marked: true, dotColor: 'red', activeOpacity: 0 }}
                    this.setState({ ResultDates: object })
                    // console.log(results.rows.item(i).date)
                    this.setState(prevState => ({
                        ResultDates: { ...prevState.ResultDates, ...object }
                    }))


                    //   console.log(this.state.ResultDates)
                },
                (e) => console.log("rrorr"))
        }.bind(this))

    }

    ConvertDatePicked = (date) => {
        let resultDateArray = []
        this.setState({ TestDate: date });
        var SampleText = this.state.TestDate.toString();
        var myArray = SampleText.split(' ');
        resultDateArray.push([myArray[0], myArray[2], myArray[1], myArray[3]])
        resultDate = resultDateArray.toString()
        resultDate = resultDate.replace(/,/g, '.');


        this.setState({ Date: resultDate })



    }
    daySelected(day) {
        this.setState({ ResultUebungen: [] })

        if (typeof (day) === 'object') {
            day = day.dateString
        }
        this.setState({Date: day})

        db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM TestData where date = ? group by name',
                [day],
                (t, results) => {
                    // console.log(results.rows)
                    var length = results.rows.length
                    // console.log(results)
                    var ergebnis = []
                    for (i = 0; i < length; i++) {
                         
                        // console.log("-------NEW---------")
                        tx.executeSql('select * from TestData where date = ? and name = ?', [results.rows.item(i).date, results.rows.item(i).name], (t, results2) => {
                            
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




    render() {

        var ResUeb = []

        this.state.ResultUebungen.forEach((resultUebung, index) => {

            ResUeb.push(
                <View key={index}>
                    <View>
                        <TrainingVerwaltenEinheit resultUebung={resultUebung} />
                    </View>
                    <View>
                      
                    </View>
                </View>
            )


        })



        return (
            <ScrollView style={[styles.backgroundNight,{backgroundColor: this.state.BackgroundColor}]}>


                <View style={[styles.backgroundNight,{backgroundColor: this.state.BackgroundColor}]}>
                    <Header navigation={this.props.navigation} rerenderParentCallback={this.rerenderParentCallback}/>
                    <View style={{ height: 325 }}>
                        <CalendarList
                            // Enable horizontal scrolling, default = false
                            horizontal={true}
                            // Enable paging on horizontal, default = false
                            pagingEnabled={true}
                            // Set custom calendarWidth.
                            calendarWidth={320}
                            markedDates={this.state.ResultDates}
                            // // Initially visible month. Default = Date()
                            // current={'2012-03-01'}
                            // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            // minDate={'2012-05-10'}
                            // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            // maxDate={'2012-05-30'}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => this.daySelected(day)}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => { console.log('long', day) }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'yyyy MM'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => { console.log('month changed', month) }}
                            // Hide month navigation arrows. Default = false
                            hideArrows={true}
                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                            renderArrow={(direction) => (<Arrow />)}
                            // Do not show days of other months in month page. Default = false
                            hideExtraDays={true}
                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                            firstDay={1}
                            // Hide day names. Default = false
                            hideDayNames={true}
                            // Show week numbers to the left. Default = false
                            showWeekNumbers={true}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={substractMonth => substractMonth()}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}
                        />
                    </View>
                    <View style={styles.verwaltenEinheitenDetail}>


                    </View>
                    {ResUeb}
                    <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('StartTraining',this.state.Date)}
                        >
                            <Text style={styles.buttonText}> Start Training </Text>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default TrainingVerwalten;