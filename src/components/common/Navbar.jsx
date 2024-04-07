import React, { useEffect } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links.jsx';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown.jsx';
import { useState } from 'react';
import {apiConnector} from '../../services/apiconnector.jsx';
import { categories } from '../../services/apis.jsx';
import{IoIosArrowDropdownCircle} from 'react-icons/io';


const Navbar = () => {

    const {token} = useSelector(state => state.auth);
    const {totalItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.profile);

    const location = useLocation();

    const [subLinks,setSubLinks] = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Printing the result of the categories links: ",result);
            setSubLinks(result.data.data);
        }catch(error){
            console.log("could not fetch the categories links");
        }
    }

    useEffect( () => {
        fetchSublinks();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex max-w-maxContent items-center justify-between'>

                {/* image */}
                <Link to='/'>
                    <img src={logo} alt="logo" width={160} height={42} loading='lazy' />
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === 'Catalog' ? (
                                            <div className='relative flex items-center gap-2 group'>
                                                <p className='text-richblack-25'>
                                                    {link.title}
                                                </p>
                                                <IoIosArrowDropdownCircle className='text-2xl' />

                                                <div className='invisible absolute left-[50%] translate-x-[-50%] trnaslate-y-[80%]
                                                 top-[50%] flex flex-col rounded-md bg-richblack-5
                                                p-4 text-richblack-900  opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px]'>

                                                    <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%]
                                                    h-6 w-6 rotate-45 rounded bg-richblack-5'>

                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map( (subLink,index)=>{
                                                                    <Link to={`${subLink.link}`} key={index}>
                                                                        <p>{subLink.title}</p>
                                                                    </Link>
                                                                })
                                                            ) : (<div></div>)
                                                        }
                                            
                                                    </div>

                                                </div>
                                                
                                                {/* <ul className='absolute top-14 left-0 bg-richblack-800 w-40 p-4 rounded-md'>
                                                    {
                                                        subLinks.map((sublink,index) => (
                                                            <li key={index}>
                                                                <Link to={`/catalog/${sublink?.id}`} className='text-richblack-25'>
                                                                    {sublink?.name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul> */}
                                            </div>
                                            
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* login/signup/dahsboard */}

                <div className = "flex gap-x-4 items-center">
                   
                    {
                        user && user?.accountType != "Instructor" && (
                           < Link to = "/dashboard/cart" className='relative' >
                            <AiOutlineShoppingCart className='text-2xl text-richblack-25' />
                            {
                                totalItems > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-yellow-25 text-richblack-25 w-5 h-5 rounded-full flex items-center justify-center'>
                                        {totalItems}
                                    </span>
                                )
                            }
                           </Link>                    
                        )
                    }
                    {
                        token === null && (
                            <Link to='/login' className='text-richblack-25'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                                rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/signup' className='text-richblack-25'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                                rounded-md'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token && (
                            <Link to='/dashboard' className='text-richblack-25'>
                                <button>
                                    Dashboard
                                </button>
                            </Link>
                        )
                    }
                    {
                        token != null && <ProfileDropDown />
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;