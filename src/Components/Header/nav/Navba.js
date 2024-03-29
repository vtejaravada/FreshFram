import React, { useEffect, useState } from 'react'
import '../nav/Navba.css'
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { IoIosHeadset } from "react-icons/io";
import megamenuimg from '../../../assets/images/megamenuImg.jpg'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Button } from '@mui/material';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HomeIcon from '@mui/icons-material/Home';

const Nav = (props) => {

    const [navData, setNavData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {

        setNavData(props.data);

    }, []);

    

    return (
        <div className="nav d-flex align-items-center">
            <div className="container-fluid side_menu">
                <div className="row position-relative navbarLine">

                    <div className="part1 d-flex align-items-center  position-static browse ">
                        <Button className='bg-g text-white catTab' onClick={() => setShowDropdown(!showDropdown)}>
                            <IoGrid /> &nbsp; Browse All Categories &nbsp; <IoIosArrowDown className='arrow' />
                        </Button>

                        {
                            showDropdown && navData.length !== 0 &&
                            <div className="dropdown_menu menuNew">
                                <ul>
                                    {
                                        navData.map((item, index) => (
                                            item.items.length !== 0 &&
                                            item.items.map((item_, index_) => (
                                                <li key={index_}>
                                                        <Link to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`}>
                                                            {item_.cat_name}
                                                        </Link>
                                                </li>
                                            ))
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                        
                    </div>

                    <div className="part2">
                        <nav className='navItems'>
                            <ul className="list list-inline listNav mb-0">

                                <li className="list-inline-item listNav">
                                    <Link to="/about" className='dealHe'><LocalFireDepartmentIcon className='fire' />Deals </Link>
                                    <Link to="/about" className='dealIc'><LocalFireDepartmentIcon className='fire' /></Link>
                                </li>

                                <li className="list-inline-item listNav">
                                    <Link to="/" className='homeHe'>Home <IoIosArrowDown className='arrow' /></Link>
                                    <Link to="/" className='homeIc'><HomeIcon/></Link>
                                </li>

                                {
                                    navData.length !== 0 &&
                                    navData.map((item, index) => {
                                        return (

                                            <li className="list-inline-item listNav" key={index}>
                                                    <Link to={`/cat/${item.cat_name.toLowerCase()}`} onClick={() => sessionStorage.setItem('cat', item.cat_name.toLowerCase())}>
                                                        {item.cat_name}<IoIosArrowDown className='arrow' />
                                                    </Link>
                                                {
                                                    item.items.length !== 0 &&
                                                    <div className="dropdown_menu">
                                                        <ul>
                                                            {
                                                                item.items.map((item_, index_) => {
                                                                    return (
                                                                        <li key={index_}>
                                                                            
                                                                                <Link to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`} onClick={() => sessionStorage.setItem('cat', item.cat_name.toLowerCase())}>{item_.cat_name}</Link>
                                                                            
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                }

                                            </li>
                                        )
                                    })
                                }

                                <li className="list-inline-item listNav position-static">
                                    <Link>Mega menu <IoIosArrowDown className='arrow' /></Link>

                                    <div className="dropdown_menu megamenu w-100">
                                        <div className="row">
                                            {
                                                props.data.length !== 0 &&
                                                props.data.map((item, index) => {
                                                    return (
                                                        <div key={index} className="megamenu_Part">
                                                            <Link to={`/cat/${item.cat_name.toLowerCase()}`}>
                                                                <h4 className='text-g text-capitalize'>
                                                                    {item.cat_name}
                                                                </h4>
                                                            </Link>
                                                            {
                                                                item.items.length !== 0 &&
                                                                <ul className=" megamenu_drop ">
                                                                    {
                                                                        item.items.map((item_, index_) => {
                                                                            return (
                                                                                <li key={index_} className='megaitems'>
                                                                                    <Link to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`}>
                                                                                        {item_.cat_name}
                                                                                    </Link>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div className=" megaImg">
                                                <img src={megamenuimg} alt="" className=' megaImgOnText' />
                                                <div className="megaImgText">
                                                    <p>HOT DEALS</p>
                                                    <h4>Don't miss Trending</h4>
                                                    <h5>Save to 50%</h5>
                                                    <Link to="/" className='imgButt'>Shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                                <li className="list-inline-item listNav">
                                   <Link to="/about">Blog <IoIosArrowDown className='arrow' /></Link>

                                    <div className="dropdown_menu">
                                        <ul>
                                            <li><Link to="/about">About Us</Link></li>
                                            <li><Link to="/about">Contact</Link></li>
                                            <li><Link to="/about">My Account</Link></li>
                                            <li><Link to="/about">Login</Link></li>
                                            <li><Link to="/about">Register</Link></li>
                                            <li><Link to="/about">Forgot password</Link></li>
                                            <li><Link to="/about">Reset password</Link></li>
                                            <li><Link to="/about">Purchase Guide</Link></li>
                                            <li><Link to="/about">privacy Policy</Link></li>
                                            <li><Link to="/about">Terms of Service</Link></li>
                                            <li><Link to="/about">404 page</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="list-inline-item listNav">
                                    <Link to="/about">About</Link>
                                </li>

                                <li className="list-inline-item listNav">
                                    <Link to="/contact" className='contactNav'>Contact</Link>
                                    <Link to="/contact" className='contactNavIc'><RecentActorsIcon/></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="part3 d-flex align-items-center">
                        <div className="phNo d-flex align-items-center">
                            <span><IoIosHeadset className='headseti' /></span>
                            <div className="info info1 ms-2">
                                <h3 className="text-g mb-0">1900 - 888</h3>
                                <p className="mb-0">24/7 Support Center</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Nav