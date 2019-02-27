export default _fetchVideoUrl = function(video_id) {
  // console.log('_fetchVideoUrl', video_id)
  return fetch(`https://api.vimeo.com/videos/${video_id}`, {
    headers: {
      authorization: 'Bearer 5af014003bea7ca29ec721cc5a7bd34d',
    },
  })
  .then(response => response.json())
  .then(data => {
    return {
      picture_url: data.pictures.sizes[4].link,
      video_url: data.download[data.download.length - 2].link
    }
  });
}
