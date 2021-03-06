import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styles from './shipping.module.scss'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'
import CartPopUp from '../../../components/CartPopUp'
import SEO from '../../../components/SEO'
import NavFooterMobile2 from '../../../components/NavFooterMobile2'

const ShippingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ShippingPageQuery {
      shipping: prismicShopShipping {
        data {
          shipping_body {
            html
            text
          }
        }
      }
    }
  `)

  const [cart, setCart] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
      }
    }
  }, [])

  return (
    <PageLayout minimizedHeader>
      <SEO
        titleTemplate={'%s | Shipping'}
        url={location.href}
        description={
          data.shipping &&
          data.shipping.data.shipping_body &&
          data.shipping.data.shipping_body.text
        }
      />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          {cart.length > 0 && (
            <div className={styles.cartContainer}>
              <CartPopUp cart={cart} />
            </div>
          )}
          <div
            className={styles.termsContainer}
            dangerouslySetInnerHTML={{
              __html:
                data.shipping &&
                data.shipping.data.shipping_body &&
                data.shipping.data.shipping_body.html,
            }}
          ></div>
        </div>
      </div>
      <div className={styles.navFooterContainer}>
        <SiteTree
          links={[
            { text: 'home', link: '/' },
            { text: 'shop', link: '/shop/all' },
          ]}
        />
        <NavFooterDesktop
          linksArray={[
            {
              link: [
                {
                  text: 'view all',
                  href: '/shop/all',
                },
              ],
            },
            {
              link: [
                {
                  text: 'sizing',
                  href: '/shop/sizing',
                },
              ],
            },
            {
              link: [
                {
                  text: 'shipping',
                  href: '/shop/shipping',
                },
              ],
            },
            {
              link: [
                {
                  text: 'terms',
                  href: '/shop/terms',
                },
              ],
            },
            {
              link: [
                {
                  text: 'privacy',
                  href: '/shop/privacy',
                },
              ],
            },
            {
              link: [
                {
                  text: 'f.a.q.',
                  href: '/shop/faq',
                },
              ],
            },
          ]}
        />
      </div>
      <NavFooterMobile2 />
    </PageLayout>
  )
}

export default ShippingPage
