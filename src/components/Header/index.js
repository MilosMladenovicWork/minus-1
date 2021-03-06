import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import styles from './header.module.scss'
import logo from '../../img/test/logo.png'

const Header = ({ className, minimized, children }) => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: allPrismicLogo {
        edges {
          node {
            data {
              logo {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 250) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <header className={`${styles.header} ${className} ${minimized && styles.minimized}`}>
      <Link to={'/'}>
        <div className={styles.logo}>
          {data.logo &&
            data.logo.edges[0] &&
            data.logo.edges[0].node &&
            data.logo.edges[0].node.data &&
            data.logo.edges[0].node.data.logo &&
            data.logo.edges[0].node.data.logo.localFile &&
            data.logo.edges[0].node.data.logo.localFile.childImageSharp && (
              <Image
                fluid={
                  data.logo.edges[0].node.data.logo.localFile.childImageSharp
                    .fluid
                }
                alt={
                  data.logo.edges[0].node.data.logo.alt
                    ? data.logo.edges[0].node.data.logo.alt
                    : 'Minus1 logo image'
                }
              />
            )}
        </div>
      </Link>
      {
        children
      }
    </header>
  )
}

export default Header
