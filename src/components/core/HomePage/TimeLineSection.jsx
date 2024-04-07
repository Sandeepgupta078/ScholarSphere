import React from 'react';

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo:Logo2,
        heading:"Innovation",
        Description:"Innovative and creative in everything we do",
    },
    {
        Logo:Logo3,
        heading:"Quality",
        Description:"Committed to the highest quality standards",
    },
    {
        Logo:Logo4,
        heading:"Integrity",
        Description:"Honest and ethical in all our interactions",
    }
]

const TimeLineSection = () => {
    return (
        <div>
            <div className='flex flex-row gap-15 items-center'>

                <div className='w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((item,index)=>{
                            return(
                                <div key={index} className='flex flex-row gap-6'>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                        <img src={item.Logo} alt="logo" />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{item.heading}</h2>
                                        <p className='text-base'>{item.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='relative shadow-blue-200'>
                    <img src={timelineImage} alt="timelineImage" className='shadow-white object-cover h-fit' />

                    <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] 
                    translate-x-[-50%] translate-y-[-50%]'>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                        </div>

                        <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeLineSection;