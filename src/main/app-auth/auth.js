import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  fadeIn,
  fadeOut,
  slideFadeInRight,
  slideInDown,
  slideInLeft,
  slideInRight,
  slideInUp,
  slideOutLeft,
} from '../../assets/animations';
import {_auth, _database} from '../../assets/config';

const style = StyleSheet.create({
  mainContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d4fffe',
  },
  logoBox: {
    alignSelf: 'center',
    backgroundColor: '#f0fff2',
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  loginBox: {
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
    marginBottom: 10,
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
  loginBtn: {
    backgroundColor: '#1eb100',
    elevation: 2,
    borderRadius: 50,
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  loginBtnText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    padding: 10,
  },
  textLink: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
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

export default class AuthScreen extends Component {
  state = {
    close: false,
    currentScreen: 'signIn',
  };
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <Animatable.View
        animation={this.state.close === false ? slideInRight : slideOutLeft}
        style={style.mainContent}>
        <StatusBar barStyle="dark-content" backgroundColor="#d4fffe" />
        <View style={style.logoBox}>
          <Image
            source={require('../../assets/drawable/logo.png')}
            style={style.logo}
          />
        </View>
        {this.state.currentScreen === 'signIn' ? (
          <SignIn
            createAccount={() => {
              this.setState({currentScreen: 'create'});
            }}
            authorizeUser={async () => {
              this.setState({close: true});
              await setTimeout(() => {
                this.props.authorizeUser();
              }, 500);
            }}
            openSnack={this.props.openSnack}
            openTimedSnack={this.props.openTimedSnack}
            closeSnack={this.props.closeSnack}
          />
        ) : this.state.currentScreen === 'create' ? (
          <CreateAccount
            cancelSignUp={() => {
              this.setState({currentScreen: 'signIn'});
            }}
            authorizeUser={async () => {
              this.setState({close: true});
              await setTimeout(() => {
                this.props.authorizeUser();
              }, 500);
            }}
            openSnack={this.props.openSnack}
            openTimedSnack={this.props.openTimedSnack}
            closeSnack={this.props.closeSnack}
          />
        ) : (
          <Animatable.View></Animatable.View>
        )}
      </Animatable.View>
    );
  }
}

class SignIn extends Component {
  state = {email: '', password: ''};
  render() {
    return (
      <Animatable.View
        delay={500}
        style={style.loginBox}
        animation={slideInDown}>
        <Text style={style.title}>
          Enter your email and password to get started
        </Text>
        <ScrollView>
          <View style={style.inputField}>
            <Text style={style.inputFieldText}>E-mail</Text>
            <View style={style.field}>
              <Image
                source={require('../../assets/drawable/icon-mail.png')}
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="peterkirui@gmail.com"
                onChangeText={(x) => {
                  this.setState({email: x});
                }}
                value={this.state.email}
              />
            </View>
          </View>
          <View style={style.inputField}>
            <Text style={style.inputFieldText}>Password</Text>
            <View style={style.field}>
              <Image
                source={require('../../assets/drawable/field-password.png')}
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="password"
                onChangeText={(x) => {
                  this.setState({password: x});
                }}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
          </View>
          <Text style={style.subTitle}>
            Click create for account registration
          </Text>
          <TouchableOpacity>
            <Text style={style.textLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
        <Animatable.View delay={500} style={style.btn} animation={slideInDown}>
          <TouchableOpacity
            style={style.loginBtn}
            onPress={async () => {
              await setTimeout(() => {
                this.props.createAccount();
              }, 100);
            }}>
            <Text style={style.loginBtnText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.loginBtn}
            onPress={async () => {
              await setTimeout(async () => {
                if (
                  this.state.email.length !== 0 &&
                  this.state.password !== 0
                ) {
                  this.props.openSnack('Signing In');
                  await _auth
                    .signInWithEmailAndPassword(
                      this.state.email,
                      this.state.password,
                    )
                    .then(async (x) => {
                      this.props.closeSnack();
                      await setTimeout(() => {
                        this.props.openTimedSnack('Sign in Successfull');
                      }, 100);
                      await this.props.authorizeUser();
                    })
                    .catch(async () => {
                      this.props.closeSnack();
                      await setTimeout(() => {
                        this.props.openTimedSnack('Sign in Failed');
                      }, 100);
                    });
                } else {
                  this.props.openTimedSnack('All fields are required');
                }
              }, 100);
            }}>
            <Text style={style.loginBtnText}>Sign In</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    );
  }
}

class CreateAccount extends Component {
  state = {
    email: '',
    password: '',
    _password: '',
  };
  render() {
    return (
      <Animatable.View style={style.loginBox} animation={slideInLeft}>
        <Text style={style.title}>Create your account to get started</Text>
        <ScrollView>
          <View style={style.inputField}>
            <Text style={style.inputFieldText}>*E-mail</Text>
            <View style={style.field}>
              <Image
                source={require('../../assets/drawable/icon-mail.png')}
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="peterkirui@gmail.com"
                onChangeText={(x) => {
                  this.setState({email: x});
                }}
                value={this.state.email}
              />
            </View>
          </View>
          <View style={style.inputField}>
            <Text style={style.inputFieldText}>*Password</Text>
            <View style={style.field}>
              <Image
                source={require('../../assets/drawable/field-password.png')}
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Password"
                onChangeText={(x) => {
                  this.setState({password: x});
                }}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={style.inputField}>
            <Text style={style.inputFieldText}>*Confirm Password</Text>
            <View style={style.field}>
              <Image
                source={require('../../assets/drawable/field-password.png')}
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Confirm Password"
                onChangeText={(x) => {
                  this.setState({_password: x});
                }}
                value={this.state._password}
                secureTextEntry={true}
              />
            </View>
          </View>
        </ScrollView>
        <Animatable.View delay={500} style={style.btn} animation={slideInDown}>
          <TouchableOpacity
            style={style.loginBtn}
            onPress={async () => {
              await setTimeout(async () => {
                if (
                  this.state.email.length !== 0 &&
                  this.state.password.length !== 0 &&
                  this.state.password === this.state._password
                ) {
                  this.props.openSnack('Creating Account');
                  await _auth
                    .createUserWithEmailAndPassword(
                      this.state.email,
                      this.state.password,
                    )
                    .then(async (x) => {
                      this.props.closeSnack();
                      const __ = {
                        email: this.state.email,
                      };
                      await _database.ref('users/' + x.user.uid).set(__);
                      await this.props.authorizeUser();
                      await setTimeout(() => {
                        this.props.openTimedSnack('Created Successfully');
                      }, 100);
                    })
                    .catch(async (x) => {
                      await setTimeout(() => {
                        this.props.openTimedSnack('Creation Failed');
                      }, 100);
                    });
                } else if (this.state.password !== this.state._password) {
                  this.props.openTimedSnack('Password mismatch!');
                } else {
                  this.props.openTimedSnack('All fields are required');
                }
              }, 100);
            }}>
            <Text style={style.loginBtnText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.loginBtn}
            onPress={async () => {
              await setTimeout(() => {
                this.props.cancelSignUp();
              }, 100);
            }}>
            <Text style={style.loginBtnText}>Cancel</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
