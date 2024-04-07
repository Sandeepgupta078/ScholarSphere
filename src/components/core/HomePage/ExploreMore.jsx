import React from 'react';
import { HomePageExplore } from '../../../data/homepage-explore.jsx';
import HighlightText from './HighlightText.jsx';
import { useState } from 'react';
import CourseCard from './CourseCard.jsx';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Path",
    "Career Path",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
       <div>

        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={"Power of Code"} />
        </div>
        <p className='text-center text-richblack-300 text-md mt-3'>
            Learn to buid anything you can imagine with our comprehensive courses.
        </p>

        <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100
        py-1 px-1'>
            
                {tabsName.map((tab, index)=>{
                    return(
                        <div key={index} onClick={()=>setMyCards(tab)} 
                        className={`cursor-pointer text-[16px] flex flex-row items-center gap-2 rounded-full transition-all duration-200 hover:bg-richblue-900 hover:text-richblack-5 px-7 py-2
                        ${currentTab === tab ? 'bg-richblack-900 text-richblack-5 font-medium' : 'text-richblack-200'}`}>
                            {tab}
                        </div>
                    );
                })
            }      
        </div>

        <div className='lg:h-[150px]'>
            {/* course card */}

            <div className='absolute flex flex-row gap-10 justify-between w-full'>
                {
                    courses.map((course, index) => {
                        return(
                            <CourseCard 
                            key={index}
                            cardData = {course}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                        
                }
            </div>

        </div>
       </div>
    );
};

export default ExploreMore;