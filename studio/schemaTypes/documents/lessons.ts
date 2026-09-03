
/**
 * Playback happens on our own lesson page through the provider's embed, so only providers we
 * can both ingest transcripts from and embed are accepted.
 */
const SUPPORTED_VIDEO_HOSTS = [
    'youtube.com',
    'www.youtube.com',
    'youtu.be',
    'vimeo.com',
    'player.vimeo.com',
    'iframe.mediadelivery.net', // Bunny Stream
    'video.bunnycdn.com',
  ]
