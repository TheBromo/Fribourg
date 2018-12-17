# Fribourg

## These are the methods, that are of importance for you

This reads the QR code.

```Javascript
 handleQRCodeRead = result => {
    LayoutAnimation.spring();
    this.setState({ lastScannedUrl: result.data });
  };
```

This will be called after the render when a QR Code has been read.

```Javascript
 maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }
    if(this.warningOpened){
      //this prevents the alert to pop up multiple times
      return;
    }else{
      this.warningOpened = true;
    }
    Alert.alert(
      'This is an example text, that can be and should be changed!!!',
      this.state.lastScannedUrl,
      [
        {
            text: 'No', onPress: () => {
                //This code gets called when no is pressed.  
                this.warningOpened=false; 
                },
        },
        {
          text: 'Yes',
          onPress: () => {
            //This code gets called when yes is pressed.  
            this.warningOpened =false;
            Linking.openURL(this.state.lastScannedUrl);
          },
        },

      ],
      { cancellable: false }
    );
  };
```

This is called when the cancel button gets pressed, pretty obvious... right?

```Javascript
 cancel = () =>{
      //Return to previous view
  }
```
