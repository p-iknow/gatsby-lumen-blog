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
      {moment(date).format('YYYY년 MM월 D일')}, 오늘도 기록하고 성장합니다.
    </p>
  </div>
);

export default Meta;
