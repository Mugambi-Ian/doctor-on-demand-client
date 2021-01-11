/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {PulseIndicator} from 'react-native-indicators';
import {fadeIn, slideInDown, slideInRight} from '../../assets/animations';
import {_auth, _database} from '../../assets/config';
import Menu from './menu/menu';
import MyInfo from './my-info/my-info';
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
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
  },
  navBar: {
    position: 'absolute',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#fff',
    height: 60,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 4,
    borderColor: '#ece4e4',
    borderWidth: 1,
    flexDirection: 'row',
  },
  bgImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
  },
  navItemIcon: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginBottom: 2,
    alignSelf: 'center',
  },
  navItemText: {
    alignSelf: 'center',
    fontFamily: 'Raleway-Regular',
    color: '#999',
    marginBottom: 5,
  },
});
export default class Home extends Component {
  state = {loading: true, init: undefined};
  async componentDidMount() {
    await _database.ref('users/' + _auth.currentUser.uid).on('value', (x) => {
      if (x.hasChild('serviceNumber') === false) {
        this.setState({init: true});
      }
      this.setState({loading: false});
    });
  }
  render() {
    return (
      <Animatable.View animation={fadeIn}>
        <StatusBar barStyle="dark-content" backgroundColor="#d4fffe" />
        {this.state.loading === true ? (
          <View style={style.mainContent}>
            <PulseIndicator color={'#1eb100'} style={style.loader} size={100} />
            <Text style={style.loaderText}>Please Hold...</Text>
          </View>
        ) : this.state.init ? (
          <MyInfo
            openSnack={this.props.openSnack}
            openTimedSnack={this.props.openTimedSnack}
            closeSnack={this.props.closeSnack}
          />
        ) : (
          <LandingPage
            openSnack={this.props.openSnack}
            openTimedSnack={this.props.openTimedSnack}
            closeSnack={this.props.closeSnack}
          />
        )}
      </Animatable.View>
    );
  }
}

class LandingPage extends Component {
  state = {
    currentscreen: 'home',
  };
  render() {
    return (
      <Animatable.View animation={slideInRight} style={style.mainContent}>
        <Image
          source={require('../../assets/drawable/background.png')}
          style={style.bgImage}
        />
        <StatusBar backgroundColor={'#ece4e4'} />
        {this.state.currentscreen === 'home' ? <Menu /> : <View />}
        <Animatable.View
          animation={slideInDown}
          delay={500}
          style={style.navBar}>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'home'
                ? {
                    ...style.navItem,
                    backgroundColor: '#1eb100',
                    borderTopLeftRadius: 10,
                  }
                : {...style.navItem, borderTopLeftRadius: 10}
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'home') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'home'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-home.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'home'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Raleway-Medium',
                    }
                  : style.navItemText
              }>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'order'
                ? {...style.navItem, backgroundColor: '#1eb100'}
                : style.navItem
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'order') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'order'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-orders.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'order'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Raleway-Medium',
                    }
                  : style.navItemText
              }>
              My Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'favourite'
                ? {...style.navItem, backgroundColor: '#1eb100'}
                : style.navItem
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'favourite') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'favourite'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-favourite.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'favourite'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Raleway-Medium',
                    }
                  : style.navItemText
              }>
              Favourite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'profile'
                ? {
                    ...style.navItem,
                    backgroundColor: '#1eb100',
                    borderTopRightRadius: 10,
                  }
                : {...style.navItem, borderTopRightRadius: 10}
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'profile') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'profile'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-profile.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'profile'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Raleway-Medium',
                    }
                  : style.navItemText
              }>
              Profile
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
