/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {_database} from '../../../assets/config';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  fadeIn,
  slideInRight,
  slideOutLeft,
  slideOutRight,
} from '../../../assets/animations';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -0.16600251757871917;
const LONGITUDE = 35.96779080662068;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const style = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {height: 60, width: 60, alignSelf: 'center', borderRadius: 100},
  markerBtn: {
    height: 65,
    width: 65,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '#118fca',
    justifyContent: 'center',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  popUpBody: {
    height: '60%',
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: '15%',
    left: '10%',
    minHeight: 400,
  },
  input: {
    marginRight: 10,
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
    color: '#000',
    flex: 1,
  },
  field: {
    flexDirection: 'row',
    flex: 1,
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
export default class LocationWidget extends Component {
  state = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),
    activeDoctors: [],
    search: {keyWord: '', searchResult: undefined, searching: false},
  };

  async componentDidMount() {
    this.db = _database.ref();
    this.db.child('active-doctors').on('value', async (ds) => {
      const ac = [];
      ds.forEach(async (i) => {
        const v = i.val();
        const doc = {
          docId: i.key,
          coordinate: new AnimatedRegion({
            latitude: v.latitude,
            longitude: v.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }),
          docDp: '',
        };
        ac.push(doc);
      });

      await this.db.child('doctors/').on('value', (d) => {
        ac.forEach((x, i) => {
          x.docDp = d.child(x.docId + '/userDp').val();
          x.docData = d.child(x.docId).val();
          x.openDoc = () => {
            this.setState({showDoc: x.docData});
          };
          ac[i] = x;
        });
        this.setState({activeDoctors: ac});
      });
    });
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then((location) => {
        this.setState({
          longitude: location.longitude,
          latitude: location.latitude,
          coordinate: new AnimatedRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }),
          loading: false,
        });
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
        this.setState({loading: false});
      });
    await setInterval(async () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
      })
        .then((location) => {
          this.setState({
            longitude: location.longitude,
            latitude: location.latitude,
            coordinate: new AnimatedRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }),
            loading: false,
          });
        })
        .catch((error) => {
          const {code, message} = error;
          console.warn(code, message);
          this.setState({loading: false});
        });
    }, 60000);
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({searchScreen: true});
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({searchScreen: undefined});
      },
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
      <Animatable.View style={style.container} delay={400} animation={fadeIn}>
        {this.state.searchScreen === undefined ? (
          <MapView
            style={style.map}
            showUserLocation
            followUserLocation
            region={this.getMapRegion()}>
            {this.state.activeDoctors.map((x, i) => {
              return (
                <Marker.Animated
                  coordinate={x.coordinate}
                  key={i}
                  onPress={x.openDoc}>
                  <TouchableOpacity style={style.markerBtn}>
                    <Image source={{uri: x.docDp}} style={style.marker} />
                  </TouchableOpacity>
                </Marker.Animated>
              );
            })}
          </MapView>
        ) : (
          <View style={{display: 'flex'}} />
        )}
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 0,
            left: 0,
            marginRight: 20,
            marginLeft: 20,
            backgroundColor: '#fff',
            elevation: 5,
            height: 50,
            width: '90%',
            borderRadius: 10,
          }}>
          <View style={style.field}>
            <Image
              source={require('../../../assets/drawable/icon-id-card.png')}
              style={style.inputIcon}
            />
            <TextInput
              style={style.input}
              placeholder="Profession"
              onChangeText={(x) => {
                this.setState({search: {...this.state.search, keyWord: x}});
              }}
              value={this.state.search.keyWord}
            />
            <TouchableOpacity style={{alignSelf: 'center', marginRight: -10}}>
              <Image
                source={require('../../../assets/drawable/icon-search.png')}
                style={style.inputIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center', marginRight: 10}}>
              <Image
                source={require('../../../assets/drawable/icon-id-card.png')}
                style={style.inputIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.showDoc && this.state.searchScreen === undefined ? (
          <Animatable.View
            style={style.popUpBody}
            duration={300}
            animation={this.state.closePopUp ? slideOutRight : slideInRight}>
            <TouchableOpacity
              onPress={async () => {
                await setTimeout(async () => {
                  this.setState({closePopUp: true});
                  await setTimeout(() => {
                    this.setState({showDoc: undefined, closePopUp: undefined});
                  }, 300);
                }, 100);
              }}
              style={{
                alignSelf: 'flex-end',
                marginRight: 10,
                marginTop: 10,
                marginBottom: 20,
                width: 40,
                height: 40,
              }}>
              <Image
                source={require('../../../assets/drawable/icon-close.png')}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
            <Image
              source={{uri: this.state.showDoc.userDp}}
              style={{
                height: 200,
                width: 200,
                borderRadius: 200,
                alignSelf: 'center',
                borderColor: '#118fca',
                borderWidth: 2,
                marginTop: -20,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: '#118fca',
                fontFamily: 'Quicksand-Bold',
                fontSize: 28,
              }}>
              {this.state.showDoc.title + ' ' + this.state.showDoc.userName}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: '#118fca',
                fontFamily: 'Quicksand-Regular',
                fontSize: 24,
                margin: 5,
                marginBottom: 20,
              }}>
              {this.state.showDoc.practice}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  margin: 5,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  borderColor: '#118fca',
                  borderWidth: 1,
                }}>
                <Image
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={require('../../../assets/drawable/icon-phone.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  margin: 5,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  borderColor: '#118fca',
                  borderWidth: 1,
                }}>
                <Image
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={require('../../../assets/drawable/icon-chat.png')}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : (
          <View style={{display: 'none'}} />
        )}
      </Animatable.View>
    );
  }
}
