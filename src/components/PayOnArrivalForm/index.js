import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import updateSoldProducts from '../../utils/updateSoldProducts'

import styles from './pay-on-arrival-form.module.scss'
import PrimaryButton from '../PrimaryButton'

const PayOnArrivalForm = ({
  products,
  price,
  totalPrice,
  setTotalPrice,
  onSuccess,
}) => {
  const data = useStaticQuery(graphql`
    query PayOnArrivalFormQuery {
      logo: allPrismicLogo {
        edges {
          node {
            data {
              logo {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
      locationsAndPrices: prismicShippingPrices {
        data {
          locations_and_prices {
            location
            price
          }
        }
      }
    }
  `)

  const [firstName, setFirstName] = useState(undefined)
  const [lastName, setLastName] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [phoneNumber, setPhoneNumber] = useState(undefined)
  const [message, setMessage] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [state, setState] = useState(undefined)
  const [city, setCity] = useState(undefined)
  const [zipCode, setZipCode] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [fetching, setFetching] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(0)

  const maxLengthCheck = (event) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength)
    }
  }

  useEffect(() => {
    setTotalPrice(price + shippingPrice)
  }, [price, shippingPrice])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    if (
      !address ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !country ||
      !city ||
      !zipCode ||
      !(
        email &&
        email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    ) {
      setErrorMessage('Required fields not filled!')
    } else {
      setFetching(true)
      setErrorMessage(undefined)
      fetch(
        `/.netlify/functions/pay-on-arrival-form?firstName=${firstName}&lastName=${lastName}&email=${email}&address=${address}&phoneNumber=${phoneNumber}&country=${country}&state=${state}&city=${city}&zipCode=${zipCode}&message=${message}&price=${totalPrice}&products=${JSON.stringify(
          products.map((product) => {
            return {
              quantity: product.quantity,
              title: product.data.title,
              color: product.data.color_name,
              size: product.size,
              uid: product.uid,
            }
          })
        )}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 'success') {
            setFetching(false)
            updateSoldProducts(products, onSuccess)
            return setSuccessMessage(data.message)
          } else if (data.status == 'error') {
            setFetching(false)
            return setErrorMessage(data.message)
          }
        })
        .catch((error) => {
          setFetching(false)
          setErrorMessage(
            'There was some error while trying to send your email. Try later!'
          )
        })
    }
  }

  const getAndSetShippingPrice = (optionIndex) => {
    let queryDataIndex = optionIndex - 1
    if (queryDataIndex >= 0) {
      let shippingPrice =
        data.locationsAndPrices.data.locations_and_prices[queryDataIndex].price
      setShippingPrice(shippingPrice)
    } else {
      setShippingPrice(0)
    }
  }

  return (
    <form className={styles.contactForm}>
      <h4>Pay on arrival</h4>
      <div className={styles.inputsGroup}>
        <h2 className={styles.groupHeading}>Contact Information</h2>
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="phone number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.inputsGroup}>
        <h2 className={styles.groupHeading}>Location information</h2>
        <select
          name="country"
          onChange={(e) => {
            setCountry(e.target.value)
            getAndSetShippingPrice(e.target.selectedIndex)
          }}
        >
          <option value="">country</option>
          {data.locationsAndPrices.data.locations_and_prices.length > 0 &&
            data.locationsAndPrices.data.locations_and_prices.map(
              (node, index) => {
                if (node.location && node.price) {
                  return (
                    <option
                      value={node.location}
                      price={node.price}
                      key={index}
                    >
                      {node.location}
                    </option>
                  )
                }
              }
            )}
        </select>
        <input
          type="text"
          name="state"
          placeholder="state"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          name="zipCode"
          placeholder="zip code"
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div className={styles.inputsGroup}>
        <h2 className={styles.groupHeading}>Other information</h2>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message to seller"
        ></textarea>
      </div>
      {successMessage ||
        (errorMessage && (
          <p className={styles.statusText}>{successMessage || errorMessage}</p>
        ))}
      {fetching && (
        <div className={styles.loadingIndicatorContainer}>
          <div className={styles.loadingIndicator}>
            {data.logo &&
              data.logo.edges > 0 &&
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
                  alt={'loading indicator'}
                />
              )}
          </div>
        </div>
      )}
      <div onClick={(e) => handleSubmit(e)}>
        <PrimaryButton text="send" />
      </div>
    </form>
  )
}

export default PayOnArrivalForm
