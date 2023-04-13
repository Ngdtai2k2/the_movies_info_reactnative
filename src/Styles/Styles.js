import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../Constants/Constants';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Styles = StyleSheet.create({

  sectionBg: {
    backgroundColor: Constants.background,
    height: deviceHeight,
  },

  actorsContainer: {
    margin: 5,
    overflow: 'hidden',
  },

  actorsImage: {
    height: 90,
    width: 80,
    borderRadius: 5,
  },

  actorName: {
    width: 70,
    color: Constants.textColor,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },

  characterName: {
    color: Constants.secondaryColor,
    fontSize: 11,
    textAlign: 'center',
    width: 70,
  },

  heading: {
    fontSize: 20,
    color: Constants.textColor,
    textAlign: 'center',
    margin: 10,
  },

  headingLeft: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Constants.textColor,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  posterImage: {
    height: 230,
    width: 150,
    borderRadius: 10,
    objectFit: 'cover',
  },

  circleContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: Constants.textColorWhite,
    bottom: 40,
    left: 5,
    backgroundColor: '#081c22',
    justifyContent: 'center',
    alignItems: 'center',
  },

  voteAverage: {
    color: Constants.textColorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },

  bottomTitle: {
    color: Constants.textColor,
    width: 150,
    textAlign: 'left',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: -25,
    fontWeight: 'bold',
    fontSize: 13,
  },

  releaseDate: {
    color: Constants.secondaryColor,
    fontSize: 13,
    paddingHorizontal: 5,
  },

  imageBg: {
    width: deviceWidth,
    height: deviceHeight / 2.5,
  },

  detailsTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Constants.textColor,
    textAlign: 'center',
    marginTop: -20,
  },

  linkContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: Constants.textColorWhite,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#081c22',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  tagLine: {
    color: Constants.textColor,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
  },

  overview: {
    color: Constants.textColor,
    marginHorizontal: 10,
    textAlign: 'justify',
    fontSize: 16,
    fontStyle: 'italic',
  },

  details: {
    color: Constants.secondaryColor,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },

  textDetails: {
    color: Constants.secondaryColor,
    marginHorizontal: 10,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 16,
  },

  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  genreContainer: {
    fontWeight: 'bold',
    display: 'flex',
  },

  genre: {
    borderWidth: 1,
    borderColor: Constants.secondaryColor,
    borderRadius: 5,
    color: Constants.secondaryColor,
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  // màn hình tìm kiếm 
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  input: {
    height: 50,
    width: deviceWidth / 1.5,
    color: Constants.baseColor,
    backgroundColor: Constants.textColorWhite,
    borderWidth: 1,
    borderColor: Constants.barColor,
    margin: 10,
    padding: 15,
    borderRadius: 50,
    fontSize: 20,
  },

  button: {
    alignContent: 'center',
    width: deviceWidth / 4.1,
    height: 50,
    backgroundColor: Constants.barColor,
    marginVertical: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 20,
  },

  buttonText: {
    color: Constants.textColorWhite,
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
  },

  resultsTitle: {
    color: Constants.textColor,
    textAlign: 'left',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 5,
  },

  colRow_1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  colRow_2: {
    flex: 1,
    padding: 16,
  },

  hr: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.textColorBur,
    marginVertical: 10,
  },

  // màn hình person 
  containerPerson: {
    flex: 1,
  },

  rowPer: {
    flexDirection: 'row',
  },

  colPer: {
    flex: 1,
    padding: 16,
  },

  namePerson: {
    fontSize: 20,
    color: Constants.textColor,
    fontWeight: 'bold',
  },

  textPerson: {
    fontSize: 16,
    color: Constants.textColor,
    fontStyle: 'italic',
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },

  videoContainer: { 
    width: 350,
    height: 400,
  },

  closeButton :{
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: Constants.textColorWhite,
    marginRight: -280,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPlay: {
    marginLeft: 10,
    color: Constants.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },

});



export default Styles;