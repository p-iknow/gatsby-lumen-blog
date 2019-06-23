// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  date: string,
};

const Meta = ({ date }: Props) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>
      {moment(date).format('YYYY년 MM월 D일')}
    </p>
  </div>
);

export default Meta;
