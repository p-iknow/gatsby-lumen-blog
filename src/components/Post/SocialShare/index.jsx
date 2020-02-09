import React from 'react'
import { FacebookIcon } from './facebook-icon'
import { TwitterIcon } from './twitter-icon'
import { useSiteMetadata } from '../../../hooks';
import './index.scss'


export const SocialShare = ({ title, author }) => {
  const text = `Recommend on "${title}" written by @${author}`

  const shareToFacebook = (href, text) => {
    window.FB.ui({
      method: 'share',
      mobile_iframe: true,
      href,
      quote: text,
    })
  }
  
  const shareToTwitter = (href, text) => {
    window.open(
      `https://twitter.com/share?url=${encodeURI(encodeURI(href))}&text=${text}`,
      'sharer',
      'toolbar=0,status=0,width=626,height=436'
    )
  }

  const onClickTwitterIcon = e => {
    e.preventDefault()

    return shareToTwitter(window.location.href, text)
  }

  const onClickFacebookIcon = e => {
    e.preventDefault()
    return shareToFacebook(window.location.href, text)
  }

  return (
    <div className="social-share">
      <FacebookIcon onClick={onClickFacebookIcon} />
      <TwitterIcon onClick={onClickTwitterIcon} />
    </div>
  )
}
