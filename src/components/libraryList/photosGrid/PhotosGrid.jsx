import Card from "@/components/shared/cards/Card"
import { ROUTES } from "@/utils/constants/routerConstants"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"

const PhotosGrid = (props) => {
    const router = useRouter()
    const { imagesList = [] } = props
    
    const onCardClick = useCallback((item)=>()=>{
        console.log("onCard Click === ", item)
        router.push(`${ROUTES.library}/${item.id}`)
    },[])

    return (
        <div className="w-full flex flex-wrap gap-4 px-8 justify-between">
            {
                imagesList?.map((imageData) => {
                    return (
                        <Card
                            key={imageData.id}
                            imageProps={{
                                source: imageData.urls.small,
                                alt: imageData.alt_description,
                            }}
                            classes={{
                                root: "w-[20rem]",
                                imageClassName: "h-full w-full",
                                imageContainer: "h-[10rem]"
                            }}
                            onClick={onCardClick(imageData)}
                        />
                    )
                })
            }
        </div>
    )
}

export default PhotosGrid