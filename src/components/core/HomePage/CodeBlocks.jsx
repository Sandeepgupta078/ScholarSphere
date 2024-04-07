import React from 'react';
import CTAButton from '../HomePage/Button.jsx';
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({
    position, heading, subHeading, ctabutton1, ctabutton2, codeblock, backgroundGradient, codeColor
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            {/* section 1 */}
            <div className='w-[50%] flex flex-col gap-8 text-richblack-100'>
                {heading}
                <div className='text-richblack-300 gap-8'>
                    {subHeading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabutton1.active} linkto={ctabutton1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabutton1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabutton2.active} linkto={ctabutton2.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabutton2.btnText}
                            
                        </div>
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className='h-fit flex flex-row text-10px w-[100%] py-4 lg:w-[500px]'>
                {/*add Bg gradient pending */}

                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        cursor={false}
                        sequence={[codeblock,10000,""]}
                        // wrapper="p"
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                            }
                        }
                        
                    />
                </div>

            </div>
        </div>
    );
};

export default CodeBlocks;