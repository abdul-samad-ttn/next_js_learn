"use client"
import React, { useState, useEffect, useCallback } from "react"
import unsplashApiRequest from "@/app/api/unsplash/unsplash"
import ImageDataJson from "@/utils/constants/imageData.json"

const ImageComponent = ({photoId }) => {
    const [imageData, setImageData] = useState({...ImageDataJson})
    const [isLoading, setIsLoading] = useState(false)

    const fetchPhotoDataById = useCallback(() => {
        console.log("photoId = ", photoId)
        setIsLoading(true)
        unsplashApiRequest.getPhotoById(photoId)
        .then((response)=>{
            console.log("response = ", response)
        })
        .catch((err)=>{
            console.error(err)
        })
        .finally(()=>{
            setIsLoading(true)
        })
    }, [photoId])

    console.log("ImageDataJson = ", imageData)

    useEffect(() => {
        // fetchPhotoDataById()
    }, [])

    return (
        <div className="flex justify-center items-center w-full h-full p-8">
            
        </div>
    )
}

export default ImageComponent;