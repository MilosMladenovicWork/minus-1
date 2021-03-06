import React from 'react'
import { Link } from 'gatsby'

import styles from './preview-filters.module.scss'

const PreviewFilters = ({ location, currentPreview, data }) => {
  return (
    <div className={styles.filtersContainer}>
      <Link
        to={`${currentPreview}/all`}
        className={
          location.pathname == `${currentPreview}/all` && styles.activeLink
        }
      >
        all
      </Link>
      {data.productCategories &&
        data.productCategories.edges.length > 0 &&
        data.productCategories.edges.map(({ node }, index) => {
          return (
            <Link
              key={index}
              to={`${currentPreview}/${node.uid}`}
              className={
                location.pathname == `${currentPreview}/${node.uid}` &&
                styles.activeLink
              }
            >
              {node.data.product_category}
            </Link>
          )
        })}
    </div>
  )
}

export default PreviewFilters
