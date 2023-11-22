'use client'
import axios from '@/axios';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import React, { useEffect } from 'react'

const ProductList = () => {

    const getProducts = async () => {
        try {
            const products = await axios.get("/products")
            console.log(products.data, "<<-- products")
        } catch (error) {
            console.error(error, "<<-- error in get all products")
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const list = [
        {
            title: "Orange",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$5.30",
        },
        {
            title: "Avocado",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$15.70",
        },
        {
            title: "Lemon 2",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$8.00",
        },
        {
            title: "Banana",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$7.50",
        },
        {
            title: "Watermelon",
            img: "https://res.cloudinary.com/dmfz12j7b/image/upload/v1700639047/pexels-james-wheeler-417074.jpg.jpg",
            price: "$12.20",
        },
    ];



    return (
        <>
            {/* Product header slideshow */}

            {/* Product list */}
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-4">
                {list.map((item, index) => (
                    <Card isBlurred shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                height={"auto"}
                                alt={item.title}
                                className="w-full object-cover h-[140px]"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.price}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default ProductList