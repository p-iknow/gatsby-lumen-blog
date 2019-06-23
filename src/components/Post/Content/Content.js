// @flow
import React from 'react';
import styles from './Content.module.scss';
import Meta from '../Meta';
import type { Node } from '../../types';

type Props = {
  date: Node.frontmatte.date,
  body: string,
  title: string,
};

const Content = ({ body, title, date }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <Meta date={date} />
    <div
      className={styles['content__body']}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

export default Content;
