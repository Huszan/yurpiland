import { useEffect, useState } from "react";
import "./ImageLoader.scss";
import { isImageCashed, loadImage } from "../../utils/Image.utils";
import PlaceholderImg from "../../resources/images/placeholder.webp";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export type ImageLoaderProps = {
    src?: string;
    wrapperClass?: string;
    wrapperStyle?: React.CSSProperties;
    alt?: string;
};

export default function ImageLoader(props: ImageLoaderProps) {
    const { alt = "Image", wrapperClass, wrapperStyle } = props;
    let { src } = props;
    const [loadedImage, setLoadedImage] = useState<string | null>(null);

    if (!src || src === "") {
        src = PlaceholderImg;
    }

    useEffect(() => {
        if (!isImageCashed(src)) {
            loadImage(src).then(
                (loadedUrl) => {
                    setLoadedImage(loadedUrl);
                },
                () => {
                    setLoadedImage(PlaceholderImg);
                }
            );
        } else {
            setLoadedImage(src);
        }
    }, [src]);

    const skeletonStyle: React.CSSProperties = {
        lineHeight: "unset",
        opacity: 0.25,
    };

    return (
        <span
            className={`image-loader-wrapper ${wrapperClass}`}
            style={wrapperStyle}
        >
            {loadedImage ? (
                <img className="image-loader" src={loadedImage} alt={alt}></img>
            ) : (
                <SkeletonTheme
                    width="100%"
                    height="100%"
                    borderRadius={0}
                    baseColor="#c1c1c1"
                >
                    <Skeleton
                        className={wrapperClass}
                        style={skeletonStyle}
                        count={1}
                    ></Skeleton>
                </SkeletonTheme>
            )}
        </span>
    );
}
