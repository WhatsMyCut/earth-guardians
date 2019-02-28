export default googleAnalytics = function(page_name) {
  return () => {
    console.log('googleAnalytics', page_name)
    try {
      const analytics = new Analytics('UA-131896215-1');
      analytics
        .hit(new PageHit(page_name))
        .then(() => console.log('GA success'))
        .catch(e => console.log(e.message));
    } catch (e) {
      console.log(e);
    }
  };

}
