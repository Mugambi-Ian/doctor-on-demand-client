import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  fadeIn,
  slideOutLeft,
  splashIn,
  splashOut,
} from '../../assets/animations';

const style = StyleSheet.create({
  mainContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  bgImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 20,
    backgroundColor: '#ccfbff',
    justifyContent: 'center',
  },
  logoImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  logoText: {
    backgroundColor: '#fff',
    padding: 10,
    color: '#858585',
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 35,
    marginTop: 20,
    borderRadius: 10,
    fontFamily: 'Title-Bold',
  },
});

export default class SplashScreen extends Component {
  state = {
    close: false,
  };
  async componentDidMount() {
    await setTimeout(async () => {
      this.setState({out: true});
      await setTimeout(async () => {
        this.setState({close: undefined});
        await setTimeout(() => {
          this.props.closeSplash();
        }, 500);
      }, 1000);
    }, 3000);
  }
  render() {
    return (
      <Animatable.View
        delay={this.state.out ? 400 : 0}
        animation={this.state.close === false ? fadeIn : slideOutLeft}
        style={style.mainContent}>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <Animatable.View
          delay={this.state.out ? 0 : 400}
          animation={this.state.out ? splashOut : splashIn}
          style={style.logo}>
          <Image
            style={style.logoImg}
            source={require('../../assets/drawable/logo.png')}
          />
          <Text style={style.logoText}>Doctor On Call</Text>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
