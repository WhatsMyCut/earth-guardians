import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Layout from './Layout';
import Colors from './Colors';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

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
defaults.fullWidth = SCREEN_WIDTH
defaults.hairline = StyleSheet.hairlineWidth

export const styles = ScaledSheet.create({
  // Main shared styles
  container: {
    flex: 1,
  },
  blackBG: {
    backgroundColor: Colors.black,
  },
  title: {
    fontSize: moderateScale(22),
    color: Colors.white,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  promo: {
    fontSize: moderateScale(16),
    color: Colors.white
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    minWidth: 130,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10
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
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.75,
    shadowOffset: {
        width: 0,
        height: 0
    },
    backgroundColor: Colors.white
  },
  cardHeaderText: {
    color: Colors.white,
    height: 30,
    width: 200,
    textAlign: 'left',
    marginVertical: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  cardPlaceholderText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova Bold',
    color: Colors.lightGray,
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
  badgeImage: {
    flex: 1,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 10
  },
  // Info Views
  greyCard: {
    flex: 1,
    backgroundColor: Colors.darkGray,
  },
  greyCardHeader: {
    backgroundColor: Colors.darkGray,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  modalView: {
    flexShrink: 0,
    flexGrow: 1,
    minHeight: 250,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: defaults.borderRadius,
    padding: 30,
    marginHorizontal: 20,
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 2
    },
    zIndex: 999,
  },
  containerGrey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGray,
  },
  containerTitle: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: moderateScale(24),
    fontVariant: [ 'small-caps' ],
    marginBottom: 15,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    height: 80,
  },
  headerText: {
    color: Colors.white,
    fontSize: moderateScale(24),
    fontFamily: 'Proxima Nova Bold',
    textAlign: 'center',
  },
  smallWhiteText: {
    color: Colors.white,
    marginBottom: 10,
    fontSize: moderateScale(12),
  },
  smallGreyText: {
    color: Colors.lightGray,
    marginBottom: 10,
    fontSize: moderateScale(12),
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
    borderBottomColor: Colors.white,
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
    color: Colors.white,
    fontSize: moderateScale(12),
    marginRight: 5
  },
  padRight50: {
    paddingRight: 50
  },
  item: {
    alignContent: 'space-between',
    shadowColor: Colors.black,
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
  componentHeader: {
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  textWhite: {
    color: Colors.white,
    fontSize: moderateScale(14),
    fontWeight: 'normal'
  },
  textWhite18B: {
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: 'bold'
  },
  textGrey18B: {
    color: Colors.darkGray,
    fontSize: moderateScale(18),
    fontWeight: 'bold'
  },
  smallTextShadow: {
    textShadowColor: Colors.darkGray,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
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
    fontSize: moderateScale(18),
    color: Colors.white,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  petitionText: {
    fontSize: moderateScale(16),
    color: Colors.white,
    paddingBottom: 10,
  },
  linearGradientBox: {
    flex: 1,
    borderRadius: defaults.borderRadius,
    elevation: 1,
    marginVertical: 5,
    shadowColor: Colors.black,
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
    shadowColor: Colors.black,
    shadowRadius: 2,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  graphContainer: {
    //backgroundColor: Colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    height: 150,
  },
  graphLabel: {
    color: Colors.white,
    fontFamily:"Proxima Nova Bold",
    fontSize: moderateScale(14),
    paddingRight:10
  },
  actionCard: {
    backgroundColor: Colors.white,
    position: 'absolute',
    marginLeft: 10,
    top:0,
    bottom:0,
    left:0,
    right:0,
    height:250
  },
  actionCardHeader: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova Bold',
    color: Colors.mediumGray,
  },
  actionCardSubHeader: {
    fontSize: moderateScale(18),
    fontFamily: 'Proxima Nova Bold',
    color: Colors.mediumGray,
  },
  actionCardLabel: {
    fontFamily: 'Proxima Nova',
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  actionCardValue: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova Bold',
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  actionCardTinyLabel: {
    fontFamily: 'Proxima Nova',
    color: Colors.mediumGray,
    fontSize: moderateScale(9),
    textAlign: 'center',
  },
  actionCardPlaceholderText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova Bold',
    color: Colors.lightGray,
  },
  detailedPoints: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },

  itemPoint: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: moderateScale(20)
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
    borderBottomColor: Colors.white,
    alignSelf: 'center',
    padding: 10,
    paddingBottom: 5,
  },
  detailRow: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  detailCell: {
    flexDirection: 'column',
    color: Colors.white,
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
    color: Colors.white,
    fontWeight: '500',
    fontSize: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  rankState: {
    flexBasis: '15%',
    color: Colors.white,
    fontSize: moderateScale(22),
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
    color: Colors.white,
    fontSize: moderateScale(22),
    fontWeight: '500',
    paddingBottom: 10
  },
  socialRankHeader: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontWeight: '500',
    paddingBottom: 10
  },
  socialRankNumber: {
    flexBasis: '25%',
    color: Colors.white,
    fontSize: moderateScale(22),
    fontWeight: '500',
    paddingRight: 15,
    paddingTop: 5,
    fontVariant: ['tabular-nums'],
    textAlign: 'center'
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
    shadowColor: Colors.black,
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
    shadowColor: Colors.black,
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
    color: Colors.white,
  },
  profileImage: {
    width: 150,
    height: 150,
    margin: 10,
    borderColor: Colors.white,
    borderWidth: 3,
    borderRadius: 75,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  profileRow: {
    flex: 1,
    width: '90%',
    paddingBottom: 5,
  },
  profileCell: {
    flex: 1,
    color: Colors.white,
    justifyContent: 'center',
  },
  profilePlaceholerText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova Bold',
    color: Colors.mediumGray,
  },
  social: {
    borderRadius: defaults.borderRadius,
    borderWidth: 1,
    backgroundColor: Colors.mediumGray,
    width: 350,
    paddingVertical: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  socialItem: {
    color: Colors.white,
    fontSize: moderateScale(18),
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
    color: Colors.white,
    marginVertical: 20
  },
});
