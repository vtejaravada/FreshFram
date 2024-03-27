import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../catSlider/CatSlider.css';
import {Link} from 'react-router-dom';

// import fresh1 from '../../assets/images/Vegetables/fresh-red-tomatoes1.jpg';
// import fresh2 from '../../assets/images/Vegetables/fresh-red-tomatoes1.jpg';

const CatSlider = (props) => {

    const [allData] = useState(props.data);
    const [totalLength, setTotalLength] = useState([]);

    const [category] = useState([

        '#fffceb',
        '#ecffec',
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#ffb8cf',
        '#ffb8f9',
        '#d7b8ff',
        '#b8c2ff',
        '#b8f9ff',
        '#b8ffc4',
        '#dcffb8',
        '#ffe6b8',
        '#b8ffc9',
        '#f2ffb8',
        '#ffb8b8',
        '#b8d0ff',

        // Add more categories as needed
    ]);

    var catLength=0;
    var lengthArr=[];
    useEffect(()=>{
        allData.length !== 0 &&
        allData.map((item, index)=>{
            item.items.length!==0 &&
            item.items.map((item_)=>{
                catLength+=item_.products.length
            })
            lengthArr.push(catLength)
            catLength=0;
        })

        const list = lengthArr.filter((item, index)=> lengthArr.indexOf(item) === index);
        setTotalLength(list)
        
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 2000,
        centerMode: true
    };


    return (
        <>
            <div className="catSliderSection">
                <div className="container-fluid">
                    <h2 className="hd">Featured Categories</h2>
                    <Slider {...settings} className='cat_slider_main' id='cat_slider_Main'>
                        {
                           allData.length !==0 &&
                           allData.map((item, index)=>{
                            return(
                                <div className="item" key={index}>
                                    <Link to={`/cat/${item.cat_name.toLowerCase()}`}>
                                        <div className="info" style={{ background: category[index] }}>
                                            <img src={item.image} alt="" width={80}/>
                                            <h5 className='text-capitalize mt-3'>{item.cat_name}</h5>
                                                <p>{totalLength[index]} items</p>
                                        </div>
                                    </Link>
                                </div>
                            ) 
                           })
                        }
                    </Slider>
                        
                   
                </div>
            </div>
        </>
    )
}

export default CatSlider;


