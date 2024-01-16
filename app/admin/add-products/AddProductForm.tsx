'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextAre";
import Input from "@/app/components/inputs/input";
import ProductImage from "@/app/components/products/ProductImage";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import axios from "axios";
import { error } from "console";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export type ImageType = {
    color: string,
    colorCode: string,
    image: File | null,
}

export type UploadedImageType = {
    color: string,
    colorCode: string,
    image: string,
}


const AddProductForm = () => {

    const router = useRouter();


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,

        })
    }
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)

    console.log("images", images)

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: "",
        }
    })

    useEffect(() => {
        setCustomValue('images', images)
    }, [images])

    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        let uploadedImages: UploadedImageType[] = []

        if (!data.category) {
            setIsLoading(false)
            return toast.error("Category is nor selected")
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error("Not selected image")

        }

        const handleImageUploades = async () => {
            toast('Creating product, please wait...')

            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploudTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise((resolve, reject) => {
                            uploudTask.on('state_changed', (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done')
                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log("Upload is paused")
                                        break;
                                    case 'running':
                                        console.log("Upload is running");
                                        break;
                                }
                            },
                                (error) => {
                                    console.log("Error uploading image", error)
                                    reject(error)
                                },

                                () => {
                                    getDownloadURL(uploudTask.snapshot.ref).then((downloadURL: any) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log("file available at ", downloadURL)
                                        resolve(downloadURL);
                                    }).catch((error) => {
                                        console.log("Error getting the download URL", error)
                                        reject(error)
                                    })
                                }


                            )
                        })
                    }
                }

            } catch (error) {
                setIsLoading(false)
                console.log("Error handling image uploads", error)
                return toast.error("Error handling image uploads")

            }
        }

        await handleImageUploades();
        const productData = { ...data, images: uploadedImages }

        axios.post('/api/product', productData).then(
            () => {
                toast.success("Product was successfully added")
                setIsProductCreated(true)
                router.refresh()
            }

        ).catch(
            () => toast.error("Something went wrong!")
        ).finally(
            () => setIsLoading(false)
        );


    }

    const category = watch('category')


    const addImageToState = useCallback((value: ImageType) => {

        setImages((prev) => {
            if (!prev) {
                return [value]
            }

            return [...prev, value]
        })
    }, [])

    const removeImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages
            }
            return prev
        })
    }, [])

    return <>
        <Heading title="Add a Product" center />
        <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="price"
            label="Price"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            required
        />
        <Input
            id="brand"
            label="Brand"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <TextArea
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <CustomCheckbox id="inStock" register={register} label="This product is in stock" />
        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">Select a Category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-auto">
                {categories.map((item) => {
                    if (item.label === "All") {
                        return null;
                    }

                    return <div key={item.label} className="col-span p-2">
                        <CategoryInput
                            onClick={(category) => setCustomValue("category", category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                })}
            </div>
        </div>
        <div className="w-full flex flex-col flex-wrap gap-4">
            <div className="">
                <div className="font-bold">
                    Select the available product and upload their images.
                </div>
                <div className="text-sm">
                    You must upload an image for each of the color selected otherwise your color
                    selection will be ignored.
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {colors.map((item, index) => {
                    return <SelectColor isProductCreated={isProductCreated} key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageToState} />
                })}
            </div>
        </div>
        <Button label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
    </>
}

export default AddProductForm;