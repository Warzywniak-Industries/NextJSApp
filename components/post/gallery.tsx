import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface GalleryProps {
    images: string[];
}

const Gallery = (props: GalleryProps) => {
    const sliderForRef = useRef(null);
    const sliderNavRef = useRef(null);

    // Settings for the main slider
    const sliderForSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
    };

    // Settings for the navigation slider
    const sliderNavSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        //infinite: false,
    };

    return (
        <div>
            {/* Main slider */}
            <Slider {...sliderForSettings} ref={sliderForRef} className="slider-for">
                {props.images.map((image, i) => (
                    <div key={i}>
                        <div className="w-full flex justify-center">
                            <img src={image} alt={`Slide ${i + 1}`} className="rounded-lg" />
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Navigation slider */}
            <Slider {...sliderNavSettings} ref={sliderNavRef} className="slider-nav">
                {props.images.map((image, i) => (
                    <div key={i} className="">
                        <img src={image} alt={`Slide ${i + 1}`} className="rounded-lg cursor-pointer" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export { Gallery };
