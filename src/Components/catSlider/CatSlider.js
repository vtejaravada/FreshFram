import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import '../catSlider/CatSlider.css';
import { Link } from 'react-router-dom';

const CatSlider = (props) => {
    const [allData] = useState(props.data);
    const [totalLength, setTotalLength] = useState([]);
    const categoryColors = ['#fffceb', '#ecffec', '#feefea', '#fff3eb', '#fff3ff', '#ffb8cf', '#ffb8f9', '#d7b8ff', '#b8c2ff', '#b8f9ff', '#b8ffc4', '#dcffb8', '#ffe6b8', '#b8ffc9', '#f2ffb8', '#ffb8b8', '#b8d0ff'];

    const lengthRef = useRef([]);
    useEffect(() => {
        let catLength = 0;
        allData.forEach((item) => {
            item.items.forEach((item_) => {
                catLength += item_.products.length;
            });
            lengthRef.current.push(catLength);
            catLength = 0;
        });

        const uniqueLengths = lengthRef.current.filter((item, index, arr) => arr.indexOf(item) === index);
        setTotalLength(uniqueLengths);
    }, [allData]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 2000,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="catSliderSection">
            <div className="container-fluid">
                <h2 className="hd">Featured Categories</h2>
                <Slider {...settings} className="cat_slider_main" id="cat_slider_Main">
                    {allData.map((item, index) => (
                        <div className="item" key={index}>
                            <Link to={`/cat/${item.cat_name.toLowerCase()}`}>
                                <div className="info" style={{ background: categoryColors[index] }}>
                                    <img src={item.image} alt={`Category ${item.cat_name}`} width={80} />
                                    <h5 className="text-capitalize mt-3">{item.cat_name}</h5>
                                    <p>{totalLength[index]} items</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CatSlider;

