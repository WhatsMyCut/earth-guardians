import { Analytics, PageHit, Event } from 'expo-analytics';
export const analytics = new Analytics('UA-131896215-1');
export const _pageHit = (page, callback) => {
  // console.log('googleAnalytics.pageHit', page)
  analytics
    .hit(new PageHit(page))
    .then( (typeof(callback) === 'function' ? () => callback({page}) : callback))
    .catch(e => console.log(e.message));
}
export const _eventHit = (event, params, callback) => {
  // console.log('googleAnalytics.eventHit', event, params)
  analytics
    .event(new Event(event, params))
    .then(() => (typeof(callback) === 'function' ? callback({event, params}) : callback))
    .catch(e => console.log(e.message));
}

