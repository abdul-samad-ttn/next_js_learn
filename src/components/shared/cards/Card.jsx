import Image from "next/image"
import React, { memo } from "react"
import PropTypes from "prop-types"

const Card = props => {
    const {
        imageProps = { source, alt, className },
        cardTitle = "",
        description = "",
        tags = [],
        classes = {},
        onClick = () => null
    } = props

    return (
        <div class={`max-w-sm rounded overflow-hidden shadow-lg ${classes.root}`} onClick={onClick}>
            {
                imageProps?.source ?
                    <div className={`w-full ${classes.imageContainer}`}>
                        <img
                            src={imageProps.source}
                            alt={imageProps.alt}
                            className={` object-cover w-full ${classes.imageClassName}`}
                            fill
                        />
                    </div>
                    : null
            }

            {cardTitle ? <div class="px-6 py-4 font-bold text-xl mb-2">{cardTitle}</div> : null}
            {description ? <p class="px-6 py-4 text-gray-700 text-base w-full max-h-5" title={description} >{description}</p> : null}

            {
                tags?.length ?
                    <div class="px-6 pt-4 pb-2">
                        {
                            tags.map((item) => {
                                return (
                                    <span key={item.title} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.title}</span>
                                )
                            })
                        }

                    </div>
                    : null
            }
        </div>
    )
}

Card.propTypes = {
    cardTitle: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string
    })),
    imageProps: PropTypes.shape({
        source: PropTypes.string,
        alt: PropTypes.string
    }),
    classes: PropTypes.shape({
        root: PropTypes.string,
        description: PropTypes.string,
        tagsContainer: PropTypes.string,
        cardTitle: PropTypes.string,
        imageClassName: PropTypes.string,
        imageContainer: PropTypes.string
    }),
    onClick: PropTypes.func
}

export default memo(Card)