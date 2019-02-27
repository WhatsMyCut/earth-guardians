import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Layout from '../constants/Layout';

export const defaults = {
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    margin: 20,
    padding: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
}
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SAFE_WIDTH = Layout.window.width - 2 * defaults.marginHorizontal;
export const CARD_WIDTH = Dimensions.get("window").width * 0.87;
export const CARD_HEIGHT = Dimensions.get("window").height * 0.65;
defaults.primaryHeight = SCREEN_HEIGHT
defaults.width = SAFE_WIDTH
defaults.hairline = StyleSheet.hairlineWidth

export const styles = StyleSheet.create({
  // Main shared styles
  container: {
    flex: 1,
  },
  blackBG: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  promo: {
    fontSize: 16,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#fff',
    width: 130,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  coverScreen: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  coverAll: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  // Game Cards
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    position: "absolute",
    padding: 0,
    top: 0,
    borderRadius: defaults.borderRadius,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.75,
    shadowOffset: {
        width: 0,
        height: 0
    },
    backgroundColor: "white"
  },
  indexGradient: {
    position: 'absolute',
    borderRadius: defaults.borderRadius,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: defaults.borderRadius
  },
  // Info Views
  greyCard: {
    flex: 1,
    backgroundColor: '#333',
  },
  greyCardHeader: {
    backgroundColor: '#333',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  modalView: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: defaults.borderRadius,
    paddingVertical: 30,
    paddingHorizontal: 60,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  containerGrey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  containerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
    fontVariant: [ 'small-caps' ],
    marginBottom: 15,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 10,
    height: 80,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Proxima Nova Bold',
    textAlign: 'center',
  },
  smallWhiteText: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 12,
  },
  smallGreyText: {
    color: '#ccc',
    marginBottom: 10,
    fontSize: 12,
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  underline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fff',
  },
  padded: {
    padding: defaults.padding
  },
  splashLogoContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 35
  },
  itemView: {
    flexDirection: 'row',
    marginBottom: 10
  },
  itemName: {
    color: '#fff',
    fontSize: 12,
    marginRight: 5
  },
  padRight50: {
    paddingRight: 50
  },
  item: {
    alignContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
    paddingLeft:10,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: defaults.borderRadius,
    backfaceVisibility: 'hidden',
  },
  gradient: {
    position: 'absolute',
    borderRadius: defaults.borderRadius,
    marginLeft:10,
    top:0,
    bottom:0,
    left:0,
    right:0,
    height:250
  },
  flippedItem: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    marginLeft: 10,
    top:0,
    bottom:0,
    left:0,
    right:-5,
    height:250
  },
  componentHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  textWhite: {
    color: "#fff",
    fontSize: defaults.fontSize,
    fontWeight: 'normal'
  },
  textWhite18B: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textGrey18B: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  gradientContainer: {
    position: 'absolute',
    borderRadius: defaults.borderRadius,
    left: 0,
    top: 0,
  },
  petitionCard: {
    height: SCREEN_HEIGHT - 180,
    width: SCREEN_WIDTH - 40,
    position: 'absolute',
    marginHorizontal: 20,
    borderRadius: defaults.borderRadius
  },
  petitionDimensions: {
    height: SCREEN_HEIGHT - 180,
    width: SCREEN_WIDTH - 40,
  },
  petitionCardTop: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1000,
  },
  petitionCardUnder: {
    zIndex: 999,
    top: 20,
  },
  petitionCardImage: {
    flex: 1,
    position: 'relative',
    height: null,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: defaults.borderRadius,
  },
  petitionDetails: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    zIndex: 1000,
    width: SAFE_WIDTH,
  },
  petitionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  petitionText: {
    fontSize: 16,
    color: '#fff',
    paddingBottom: 10,
  },
  linearGradientBox: {
    flex: 1,
    borderRadius: defaults.borderRadius,
    elevation: 1,
    marginVertical: 5,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  linearGradientBoxPadded: {
    flex: 1,
    borderRadius: defaults.borderRadius,
    paddingTop:20,
    paddingBottom:10,
    elevation: 1,
    marginVertical: 5,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  graphContainer: {
    //backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    height: 150,
  },
  graphLabel: {
    color:"white",
    fontFamily:"Proxima Nova Bold",
    fontSize:14,
    paddingRight:10
  },
  detailedPoints: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },

  itemPoint: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20
  },
  componentContainer: {
    flexDirection: 'column',
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'center'
  },
  rankRow: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  detailCell: {
    flexDirection: 'column',
    color: '#fff',
    justifyContent: 'center',
    flexBasis: '50%'
  },
  halfCell: {
    flexBasis: '50%'
  },
  noDivider: {
    borderBottomColor: 'transparent',
  },
  rankNumber: {
    flexBasis: '15%',
    color: '#fff',
    fontWeight: '500',
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  rankState: {
    flexBasis: '15%',
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rankDetail: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    fontWeight: '500',
  },
  rankName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    paddingBottom: 10
  },
  socialRankHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 10
  },
  socialRankNumber: {
    flexBasis: '25%',
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    paddingRight: 15,
    paddingTop: 5,
    fontVariant: ['tabular-nums'],
    textAlign: 'right'
  },
  myRankNumber: {
    fontSize: 24,
    color: 'lightgreen',
  },
  topNav: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 50,
    paddingHorizontal: defaults.paddingHorizontal,
    zIndex:1
  },
  headlineView: {
    flex: 1,
    height: defaults.primaryHeight / 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
    borderColor: 'transparent',
    borderRadius: defaults.borderRadius,
  },
  imageLinearGradient: {
    position: 'absolute',
    width: defaults.width,
    height: defaults.primaryHeight,
    borderRadius: defaults.borderRadius,
  },
  primaryMedia: {
    width: defaults.width,
    height: 250,
    top: 20,
    borderRadius: defaults.borderRadius,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  swipeButton: {
    padding: 20,
    marginHorizontal: 14,
    borderRadius: 50,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.32,
    shadowOffset: {
       width: 0,
       height: 0
    },
    backgroundColor: "white"
   },
   phoneInputContainer: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1,
    alignItems: 'flex-end',
    width: '100%',
  },
  countryCode: {
    width: 80,
    borderWidth: 0,
  },
  countryCodeInput: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    marginBottom: 0,
    paddingBottom: 0,
  },
  phoneInputNumber: {
    borderWidth: 0,
    width: '100%',
    paddingBottom: 15,
    color: '#fff',
  },
  profileImage: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  social: {
    borderRadius: defaults.borderRadius,
    borderWidth: 1,
    backgroundColor: '#666',
    width: 350,
    paddingVertical: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  socialItem: {
    color: '#fff',
    fontSize: 18
  },
  videoPlayIcon: {
    position: 'absolute',
    opacity: 0.8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: defaults.margin
  },
  notification: {
    color: '#fff',
    marginVertical: 20
  },
});
