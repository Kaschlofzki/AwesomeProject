import React, { Fragment } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
// import { MapView } from "expo";
import Header from './Header'
import DateTimePicker from "react-native-modal-datetime-picker";
// import styles from "./StyleSheet"
import { SQLite } from 'expo-sqlite';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


var db = SQLite.openDatabase('Awesome')

class Walk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }


        return (
            <View style={styles.container}>
                <Text>{text}</Text>
                <MapView style={styles.mapStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Walk;