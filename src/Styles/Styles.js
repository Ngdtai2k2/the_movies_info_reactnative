import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../Constants/Constants';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  sectionBg: {
    backgroundColor: Constants.baseColor,
    height: deviceHeight,
  },

  actorsImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },

  actorName: {
    width: 70,
    color: Constants.textColor,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontWeight:'bold',
  },

  characterName: {
    color: Constants.secondaryColor,
    fontSize: 11,
    textAlign: 'center',
    width: 70,
  },
  actorsContainer: {
    margin: 10,
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

  bottomTitle: {
    color: Constants.textColor,
    width: 150,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
  },

  imageBg: {
    width: deviceWidth,
    height: 400,
  },

  detailsTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Constants.textColor,
    textAlign: 'center',
    marginTop: -195,
  },

  linkContainer: {
    backgroundColor: Constants.textColor,
    borderRadius: 100,
    paddingVertical:10,
    width: 45,
    marginLeft: 5,
    marginTop: -30,
    alignItems: 'center',
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
    marginBottom: 20,
    fontWeight: 'bold',
  },

  genre: {
    color: Constants.secondaryColor,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical:2,
    marginHorizontal: 2,
    marginBottom: 5,
    borderRadius: 10,
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
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 50,
    fontSize: 20,
  },

  button: {
    alignContent: 'center',
    width: deviceWidth / 4.1,
    height: 50,
    backgroundColor: "#04b8dc",
    marginVertical: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 20,
  },

  buttonText: {
    color: Constants.textColor,
    fontSize: 18,
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
    borderBottomColor: Constants.background,
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

});



export default Styles;