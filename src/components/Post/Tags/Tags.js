// @flow
import React from 'react';
import { Link } from 'gatsby';
import styles from './Tags.module.scss';

type Props = {
  tags: string[],
  tagSlugs: string[],
};

const Tags = ({ tags, tagSlugs }: Props) => (
  <div className={styles['tags']}>
    {/* <h2 className={styles['tags__header']}>{'관련 태그'}</h2> */}
    <ul className={styles['tags__list']}>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <li className={styles['tags__list-item']} key={tags[i]}>
            <Link to={slug} className={styles['tags__list-item-link']}>
              {tags[i]}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Tags;
