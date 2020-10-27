const SvgFbIcon = require('../assets/fb-icon.svg?raw')
const SvgTwitterIcon = require('../assets/twitter-icon.svg?raw')
const SvgIgIcon = require('../assets/ig-icon.svg?raw')
const SvgGithubIcon = require('../assets/github-icon.svg?raw')

const FACEBOOK_LINK = {
  href: 'https://www.facebook.com/readr.tw',
  svgIcon: SvgFbIcon,
}
const TWITTER_LINK = {
  href: 'https://twitter.com/READr_news',
  svgIcon: SvgTwitterIcon,
}
const INSTAGRAM_LINK = {
  href: 'https://www.instagram.com/readrteam_daily/',
  svgIcon: SvgIgIcon,
}
const GITHUB_LINK = {
  href: 'https://github.com/readr-media/readr-data',
  svgIcon: SvgGithubIcon,
}

const SOCIAL_MEDIA_LINKS = {
  FACEBOOK_LINK,
  TWITTER_LINK,
  INSTAGRAM_LINK,
  GITHUB_LINK,
}

Object.assign(module.exports, {
  SOCIAL_MEDIA_LINKS,
})
