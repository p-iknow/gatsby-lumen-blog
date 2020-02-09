// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
              contacts {
                email
                twitter
                github
                rss
                facebook
              }
            }
            menu {
              label
              path
            }
            url
            title
            subtitle
            copyright
            disqusShortname
            utterancesConfig {
              src
              repo
              issueTerm
              label
              theme
              crossorigin
              async
            }
          }
        }
      }
    `,
  );

  return site.siteMetadata;
};

export default useSiteMetadata;
