import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {
  warningOpened = false;
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeRead = result => {
    LayoutAnimation.spring();
    this.setState({ lastScannedUrl: result.data });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text style={{ color: '#fff' }}>
              Camera permission is not granted
                </Text>
            : <BarCodeScanner
              onBarCodeRead={this.handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />}

        {this.maybeRenderUrl()}

        <StatusBar hidden />
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.url} onPress={this.cancel}>
            <Text numberOfLines={1} style={styles.urlText}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>

      </View>


    );
  }

  cancel = () =>{
      //Return to previous view
  }

  maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }
    if(this.warningOpened){
      //this prevents the alert to plob up multiple times
      return;
    }else{
      this.warningOpened = true;
    }
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        { text: 'No', onPress: () => {this.warningOpened=false; }, },
        {
          text: 'Yes',
          onPress: () => {
            this.warningOpened =false;
            Linking.openURL(this.state.lastScannedUrl);
          },
        },

      ],
      { cancellable: false }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    alignItems: 'center',

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});