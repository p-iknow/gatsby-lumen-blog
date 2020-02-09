// @flow
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import { SocialShare } from './SocialShare';
import { SponsorButton } from './SponsorButton';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node,
  sponserId: string,
};

const Post = ({ post, sponserId }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date, author } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">
        All Articles
      </Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} date={date} />
      </div>

      <div className={styles['post__footer']}>
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        {/* TODO */}
        {/* <SocialShare title={title} author={author} />
        {!!sponserId && <SponsorButton sponsorId={sponserId} />} */}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
