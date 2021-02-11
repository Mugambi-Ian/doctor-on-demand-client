/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {slideInLeft, slideInRight} from '../../../assets/animations';
import {_auth, _database} from '../../../assets/config';

const style = StyleSheet.create({
  mainContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#d4fffe',
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    fontSize: 25,
    color: '#000',
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: 'Quicksand-Light',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 22,
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontFamily: 'Quicksand-Regular',
    marginTop: 10,
    fontSize: 18,
    marginBottom: 10,
    color: '#118fca',
    alignSelf: 'center',
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 4,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  inputFieldText: {
    fontSize: 18,
    color: '#929292',
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Quicksand-Regular',
  },
  input: {
    marginRight: 10,
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
    color: '#000',
    flex: 1,
    maxHeight: 60,
    marginLeft: 10,
  },
  field: {
    flexDirection: 'row',
    paddingBottom: 2,
  },
  inputIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 15,
  },
});

export default class Conditions extends Component {
  state = {
    conditions: [],
  };
  componentDidMount() {
    this.db = _database.ref(
      'customers/' + _auth.currentUser.uid + '/conditions',
    );
    this.bc = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.close();
      return true;
    });
    this.db.on('value', (x) => {
      const c_ = [];
      x.forEach((d) => {
        c_.push({id: d.key, val: d.val()});
      });
      console.log(JSON.stringify(c_));
      this.setState({conditions: c_});
    });
  }
  componentWillUnmount() {
    this.db.off();
    this.bc.remove();
  }
  render() {
    return (
      <Animatable.View animation={slideInRight}>
        <Text style={style.title}>Medical Condtions</Text>
        <Text style={style.subTitle}>
          Add Conditions you would like known by the medical professional
        </Text>
        <View style={style.inputField}>
          <Text style={style.inputFieldText}>Condition</Text>
          <View style={style.field}>
            <Image
              source={require('../../../assets/drawable/logo.png')}
              style={style.inputIcon}
            />
            <TextInput
              style={style.input}
              placeholder="Athsma"
              onChangeText={(x) => {
                this.setState({add: x});
              }}
              value={this.state.add}
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={async () => {
                if (this.state.add.length !== 0) {
                  await this.db.push(this.state.add).then(() => {
                    this.setState({add: ''});
                    this.props.openTimedSnack('Condtion added');
                  });
                } else {
                  this.props.openTimedSnack('Value Required');
                }
              }}>
              <Image
                source={require('../../../assets/drawable/icon-check.png')}
                style={style.inputIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {this.state.conditions.map((d, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={async () => {
                  await setTimeout(() => {
                    this.db
                      .child(d.id)
                      .set(null)
                      .then(() => {
                        this.props.openTimedSnack(d.val + ' has been removed');
                      });
                  }, 100);
                }}
                style={{...style.inputField, marginTop: 5, marginBottom: 5}}>
                <Text style={style.text}>{d.val}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animatable.View>
    );
  }
}
