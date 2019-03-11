import { Analytics, PageHit } from 'expo-analytics';
export const analytics = new Analytics('UA-131896215-1');
export const pageHit = (page_name) => {
  return () => {
    console.log('googleAnalytics.pageHit', page_name)
    try {
      analytics
        .hit(new PageHit(page_name))
        .then(() => console.log('GA success'))
        .catch(e => console.log(e.message));
    } catch (e) {
      console.log(e);
    }
  };
}
export const eventHit = (phone, item_id) => {
  return () => {
    console.log('googleAnalytics.eventHit', phone, item_id)
    try {
      analytics
        .event(new Event('MyAction', 'Press', phone, item_id))
        .then(() => {
          this.setState({in:false})
        })
        .catch(e => console.log(e.message));
    } catch (e) {
      console.log(e);
    }
  }
}

