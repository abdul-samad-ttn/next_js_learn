"use client"
import React, { useEffect, useMemo, useState, useCallback, Suspense, lazy } from "react"
import TextInput from "../shared/input/textInput/TextInput"
import { debounce } from "@/utils/functions/debounce"
import unsplashApiRequest from "@/app/api/unsplash/unsplash"
import Spinner from "../spinner/Spinner"
// import PhotosGrid from "./photosGrid/PhotosGrid"
import jsonList from "@/utils/constants/images.json"

const PhotosGrid = lazy(()=> import("./photosGrid/PhotosGrid"))

const LibraryList = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [imagesList, setImagesList] = useState([...jsonList])
    const [pageNumber, setPageNumber] = useState(1)
    const pageLimit = useMemo(() => 15, [])
    const [totalImages, setTotalImages] = useState(294317)
    const [isLoading, setIsLoading] = useState(false)

    const fetchAllPhotos = useCallback(async () => {
        setImagesList([])
        setIsLoading(true)
        const reqPayload = {
            page: pageNumber,
            perPage: pageLimit
        }
        unsplashApiRequest.getPhotosList(reqPayload)
            .then(response => {
                console.log("response === ", response)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => { setIsLoading(false) })
    }, [pageNumber, pageLimit])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCallAllPhotos = useCallback(debounce(fetchAllPhotos, 3000), [fetchAllPhotos]);

    useEffect(() => {
        // delayedCallAllPhotos()
    }, [])

    const handleSearchQuery = useCallback((e) => {
        console.log("searchQuery = ", e.target.value)
    }, [])

    return (
        <div className="p-4">
            <div className="w-full flex justify-center items-center mb-2">
                <TextInput
                    name="search"
                    onChange={handleSearchQuery}
                    classes={{
                        root: "w-[20rem] flex gap-2 mb-4"
                    }}
                    label="Search"
                />
            </div>

            <div className="flex justify-center items-center w-full h-full">
                <Suspense fallback={<Spinner />}>
                    {imagesList?.length && !isLoading ?
                        <PhotosGrid imagesList={imagesList} />
                        : <Spinner />
                    }
                </Suspense>
            </div>



        </div>
    )
}

export default LibraryList