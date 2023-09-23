
import Applayout from "@/components/layout/appLayout/AppLayout"
import LibraryList from "@/components/libraryList/libraryList"
import React from "react"

const Library = props => {
    return (
        <Applayout heading="Gallery">
            <LibraryList />
        </Applayout>
    )
}

export default Library