import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  slideInDown,
  slideInRight,
  slideOutLeft,
} from '../../../assets/animations';
import {_auth, _database} from '../../../assets/config';
const style = StyleSheet.create({
  mainContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#d4fffe',
  },
  loader: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    top: 0,
    marginTop: '70%',
  },
  loaderText: {
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#1eb100',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 10,
    marginTop: '150%',
    borderRadius: 50,
    fontSize: 16,
    fontFamily: 'Quicksand-Light',
  },
  editBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'Raleway-SemiBold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: 'Raleway-Light',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
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
    fontFamily: 'Raleway-Regular',
  },
  input: {
    marginRight: 10,
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
    color: '#000',
    flex: 1,
  },
  field: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 2,
  },
  inputIcon: {
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 15,
  },
  btn: {
    marginBottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5,
  },
  editBtn: {
    backgroundColor: '#1eb100',
    elevation: 2,
    borderRadius: 50,
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  editBtnText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    padding: 10,
  },
  textLink: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
    color: '#111',
    fontFamily: 'Raleway-Light',
    fontSize: 16,
    borderColor: '#fff',
    borderBottomColor: '#1eb100',
    borderWidth: 2,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginBottom: 20,
  },
});
export default class MyInfo extends Component {
  state = {
    loading: true,
    close: false,
    userName: '',
    serviceNumber: '',
    rank: '',
    position: '',
  };
  render() {
    return (
      <Animatable.View
        animation={this.state.close === false ? slideInRight : slideOutLeft}
        style={style.mainContent}>
        <Animatable.View
          delay={500}
          style={style.editBox}
          animation={slideInDown}>
          <Text style={style.title}>Enter your work information</Text>
          <ScrollView>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>Full Name</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/icon-account.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Peter Kirui"
                  onChangeText={(x) => {
                    this.setState({userName: x});
                  }}
                  value={this.state.userName}
                />
              </View>
            </View>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>Service Number</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/field-password.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Service Number"
                  onChangeText={(x) => {
                    this.setState({serviceNumber: x});
                  }}
                  value={this.state.serviceNumber}
                />
              </View>
            </View>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>Rank</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/field-password.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Rank"
                  onChangeText={(x) => {
                    this.setState({rank: x});
                  }}
                  value={this.state.rank}
                />
              </View>
            </View>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>Position</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/field-password.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Position"
                  onChangeText={(x) => {
                    this.setState({position: x});
                  }}
                  value={this.state.position}
                />
              </View>
            </View>
            <TouchableOpacity>
              <Text style={style.textLink}>Change Email?</Text>
            </TouchableOpacity>
          </ScrollView>
          <Animatable.View
            delay={500}
            style={style.btn}
            animation={slideInDown}>
            <TouchableOpacity
              style={style.editBtn}
              onPress={async () => {
                await setTimeout(async () => {
                  if (
                    this.state.userName.length !== 0 &&
                    this.state.position.length !== 0 &&
                    this.state.rank.length !== 0 &&
                    this.state.serviceNumber.length !== 0
                  ) {
                    this.props.openSnack('Saving');
                    await _database
                      .ref('users/' + _auth.currentUser.uid)
                      .once('value', async (x) => {
                        this.props.closeSnack();
                        await x.child('userName').ref.set(this.state.userName);
                        await x.child('position').ref.set(this.state.position);
                        await x.child('rank').ref.set(this.state.rank);
                        this.setState({close: true});
                        await x
                          .child('serviceNumber')
                          .ref.set(this.state.userName);
                        await setTimeout(() => {
                          this.props.openTimedSnack('Save Successfull');
                        }, 100);
                      })
                      .catch(async () => {
                        this.props.closeSnack();
                        await setTimeout(() => {
                          this.props.openTimedSnack('Save Failed');
                        }, 100);
                      });
                  } else {
                    this.props.openTimedSnack('All fields are required!');
                  }
                }, 100);
              }}>
              <Text style={style.editBtnText}>Update Info</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
