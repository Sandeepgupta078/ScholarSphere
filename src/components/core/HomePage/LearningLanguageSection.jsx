import React from 'react';
import HighlightText from './HighlightText.jsx';
import know_Your_Progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from '../HomePage/Button.jsx';

const LearningLanguageSection = () => {
    return (
        <div className='mt-[130px] mb-32 '>
           <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for
                <HighlightText text={"learning  any language"} />
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'> 
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, and a variety of exercises, you can learn a new language at your own pace.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={know_Your_Progress} alt="know_Your_Progress" className='object-contain -mr-32' />
                <img src={compare_with_others} alt="compare_with_others" className='object-contain' />
                <img src={plan_your_lesson} alt="plan_your_lesson" className='object-contain -ml-36' />
                
            </div>

            <div className='w-fit '>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
           </div>
        </div>
    );
};
 
export default LearningLanguageSection;