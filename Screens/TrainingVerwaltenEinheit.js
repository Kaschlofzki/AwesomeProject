import React from 'react';
import {
    View,
    Text,

} from 'react-native';
import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';

var db = SQLite.openDatabase('Awesome')
//var db2 = SQLITE.openDatabase('Awesome'


class TrainingVerwaltenEinheit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultUebung: this.props.resultUebung
        }


    }

    componentDidMount() {

        // console.log("this.props.resultUebung[0].name")

    }


    render() {

     
            // console.log(this.state.resultUebung.length)
            const sets = []
            this.state.resultUebung.forEach((element,index) => {
                sets.push(
                    <View style={{marginBottom:5}} key={index}>
                    <Text style={styles.text}>Set {element.setnumber}: Weight: {element.weight} Count: {element.wdh} </Text>
                    
                  </View>
                )
                
            });

            return(
                <View style={styles.trainingWrap}>
                <Text style={styles.textButtonUebungen}>{this.state.resultUebung[0].name}</Text>
                {sets}
                 </View>
            )


        


    }
}

export default TrainingVerwaltenEinheit;