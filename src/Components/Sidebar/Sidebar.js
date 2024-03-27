import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../Components/Sidebar/Sidebar.css';
import { CiFilter } from "react-icons/ci";

import Banner from '../../assets/images/slider1.jpg';
import proIcon1 from '../../assets/images/Icon/proIcon1.png';
import FilterIcon from '../../assets/images/FilterIcon.png';

import Checkbox from '@mui/material/Checkbox';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Button } from '@mui/material';



function valuetext(value) {
    return `${value}°C`;
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const Sidebar = (props)=> {

        const [value, setValue] = React.useState([20, 100000]);
        const [value2, setValue2] = useState(0);
        const [totalLength, setTotalLength] = useState([]);
        const [brandFilters, setBrandFilters] = React.useState([]);
        const [ratingsArr, setRatings] = React.useState([]);

        let { id } = useParams();

        //  const [img]= useState([
        //     proIcon1,
        //     proIcon2,
        //     proIcon3,
        //     proIcon4,
        //     proIcon5,
        // ])

        var brands = [];
        var ratings = [];

        var catLength=0;
        var lengthArr=[];

        useEffect(() => {
            brands = [];
            ratings=[];
            props.currentCatData.length !== 0 &&
                props.currentCatData.map((item) => {
                    brands.push(item.brand);
                    ratings.push(parseFloat(item.rating))
                })
    
            const brandList = brands.filter((item, index) => brands.indexOf(item) === index);
            setBrandFilters(brandList);
    
            const ratings_ = ratings.filter((item, index) => ratings.indexOf(item) === index);
            setRatings(ratings_)
    
        }, [id])

//------------------------------------------------------------------------------------------

        useEffect(()=>{
            props.data.length !== 0 &&
            props.data.map((item, index)=>{
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

//===============================----------------

        useEffect(() => {
            var price = 0;
            props.currentCatData.length !==0 &&
            props.currentCatData.map((item, index)=>{
                let prodPrice = parseInt(item.price.toString().replace(/,/g, ""));
                if(prodPrice > price) {
                    price = prodPrice
                }
            })
            setValue2(price)
        }, [props.currentCatData]);

//===============================--------------------

        const filterByBrand = (keyword) => {
            props.filterByBrand(keyword)
        }

        const filterByRating = (keyword) => {
            props.filterByRating(parseFloat(keyword))
        }

//===============================--------------------=======-----------=======-----------

        useEffect(() => {
            filterByPrice(value[0], value[1]);
        }, [value]);
    
        const filterByPrice = (minValue, maxValue) => {
            props.filterByPrice(minValue, maxValue)
        }

//--------------------------------------------------------------


    
  return (
    <>
        <div className="sidebar">
            <div className="card border-0 shadow">
                <h3>Category</h3>

                <div className="catList">
                    {
                        props.data.length !== 0 && props.data.map((item, index)=>{
                            return(
                                <Link to= {`/cat/${item.cat_name.toLowerCase()}`}>
                                    <div key={index} className="catItem d-flex align-items-center">
                                        <span className="img">
                                            <img src={proIcon1} alt="productImg1" width={30}/>
                                        </span>
                                        <h4 className="mb-0 ml-3 ms-3 text-capitalize">{item.cat_name}</h4>
                                        <span className="d-flex align-items-center justify-content-center rounded-circle ms-auto">
                                            {totalLength[index]}
                                        </span>
                                    </div>
                                </Link>
                            )
                        })
                        
                    }
                </div>
            </div>

            <div className="card border-0 shadow">
                <h3>Fill by price</h3>
                    <RangeSlider value={value} onInput={setValue} min={10} max={100000} step={5}/>

                    <div className="d-flex pt-2 pb-2 priceRange">
                        <span>From: <strong className="text-success">Rs: {value[0]}</strong></span>
                        <span className="ms-auto">From: <strong className="text-success">Rs: {value[1]}</strong></span>
                    </div>

                    <div className='filters pt-5'>
                        <h5>Filter By Brand</h5>

                        <ul className='mb-0'>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                {
                                    brandFilters.length !== 0 &&
                                    brandFilters.map((item, index) => {
                                        return (
                                            <li key={index}> <FormControlLabel value={item} control={<Radio onChange={() => filterByBrand(item)} />} label={item} /></li>
                                        )
                                    })

                                }
                            </RadioGroup>

                        </ul>
                    </div>


                    <div className='filters pt-0'>
                        <h5>Filter By Ratings</h5>
                        <ul>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                {
                                    ratingsArr.length !== 0 &&
                                    ratingsArr.map((item, index) => {
                                        return (
                                            <li key={index}> <FormControlLabel value={item} control={<Radio onChange={() => filterByRating(item)} />} label={item} /></li>
                                        )
                                    })

                                }
                            </RadioGroup>
                        </ul>
                    </div>

                    <div className="d-flex w-100 filterBtn">
                        <Button className="btn btn-g w-100 fiter_center"><CiFilter /> Filter</Button>
                        <img src={FilterIcon} alt="FilterIcon" width={100}/>
                    </div>
                    
            </div>
            
            <img src={Banner} alt="Banner" className='w-100 sideImg shadow'/>
        </div>
    </>
  )
}

export default Sidebar