/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  fadeIn,
  slideInDown,
  slideInRight,
  splashIn,
} from '../../../assets/animations';

const style = StyleSheet.create({
  optionsMenu: {
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 20,
    backgroundColor: '#abd9ac',
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  optionBtn: {
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 150,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
  },
  optionBtnIcon: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 30,
  },
  optionBtnDivider: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
    backgroundColor: '#99999962',
    borderRadius: 10,
  },
  optionBtnText: {
    alignSelf: 'center',
    color: '#1eb100',
    fontFamily: 'Raleway-Light',
    fontSize: 22,
  },
  _optionBtn: {
    backgroundColor: '#1eb100',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    borderRadius: 50,
  },
  _optionBtnText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
  },
});

export default class Menu extends Component {
  state = {
    currentScreen: 'options',
  };
  render() {
    return (
      <View>
        {this.state.currentScreen === 'options' ? (
          <Animatable.View animation={slideInRight}>
            <ScrollView
              style={{alignSelf: 'center', maxHeight: '97%', width: '100%'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={style.optionsMenu}>
                  <Image
                    source={require('../../../assets/drawable/logo.png')}
                    style={style.logo}
                  />
                </View>
                <View style={style.optionBtn}>
                  <Image
                    source={require('../../../assets/drawable/icon-menu.png')}
                    style={style.optionBtnIcon}
                  />
                  <View style={style.optionBtnDivider} />
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={style.optionBtnText}>Main Menu</Text>
                    <TouchableOpacity
                      style={style._optionBtn}
                      onPress={async () => {
                        await setTimeout(() => {}, 100);
                      }}>
                      <Text style={style._optionBtnText}>Open</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={style.optionBtn}>
                  <Image
                    source={require('../../../assets/drawable/icon-specialOrders.png')}
                    style={style.optionBtnIcon}
                  />
                  <View style={style.optionBtnDivider} />
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={style.optionBtnText}>Special Orders</Text>
                    <TouchableOpacity
                      style={style._optionBtn}
                      onPress={async () => {
                        await setTimeout(() => {}, 100);
                      }}>
                      <Text style={style._optionBtnText}>Open</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={style.optionBtn}>
                  <Image
                    source={require('../../../assets/drawable/icon-offer.png')}
                    style={style.optionBtnIcon}
                  />
                  <View style={style.optionBtnDivider} />
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={style.optionBtnText}>Todays Offers</Text>
                    <TouchableOpacity
                      style={style._optionBtn}
                      onPress={async () => {
                        await setTimeout(() => {}, 100);
                      }}>
                      <Text style={style._optionBtnText}>Open</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Animatable.View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}
