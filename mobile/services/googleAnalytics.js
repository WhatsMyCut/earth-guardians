import { Analytics, PageHit } from 'expo-analytics';
export const analytics = new Analytics('UA-131896215-1');
export const pageHit = (params, callback) => {
  return () => {
    console.log('googleAnalytics.pageHit', params)
    try {
      analytics
        .hit(new PageHit(params))
        .then(() => (typeOf(callback) === 'function' ? callback() : callback))
        .catch(e => console.log(e.message));
    } catch (e) {
      console.log(e);
    }
  };
}
export const eventHit = (params, callback) => {
  return () => {
    console.log('googleAnalytics.eventHit', phone, item_id)
    try {
      analytics
        .event(new Event(params))
        .then(() => (typeOf(callback) === 'function' ? callback() : callback))
        .catch(e => console.log(e.message));
    } catch (e) {
      console.log(e);
    }
  }
}

