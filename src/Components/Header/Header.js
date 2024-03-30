import React, { useEffect, useRef, useState, useContext } from 'react';
import '../Header/Header.css';
import logo from "../../assets/images/Logo2.png";
import { CiSearch } from "react-icons/ci";
import Select from '../selectDrop/Select';
import Navba from '../Header/nav/Navba';
import axios from 'axios';
// import { IoLocationOutline } from "react-icons/io5";
import IconCompare from '../../assets/images/icon-compare.svg';
import IconHeart from '../../assets/images/icon-heart.svg';
import IconCart from '../../assets/images/icon-cart.svg';
import IconUser from '../../assets/images/icon-user.svg';

import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Link, useNavigate } from 'react-router-dom';

import { MyContext } from '../../App';

const Header = (props) => {

    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const headerRef = useRef();

    const context = useContext(MyContext);
    const history = useNavigate();

    const [Categories] = useState([
        // 'All Categories',
        'Milks and Dairies',
        'Wines & Drinks',
        'Clothing & Beauty',
        'Fresh Seafood',
        'Pet Foods & toy',
        'Fast food',
        'Baking material',
        'Vegetables',
        'Fresh Fruit',
        'Bread and Juice',
    ]);

    //Location -----------------
    // const [countryList] = useState([]);

    // useEffect(() => {
    //     const getCountry = async (url) => {
    //         try {
    //             await axios.get(url).then((response) => {
    //                 if (response !== null) {
    //                     // console.log(res.data.data);
    //                     response.data.data.map((item, index) => {
    //                         countryList.push(item.country);
    //                     })

    //                     // console.log(res.data.data.country)
    //                 }
    //             })
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };

    //     getCountry('https://countriesnow.space/api/v0.1/countries/');
    // }, [countryList]);

    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        const getCountry = async (url) => {
            try {
                const response = await axios.get(url);
                if (response !== null) {
                    const countries = response.data.data.map((item) => item.country);
                    console.log("Fetched country data:", countries); // Log the fetched country data
                    setCountryList(countries);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getCountry('https://countriesnow.space/api/v0.1/countries/');
    }, []);

    console.log("Country list state:", countryList); // Log the current state of countryList for debugging

    //Scroll By top-----------------------

    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         let position = window.pageYOffset;
    //         if (position > 200) {
    //             headerRef.current.classList.add('fixed');
    //         } else {
    //             headerRef.current.classList.remove('fixed');
    //         }
    //     })
    // }, [])

    const signOut = () => {
        context.signOut();
        history('/');
    }


    return (
        <>
            <div className="headerWrapper" ref={headerRef}>

                <header >
                    <div className="container-fluid">
                        <div className="row HeaderRow">

                            <div className="logo partHead1 d-flex align-items-center">
                                <Link to="/"><img src={logo} alt="logo" /></Link>
                            </div>

                            {/* headerSearch  start here */}
                            <div className="partHead2">
                                <div className="headerSearch d-flex align-items-center">
                                    <Select data={Categories} placeholder={'All categories'} icon={false} />

                                    <div className="search">
                                        <input type="text" placeholder='Search for items ...' />
                                        <CiSearch className='searchIcon cursor' />
                                    </div>
                                </div>
                            </div>

                            <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                                <div className='partHead3 '>
                                    <div className='headerList'>

                                        <ul className='list list-inline mb-0 headerTabs'>

                                            <li className='countryWrapper'>
                                                <Select
                                                    data={countryList.map((country, index) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                    placeholder={'Your Location'}
                                                    icon={<LocationOnOutlinedIcon style={{ opacity: '0.5' }} />}
                                                />
                                            </li>


                                            <li className='list-inline-item icon'>

                                                <Link to={'/'}>
                                                    <img src={IconCompare} alt="IconCompare" />
                                                    <span className='pro-count blue'>3</span>
                                                </Link>
                                                <Link to={'/'} className='iconCom'>
                                                    <span className='lable'>Compare</span>
                                                </Link>

                                            </li>
                                            <li className='list-inline-item icon'>
                                                <Link to={'/'}>
                                                    <img src={IconHeart} alt="IconCart" />
                                                    <span className='pro-count blue'>3</span>
                                                </Link>
                                                <Link to={'/'} className='iconCom'>
                                                    <span className='lable'>Wishlist</span>
                                                </Link>
                                            </li>
                                            <li className='list-inline-item icon'>
                                                <Link to={'/cart'}>
                                                    <img src={IconCart} alt="IconCart" />
                                                    <span className='pro-count blue'>{context.cartItems.length}</span>
                                                </Link>
                                                <Link to={'/'} className='iconCom'>
                                                    <span className='lable'>Cart</span>
                                                </Link>
                                            </li>

                                            {
                                                context.isLogin === "true" ?

                                                    <li className='list-inline-item '>

                                                        <span onClick={() => setisOpenDropDown(!isOpenDropDown)} className='icon'>
                                                            <Link >
                                                                <img src={IconUser} alt="IconUser" />
                                                                {/* <span className='pro-count blue'></span> */}
                                                            </Link>

                                                            <Link className='iconCom'>
                                                                <span className='lable ms-1'>Account</span>
                                                            </Link>
                                                        </span>

                                                        {
                                                            isOpenDropDown !== false &&
                                                            <ul className='dropdownMenu'>
                                                                <li><Button className='align-items-center'><Person2OutlinedIcon /> My Account</Button></li>
                                                                <li><Button><LocationOnOutlinedIcon /> Order Tracking</Button></li>
                                                                <li><Button><FavoriteBorderOutlinedIcon /> My Wishlist</Button></li>
                                                                <li><Button><SettingsOutlinedIcon /> Setting</Button></li>
                                                                <li><Button onClick={signOut}><LogoutOutlinedIcon /> Sign out</Button></li>
                                                            </ul>
                                                        }
                                                    </li>

                                                    :

                                                    <li className='list-inline-item'>
                                                        <Link to={'/signIn'}>
                                                            <Button className="btn btn-g">Sign In</Button>
                                                        </Link>
                                                    </li>

                                            }

                                            {/* <div className="navbarToggle ms-auto"><MenuIcon /></div> */}

                                        </ul>

                                    </div>

                                </div>
                            </ClickAwayListener>



                        </div>
                    </div>
                </header>



                <Navba data={props.data} />

            </div>

            <div className="afterHeader">

            </div>
        </>
    )
}
export default Header