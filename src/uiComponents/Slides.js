//
import React, { Component } from 'react';
import { Text, Image, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

//
import _styles from './values/_styles';

//
const SCREEN_WIDTH = Dimensions.get('window').width;

//
class Slides extends Component {

  //
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="GET STARTED!"
          buttonStyle={[_styles.button,]}
          onPress={this.props.onComplete}
        />
      );
    }
  }

  //
  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.id}
          style={[styles.slideStyle, { padding: 30, backgroundColor: slide.color }]}
        >
          <Text style={[styles.slideText]}>
            {slide.text}
          </Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  //
  render() {

    //
    return (
      <View style={{ flex: 1, position: 'absolute', height: '100%', width: '100%'}}>
        <View style={{width:'100%',height:'30%',top:0,justifyContent: 'center',alignItems: 'center',position: 'absolute',zIndex:5}}>
          <Image
            source={
              __DEV__
                ? require('./images/logo.png')
                : require('./images/logo.png')
            }
            style={[_styles.logo,]}
          />
        </View>

        <ScrollView
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
          pagingEnabled={ true }
          style={{ flex: 1, position: 'absolute', height: '100%', width: '100%'}}
        >
          {this.renderSlides()}
        </ScrollView>

        <View style={{width:'100%',height:'30%',padding:30, paddingTop: 30, bottom:0,justifyContent: 'center',alignItems: 'center',position: 'absolute',zIndex:5}}>
          <View style={[_styles.hr,]}></View>
        </View>

      </View>

    );

  }

}

//
const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2f94b0',
  },
  buttonStyle: {
    backgroundColor: '#0c335d',
    marginTop: 15,
  },
};

export default Slides;
