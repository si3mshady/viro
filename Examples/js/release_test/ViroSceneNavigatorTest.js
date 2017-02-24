/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroScene,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroOrbitCamera,
  ViroCamera,
  ViroAmbientLight,
  ViroOmniLight,
  ViroSpotLight,
  ViroDirectionalLight,
  ViroImage,
  ViroVideo,
  Viro360Image,
  Viro360Video,
  ViroFlexView,
  ViroUtils,
  ViroText,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroSurface,
  ViroSkyBox,
  ViroSphere,
  Viro3DObject,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var UriImage = {uri:"https://s3-us-west-2.amazonaws.com/viro/Explorer/360_horseshoe.jpg"};
var LocalImage = require("./res/360_park.jpg");

var Viro360ImageTest = require('./Viro360ImageTest');
var ViroAmbientLightTest = require('./ViroAmbientLightTest');

var Viro360VideoTest = React.createClass({

  getInitialState() {
    return {
      get360Image:LocalImage,

      showLeftArrow:false,
      showPoiDot:false,
      showRightArrow:false,
    };
  },

  render: function() {
    return (
     <ViroScene>
     <ViroOmniLight position={[0, 0, 0]} color="#ffffff" attenuationStartDistance={40} attenuationEndDistance={50}/>

     <Viro360Image
      rotation={[0,0,0]}
      source={this.state.get360Image}
      onLoadStart={this._onBackgroundPhotoLoadStart}
      onLoadEnd={this._onBackgroundPhotoLoadEnd}
      />


     <ViroAnimatedComponent animation="fadeIn" run={this.state.showLeftArrow} loop={false}>
     <ViroImage source={require('./res/icon_left_w.png')} position={[-2, -4, -3]} scale={[0, 0, 0]} transformBehaviors={["billboard"]} onClick={this._showPrevious} />
     </ViroAnimatedComponent>

     <ViroImage source={require('./res/poi_dot.png')} position={[0, -4, -3]} transformBehaviors={["billboard"]} onClick={this._showOther} />

     <ViroAnimatedComponent animation="fadeIn" run={this.state.showRightArrow} loop={false}>
     <ViroImage source={require('./res/icon_right_w.png')} position={[2, -4, -3]} scale={[0, 0, 0]} transformBehaviors={["billboard"]} onClick={this._showNext} />
     </ViroAnimatedComponent>

     </ViroScene>

    );
  },

  _onBackgroundPhotoLoadStart(){
      this.setState({
          showLeftArrow:true,
      });
  },

  _onBackgroundPhotoLoadEnd() {
      this.setState({
          showRightArrow:true,
      });
  },

  _showPrevious() {
    this.props.sceneNavigator.pop();
  },

  _showOther() {
    this.setState({
        get360Image:UriImage,
      });
  },

  _showNext() {
    this.props.sceneNavigator.push({scene:Viro360VideoTest});
  },

});

ViroAnimations.registerAnimations({
  fadeIn:{properties:{scaleX:1, scaleY:1, scaleZ:1}, duration: 5000},
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementText: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
});

module.exports = Viro360VideoTest;