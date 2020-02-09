import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

const getImgSrc = (htmlString, siteUrl) => {
  const result = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/.exec(htmlString);
  if (result == null || result.length < 2) return;
  let imgSrc = result[1];
  if (imgSrc.includes('c.disquscdn.com/')) return;

  if (imgSrc.startsWith('/static'))
    imgSrc = siteUrl.concat(imgSrc.substring(1));
  return imgSrc;
};

type Props = {
  data: MarkdownRemark,
};

const PostTemplate = ({ data }: Props) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle,
    author: { name },
    url: siteUrl,
    sponser: { buyMeACoffeeId },
  } = useSiteMetadata();
  const {
    title: postTitle,
    description: postDescription,
    tags: keywords,
    img,
  } = data.markdownRemark.frontmatter;
  const metaDescription =
    postDescription || data.markdownRemark.excerpt || siteSubtitle;
  const imgSrc = img || getImgSrc(data.markdownRemark.html, siteUrl);

  return (
    <Layout
      title={`${postTitle} - ${siteTitle}`}
      description={metaDescription}
      keywords={keywords}
      author={name}
      imgSrc={imgSrc}
    >
      <Post post={data.markdownRemark} sponserId={buyMeACoffeeId} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 280)
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        img
      }
    }
  }
`;

export default PostTemplate;
