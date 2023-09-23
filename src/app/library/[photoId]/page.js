
import ImageComponent from "@/components/imageComponent/ImageComponent";
import Applayout from "@/components/layout/appLayout/AppLayout";

const Photo = props => {
    return (
        <Applayout heading="Image">
            <ImageComponent
                photoId={props.params?.photoId}
            />
        </Applayout>

    )
}

export default Photo;