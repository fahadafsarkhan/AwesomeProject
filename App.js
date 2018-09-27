import React, { Component } from 'react';
import { Platform, StyleSheet, View, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity } from 'react-native';


export default class App extends Component{
  constructor()
  {
    super();
    this.state = { 
    isLoading: true,
    ModalVisibleStatus: false,
    TempImageURL : '' 
   }
  }
  componentDidMount() {
         return fetch('https://api.dribbble.com/v2/user/shots?access_token=b737dfdc876c78747ff5cda57e4f5cce3bc144327a8f7d2e2e8fd516223c3e9d')
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               isLoading: false,
               dataSource: responseJson
             }, function() {
               // In this block you can do something with new state.
             });
             console.log(responseJson);
           })
           .catch((error) => {
             console.error(error);
           });
       }
  ShowModalFunction(visible, imageURL) 
  {
    this.setState({
      ModalVisibleStatus: visible,
      TempImageURL : imageURL});
  }
  render() {
      if (this.state.isLoading) {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
        );
      }
    return (
 <View style={styles.MainContainer}>
       <FlatList
          data={ this.state.dataSource }
          renderItem={({item}) => 
            <View style={{flex:1, flexDirection: 'column', margin:1 }}> 
              <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.images.teaser)} >
                <Image style={styles.imageThumbnail} source = {{ uri: item.images.teaser }} />
              </TouchableOpacity>
            </View> 
          }
          numColumns = { 2 }
          keyExtractor={(item, index) => index}
         />
         {
           this.state.ModalVisibleStatus 
           ?
            (
              <Modal
            transparent={false}
            animationType={"fade"}
            visible={this.state.ModalVisibleStatus}
            onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
              <View style={styles.modalView}>
                  <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} />
                    <TouchableOpacity 
                      activeOpacity = { 0.5 }
                      style={styles.TouchableOpacity_Style}
                      onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                        <Image source={{uri: 'https://png.icons8.com/ios/1600/multiply.png'}}
                        style={{width:25, height: 25}} />
                    </TouchableOpacity>
                </View>
            </Modal>
            ) :null
         }
 </View>    );
  }
 }
 const styles = StyleSheet.create({
 MainContainer :{
 justifyContent: 'center',
 flex:1,
 paddingTop: (Platform.OS) === 'ios' ? 20 : 0
 },
 imageThumbnail: {
   justifyContent: 'center',
   alignItems: 'center',
   height: 140
 },

 mainImage:{

  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width:'98%',
  resizeMode : 'contain'

 },

 modalView:{

  flex:1, 
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundColor: 'transparent'

 },

 TouchableOpacity_Style:{

  width:25, 
  height: 25, 
  top:9, 
  right:9, 
  position: 'absolute'

} 
 });