import React, {Component} from 'react';
import {_auth, _database} from '../../../assets/config';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {fadeIn, slideInDownLess} from '../../../assets/animations';
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const style = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {height: 35, width: 35, alignSelf: 'center'},
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  };

  async componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
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
        timeout: 15000,
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
        <MapView
          style={style.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          <Marker.Animated
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <Image
              source={require('../../../assets/drawable/icon-practice.png')}
              style={style.marker}
            />
          </Marker.Animated>
        </MapView>
      </Animatable.View>
    );
  }
}
