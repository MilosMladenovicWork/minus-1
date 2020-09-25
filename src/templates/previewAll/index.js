import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import styles from './preview-all.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import NavFooterMobile from '../../components/NavFooterMobile'
import PreviewFilters from '../../components/PreviewFilters'
import ProductsContainer from '../../components/ProductsContainer'
import ProductThumbnail from '../../components/ProductThumbnail'

const PreviewAllPage = ({data, location}) => {
    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.productContainer}>
                    <div className={styles.filters}>
                        {
                            typeof location != 'undefined' &&
                            <PreviewFilters data={data} location={location} currentPreview={`/previews/${data.currentPreview.uid}`}/>
                        }
                    </div>
                    <ProductsContainer>
                        {data.products.edges.map(({node}) => {
                            return <div className={styles.product}>
                                <Link to={`/previews/${data.currentPreview.uid}/${node.data.product_category.uid}/${node.data.product_family.uid}?product=${node.uid}`}>
                                    <ProductThumbnail image={node.data.images[0].image.localFile.childImageSharp.fluid} alt={node.data.images[0].image.alt}/>
                                </Link>
                            </div>
                        })}
                    </ProductsContainer>
                </div>
            </div>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
                <ul className={styles.otherLinks}>
                    <li>
                        <Link to={`/previews/${data.currentPreview.uid}/all`}>
                            view all
                        </Link>
                    </li>
                </ul>
            </div>
            <NavFooterMobile/>
        </PageLayout>
    )
}

export const pageQuery = graphql`
    query PreviewAllPageQuery($uid: String!){
        currentPreview: prismicPreview(uid:{eq:$uid}){
            uid
        }
        products: allPrismicPreviewProduct(filter:{data:{preview:{uid:{eq:$uid}}}}){
            edges {
                node {
                  data {
                    images {
                      image {
                        alt
                        localFile {
                          childImageSharp {
                            fluid(maxWidth: 450) {
                              ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                    product_category {
                        uid
                    }
                    product_family {
                        uid
                    }
                  }
                  uid
                }
              }
        }
        productCategories:allPrismicPreviewProductCategory(filter:{data:{preview:{uid:{eq:$uid}}}}) {
            edges {
              node {
                data {
                  product_category
                }
                uid
              }
            }
        }
    }
`

export default PreviewAllPage