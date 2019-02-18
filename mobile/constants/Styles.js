import {
  StyleSheet,
  Dimensions
} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width

export const defaults = {
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    margin: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
}

export const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    marginBottom: 10
  },
  itemName: {
    color: '#fff',
    fontSize: 12,
    marginRight: 5
  },
  itemDescription: {
    color: '#fff',
    fontSize: 10,
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
  }
});
