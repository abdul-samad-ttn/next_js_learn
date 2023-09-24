/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect, useCallback, useRef, Suspense } from "react"
import unsplashApiRequest from "@/app/api/unsplash/unsplash"
// import ImageDataJson from "@/utils/constants/imageData.json"
import Button from "../shared/button/Button"
import Spinner from "../spinner/Spinner"
import Link from "next/link"

const TextDetailsComponent = ({ heading, value, onClick=()=>null }) => {
    return (
        <p className="font-semibold" onClick={onClick}>{heading}: <span className="text-lime-500 font-medium">{value}</span></p>
    )
}

const ImageComponent = ({ photoId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageData, setImageData] = useState({})

    const downloadRef = useRef(null)

    const fetchPhotoDataById = useCallback(() => {
        unsplashApiRequest.getPhotoById(photoId)
            .then(({ response, type }) => {
                if (type === "success") {
                    setImageData(response)
                }
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setIsLoading(true)
            })
    }, [photoId])

    console.log("ImageDataJson = ", imageData)

    const downloadImage = async (imgUrl) => {
        const response = await fetch(imgUrl)
        const blob = await response.blob()
        downloadRef.current.href = window.URL.createObjectURL(blob)
        downloadRef.current.click()
        setIsLoading(false)
    }

    const handleDownload = useCallback(() => {
        // setIsLoading(true)
        unsplashApiRequest.downloadPhoto(imageData?.links.download_location)
            .then(({ response, type }) => {
                if (type === "success") {
                    downloadImage(response.url)
                }
            })
            .catch(err => console.error(err))
            // .finally(() => { setIsLoading(false) })
    }, [imageData?.links])

    useEffect(() => {
        fetchPhotoDataById()
    }, [])

    const onPortfolioClick = () => {
        console.log("onPortfolioClick = ", onPortfolioClick)
        window.location.assign()
    }

    return (
        <div className="w-full p-8">
            <div className="inline-flex justify-between items-center gap-3 flex-wrap w-full">
                <div className="self-center w-[60%]">
                    <Suspense fallback={<Spinner />}>
                        <img
                            src={imageData?.urls?.full}
                            alt={imageData?.alt_description}
                            loading="lazy"
                            className="object-cover rounded-md"
                        />
                    </Suspense>
                </div>

                <div className="gap-4 w-[35%]">
                    <h3 className="font-semibold flex gap-4 items-center">
                        Photo By {imageData?.user?.profile_image?.medium ? <img
                            src={imageData?.user?.profile_image?.medium}
                            alt={imageData?.user?.name}
                            className="rounded-md"
                        /> : null}
                    </h3>
                    <TextDetailsComponent
                        key="Name"
                        heading="Name"
                        value={imageData?.user?.name}
                    />
                    <Link href={imageData?.user?.portfolio_url || ""} target="_blank">
                    <TextDetailsComponent
                        key="Portfolio"
                        heading="Portfolio"
                        value={imageData?.user?.portfolio_url}
                        onClick={onPortfolioClick}
                    />
                    </Link>

                    {imageData?.location?.name ? <TextDetailsComponent
                        key="location"
                        heading="Image Location"
                        value={imageData?.location?.name}
                    /> : null}

                    {imageData?.description ?
                        <TextDetailsComponent
                            key="description"
                            heading="Description"
                            value={imageData?.description}
                        /> : null}

                    {
                        imageData?.tags?.length ?
                            <div class="inline-flex flex-wrap gap-2 mt-4">
                                {
                                    imageData?.tags.map((item) => {
                                        return (
                                            <span key={item.title} class="inline-block bg-gray-200 rounded-full px-[0.875rem] pb-[0.15rem] text-sm font-semibold text-gray-700 text-center">#{item.title}</span>
                                        )
                                    })
                                }

                            </div>
                            : null
                    }

                    <div className="text-right">
                        <Button
                            name="download"
                            onClick={handleDownload}
                            type="button"
                            label="Download"
                            className="mt-4"
                        />
                    </div>
                </div>
            </div>
            <a download={imageData?.slug} target="_blank" className="hidden" ref={downloadRef}></a>
        </div>
    )
}

export default ImageComponent;