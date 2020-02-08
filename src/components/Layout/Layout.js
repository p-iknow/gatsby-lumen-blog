// @flow
import React from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  keywords?: Array,
  author?: string,
};

const Layout = ({ children, title, description, keywords, author }: Props) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="ko" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords && keywords.join(', ')} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content />
    </Helmet>
    {children}
  </div>
);

export default Layout;
