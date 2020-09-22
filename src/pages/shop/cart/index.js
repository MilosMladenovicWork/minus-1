import React, {useEffect, useState} from 'react'

import PageLayout from '../../../components/PageLayout'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import SiteTree from '../../../components/SiteTree'
import styles from './cart.module.scss'
import CartContainer from '../../../components/CartContainer'
import CartHeader from '../../../components/CartHeader'
import CartHeaderItem from '../../../components/CartHeaderItem'
import CartProduct from '../../../components/CartProduct'

const CartPage = () => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        if(localStorage.getItem('cart')){
            setCart(JSON.parse(localStorage.getItem('cart')))
        }else{
            setCart([])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const removeProduct = (product) => {
        let newArray = [...cart]
        console.log(newArray[0].uid, product.uid)
        let indexOfItem = newArray.findIndex(item => {
            if(item.uid == product.uid && item.size == product.size){
                return true
            }else{
                return false
            }
        })

        if(indexOfItem !== -1){
            newArray.splice(indexOfItem, 1)
        }
        setCart(newArray)
    }


    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <CartContainer>
                    <CartHeader>
                        <CartHeaderItem active={true}>
                            View/edit basket
                        </CartHeaderItem>
                        <CartHeaderItem disabled={true}>
                            Shipping / Payment
                        </CartHeaderItem>
                        <CartHeaderItem disabled={true}>
                            Confirmation
                        </CartHeaderItem>
                        <CartHeaderItem fullWidth={true} presentational={true}>
                            <p className={styles.cartCount}>
                                {cart.length} {cart.length == 1 ? 'item' : 'items'} in your basket
                            </p>
                        </CartHeaderItem>
                    </CartHeader>
                    <div className={styles.cartBody}>
                        <table className={styles.products}>
                            <tbody>
                                {cart.map((cartItem, index) => {
                                    return <CartProduct key={index} removeProduct={removeProduct} data={cartItem}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                </CartContainer>
            </div>
            <div className={styles.navFooterContainer}>
                <SiteTree links={[{text: 'home',link:'/'}, {text: 'shop', link:'/shop/all'}]}/>
                <NavFooterDesktop
                    linksArray={
                        [
                            {
                                link:[
                                    {
                                        text:'view all',
                                        href:'/shop/all'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'sizing',
                                        href:'/shop/sizing'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'shipping',
                                        href:'/shop/shipping'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'terms',
                                        href:'/shop/terms'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'privacy',
                                        href:'/shop/privacy'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'f.a.q.',
                                        href:'/shop/faq'
                                    }
                                ]
                            },
                    ]
                    }
                />
            </div>
        </PageLayout>
    )
}

export default CartPage