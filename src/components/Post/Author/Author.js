// @flow
import React from 'react';
import { withPrefix } from 'gatsby';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <img
        src={withPrefix(author.photo)}
        className={styles['author__photo']}
        width="65"
        height="65"
        alt={author.name}
      />
      <p className={styles['author__bio']}>
        <a
          className={styles['author__bio-twitter']}
          href={getContactHref('twitter', author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong>
        </a>
        <span className={styles['author__bio-subtitle']}>
          {author.bio}
          <br />
          계발자 이영창 입니다.
        </span>
      </p>
    </div>
  );
};

export default Author;
