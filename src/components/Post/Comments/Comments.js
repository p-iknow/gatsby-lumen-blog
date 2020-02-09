// @flow
import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import Utterences from './Utterances.js';
import { useSiteMetadata } from '../../../hooks';

type Props = {
  postTitle: string,
  postSlug: string,
};

const Comments = ({ postTitle, postSlug }: Props) => {
  const { url, disqusShortname, utterancesConfig } = useSiteMetadata();
  if (utterancesConfig) {
    return <Utterences utterancesConfig={utterancesConfig} />;
  }

  if (!disqusShortname) {
    return null;
  }

  return (
    <ReactDisqusComments
      shortname={disqusShortname}
      identifier={postTitle}
      title={postTitle}
      url={url + postSlug}
    />
  );
};

export default Comments;
