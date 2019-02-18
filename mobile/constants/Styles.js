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
    marginHorizontal: 10,
    paddingHorizontal: 10,
}
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SAFE_WIDTH = Layout.window.width - 2 * defaults.marginHorizontal;
defaults.primaryHeight = SCREEN_HEIGHT
defaults.width = SAFE_WIDTH

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackBG: {
    backgroundColor: '#000000',
  },
  greyCard: {
    flex: 1,
    backgroundColor: '#333'
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
    fontVariant: [ 'small-caps' ]
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center'
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
  videoContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
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
  imageLinearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: defaults.borderRadius,
  },
  viewA_container: {
    //backgroundColor: '#666',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    height: 120,
    marginVertical:5,
    flexDirection: 'row',
  },
  viewB_container: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH * 0.9,
    height: 150,
    paddingHorizontal: 10,
    paddingRight:20,
    marginVertical: 15,
  },
  reachComponent: {
    //backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,

    padding: 10,
  },

  linearGradientBox: {
    flex: 1,
    borderRadius: 5,
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
    borderRadius: 5,
    paddingTop:20,
    paddingBottom:20,
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
  donutGraphContainer: {
    //backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    height: 150,
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
  rankContainer: {
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
  rankNumber: {
    flexBasis: '15%',
    color: '#fff',
    fontWeight: '500',
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  rankDetail: {
    flexBasis: '85%',
    fontWeight: '500',
  },
  rankName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    paddingBottom: 10
  },
  topBackNav: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 30,
    paddingHorizontal: 5,
    zIndex:1
  },
  headlineView: {
    height: defaults.primaryHeight,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 35,
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
  headlineViewPlayIcon: {
    position: 'absolute',
    opacity: 0.8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLinearGradient: {
    position: 'absolute',
    width: defaults.width,
    height: defaults.primaryHeight,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: defaults.borderRadius,
  },
  primaryMedia: {
    width: defaults.width,
    height: defaults.primaryHeight,
    borderRadius: defaults.borderRadius,
  },

});
