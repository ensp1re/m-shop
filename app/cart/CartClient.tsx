'use client'
import {useCart} from "@/hooks/useCart";
import Link from "next/link";
import {MdArrowBack} from "react-icons/md";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import ItemContent from "@/app/cart/ItemContent";
import {formatPrice} from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface CartClientProps {
    currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart()

    const router = useRouter()

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack/>
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div>
            <Heading title="Shopping Cart" center/>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item}/>;
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[100px]">
                    <Button label="Clear Cart" onClick={() => {
                        handleClearCart()
                    }} small outline/>
                </div>
                <div className="text-sm flex flex-col gap-1 items-start ">
                    <div className="flex justify-between text-base font-semibold w-full">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <p className="text-slate-500">Taxes an shipping at checkout</p>
                    <Button label={currentUser ? "Checkout" : "Login to Checkout"} onClick={() => {
                       { currentUser ? router.push('/checkout') : router.push('/login')}
                    }}/>
                    <Link href="/" className="flex items-center gap-1 text-slate-500 md-2 w-full">
                        <MdArrowBack/>
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartClient;