"use client"

import {CartProductType, SelectedImgType} from "@/app/product/[productid]/ProductDetails";

interface SetColorProps {
    images: SelectedImgType[];
    cardProduct: CartProductType;
    handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({images, cardProduct, handleColorSelect}) => {
    return <div>
        <div className="flex gap-4 items-center">
            <span className="font-semibold">COLOR: </span>
            <div className="flex gap-1">
                {
                    images.map((image) => {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <div key={image.color} onClick={() => handleColorSelect(image)} className={`h-7 w-7 rounded-full border-teal-300 flex items-center 
                            justify-center ${cardProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"}`}>
                                <div style={{background: image.colorCode}} className="
                                h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer
                                ">

                                </div>
                            </div>
                        )

                    })}
            </div>
        </div>
    </div>
}

export default SetColor;