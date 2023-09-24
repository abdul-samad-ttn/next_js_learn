"use client"
import React, { useEffect, useMemo, useState, useCallback, Suspense, lazy } from "react"
import TextInput from "../shared/input/textInput/TextInput"
import { debounce } from "@/utils/functions/debounce"
import unsplashApiRequest from "@/app/api/unsplash/unsplash"
import Spinner from "../spinner/Spinner"
import Pagination from "../pagination/Pagination"
import { LOCAL_STORAGE_SEARCH_QUERY } from "@/utils/constants/storageConstants"

const PhotosGrid = lazy(() => import("./photosGrid/PhotosGrid"))

const LibraryList = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [imagesList, setImagesList] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const pageLimit = useMemo(() => 12, [])
    const [totalImages, setTotalImages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchDataByQuery = useCallback(async (page, query) => {
        if (query?.length <= 2) {
            return
        }
        setImagesList([])
        setIsLoading(true)
        const reqPayload = {
            page: page,
            perPage: pageLimit,
            query: query
        }
        unsplashApiRequest.searchPhotos(reqPayload)
            .then(({ response }) => {
                setImagesList(response.results)
                setTotalImages(response.total)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => { setIsLoading(false) })
    }, [pageNumber, searchQuery])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCallByQuery = useCallback(debounce(fetchDataByQuery, 3000), [fetchDataByQuery]);

    const fetchAllPhotos = useCallback(async (pageNumber) => {
        setImagesList([])
        setIsLoading(true)
        const reqPayload = {
            page: pageNumber,
            perPage: pageLimit
        }
        unsplashApiRequest.getPhotosList(reqPayload)
            .then(({ response }) => {
                setImagesList(response.results)
                setTotalImages(response.total)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => { setIsLoading(false) })
    }, [pageNumber, pageLimit])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCallAllPhotos = useCallback(debounce(fetchAllPhotos, 500), [fetchAllPhotos]);

    useEffect(() => {
        delayedCallAllPhotos()
        const query = localStorage.getItem(LOCAL_STORAGE_SEARCH_QUERY)
            setSearchQuery(query || "")
    }, [])

    useEffect(() => {
        if (searchQuery?.length) {
            delayedCallByQuery(pageNumber, searchQuery)
        }
        else {
            delayedCallAllPhotos(pageNumber)
        }
    }, [searchQuery, pageNumber])

    const handleSearchQuery = useCallback((e) => {
        const {value} = e.target
        setSearchQuery(value)
        localStorage.setItem(LOCAL_STORAGE_SEARCH_QUERY,value)
    }, [])

    const onPageChange = useCallback((page) => () => {
        setPageNumber(page)
    }, [])

    return (
        <div className="p-4 flex-col flex gap-4">
            <div className="w-full flex justify-center items-center ">
                <TextInput
                    name="search"
                    onChange={handleSearchQuery}
                    classes={{
                        root: "w-[20rem] flex gap-2 mb-4"
                    }}
                    value={searchQuery}
                    label="Search"
                />
            </div>

            <div className="flex flex-row justify-center items-center w-full h-full ">
                <Suspense fallback={<Spinner />}>
                    {imagesList?.length && !isLoading ?
                        <PhotosGrid imagesList={imagesList} />
                        : <Spinner />
                    }
                </Suspense>
            </div>
            <div className="w-full flex justify-end px-8">
                <Pagination
                    totalPages={Math.ceil(totalImages / pageLimit)}
                    onPageChange={onPageChange}
                    currentPage={pageNumber}
                />
            </div>


        </div>
    )
}

export default LibraryList