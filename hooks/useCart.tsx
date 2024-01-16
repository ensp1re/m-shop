import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { toast } from "react-hot-toast"

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartIncrease: (product: CartProductType) => void;
    handleCartDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void

    cartTotalAmount: number;



}
export const CartContext = createContext<CartContextType | null>(null);


interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)


    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
     





    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cartProducts: CartProductType[] | null = JSON.parse(cartItems)

        const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent")
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)


        setCartProducts(cartProducts)
        setPaymentIntent(paymentIntent)
    }, [])


    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity

                    acc.total += itemTotal
                    acc.qty += item.quantity

                    return acc

                },
                    {
                        total: 0,
                        qty: 0
                    }
                );
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        }
        getTotals()
    }, [cartProducts])


    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            // add to local storage
            toast.success("Product added to cart")
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProduct = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProduct)
            toast.success("Product removed")
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProduct))
            return filteredProduct
        }
    }, [cartProducts])

    const handleCartIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 99) {
            return toast.error('Opps! Maximum reached')
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

        }
    }, [cartProducts])

    const handleCartDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 1) {
            return toast.error('Oops! Minimum reached!')
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

        }
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)

        localStorage.setItem("eShopCartItems", JSON.stringify(null))
    }, [cartProducts])


    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(val))
    }, [paymentIntent])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartIncrease,
        handleCartDecrease,
        handleClearCart,
        cartTotalAmount,
        paymentIntent,
        handleSetPaymentIntent
    }

    return <CartContext.Provider value={value} {...props} />

}


export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("userCart must be used within a CartContextProvider")
    }

    return context
}