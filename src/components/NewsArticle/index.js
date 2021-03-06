import React from 'react'

import styles from './news-article.module.scss'
import FadeImageSlider from '../../components/FadeImageSlider/index'
import { Link } from 'gatsby'

const NewsArticle = ({
  showArchive,
  archiveButtonHandler,
  heading,
  images,
  date,
  body,
  articlePage,
}) => {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.imageSliderContainer}>
        <FadeImageSlider images={images} heading={heading} />
      </div>
      <div>
        <article className={styles.newsArticleContainer}>
          <time className={styles.date}>{date}</time>
          {articlePage ? (
            <h1 className={styles.heading}>{heading}</h1>
          ) : (
            <h2 className={styles.heading}>{heading}</h2>
          )}
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        </article>
        {showArchive && (
          <React.Fragment>
            <Link to={'/news/archive'}>archive</Link>
            <button onClick={() => archiveButtonHandler()}>archive</button>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default NewsArticle
