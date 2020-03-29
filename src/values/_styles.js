import { StyleSheet, Dimensions, Platform } from 'react-native';
import { default as Colors, default as colors } from './colors';
import { default as dimens, width } from './dimens';
import PropTypes from 'prop-types';

var HEIGHT = Dimensions.get('window').height;
var WIDTH = Dimensions.get('window').width;


const props = this.props;
const buttonSize = dimens.buttonHightSmall;
const borderRadius = buttonSize;

//
const _styles = StyleSheet.create({

  buttonContainer: {
    borderWidth: 1,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },

  billboard: {

    width: '80%',
    backgroundColor: 'rgba(47, 148, 176, 0.91)',
    borderWidth: 4,
    borderRadius: 6,
    borderColor: Colors.GOLD,
    position: 'absolute',
    top: 80,
    left: '10%',
    padding: 20,

  },

  billboard_date: { color: Colors.WHITE, fontSize: 15 },
  billboard_intersection: { color: Colors.WHITE, fontSize: 30 },
  billboard_citystate: { color: Colors.WHITE, fontSize: 15 },
  billboard_timer: { color: Colors.WHITE, fontSize: 30 },

  southwest: {

    position: 'absolute',
    bottom: 25,
    left: 25,

  },

  southeast: {

    position: 'absolute',
    bottom: 25,
    right: 25,

  },

  tooltip: {

    width: 30,
    height: 30,
    backgroundColor: Colors.BLUE,
    alignItems: 'center',
    justifyContent: 'center',

  },

  tip: {

    //borderWidth: 1,
    //borderColor: 'pink',
    width: 15,
    height: 15,

  },

  toggle: {

    backgroundColor: 'white',
    borderColor: Colors.GOLD,
    borderWidth: 4,
    borderRadius: 6,
    width: '80%',

  },

  field: {

    //flex: 3,
    //borderWidth: 5,
    //padding: 10,
    width: '100%',
    marginTop: 15,
    borderColor: Colors.GOLD,
    borderWidth: 4,
    borderRadius: 6,
    backgroundColor: Colors.BLUE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    color: Colors.GOLD,
    textAlign: 'left',
    height: 50,

  },

  container: {

    flex: 1,
    backgroundColor: '#000000',

  },

  view: {

    flex: 1,
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',

  },

  head: {

    //borderWidth: 1,
    //borderColor: Colors.BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT/5,
    backgroundColor: 'white',
    marginTop: 10,
  },

  main: {

    //borderWidth: 1,
    //borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingRight: 40,
    height: HEIGHT,
    backgroundColor: 'white',

  },

  border: {

    borderColor: Colors.GOLD,
    borderWidth: 4,
    borderRadius: 6,

  },

  bordered: {

    borderColor: Colors.GOLD,
    borderWidth: 4,
    borderRadius: 6,

  },

  button: {

    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: Colors.BLUE,
    height: 60,
    marginTop: dimens.space_large,
    padding: 10,

  },

  buttonText: {

    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 'bold',
    fontSize: 23,
    color: Colors.GOLD,

  },

  section: {

    //borderWidth: 1,
    //borderColor: Colors.BORDER,
    width: '100%',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: dimens.space_small,

  },

  link: {

    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 20,

  },

  hr: {

    width: '100%',
    height: 5,
    backgroundColor: Colors.GOLD,
    borderRadius: 6,
    marginTop:50,
    marginBottom:10,

  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2b93ae',
    margin: 10,
  },

  instructions: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2b93ae',
    marginBottom: 5,
  },

  login:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:dimens.very_space_large,
    paddingRight:dimens.very_space_large
  },

  bgView: {
    width: "100%",
    marginBottom: dimens.space_small,
    borderColor: '#d8d8d8',
    borderRadius: dimens.buttonHightLarge / 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: dimens.space_small,
    paddingRight: dimens.space_small,
    height: dimens.buttonHightLarge
  },

});

module.exports = _styles;
