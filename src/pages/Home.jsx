import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText.jsx";
import CTAButton from "../components/core/HomePage/Button.jsx";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks.jsx";
import TimeLineSection from "../components/core/HomePage/TimeLineSection.jsx";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection.jsx";
import InstructorSection from "../components/core/HomePage/InstructorSection.jsx";
import Footer from '../components/common/Footer.jsx';
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200
                     hover:scale-95 w-fit">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className="text-center text-4xl font-semibold mt-7">
                    Empower Your Fututre Growth with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace and boost your coding skills. from anywhere in the world and get access to the best resources,including hands-on projects, quizzes, and peronalised feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn more
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="shadow-blue-200 mx-3 my-7">
                    <video
                        muted
                        loop
                        autoPlay
                    >
                        <source src={banner} type="video/mp4" />
                    </video>
                </div>

                {/* code section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your
                                <HighlightText text={"Coding Potential"} />
                                with our online course
                            </div>
                        }
                        subHeading={
                            "Our courses are designed to help you learn coding from scratch and build a strong foundation in programming. You can choose from a wide range of courses based on your interest and level of expertise."
                        }
                        ctabutton1={
                            {
                                active: true,
                                linkto: "/signup",
                                btnText: "Get Started"
                            }

                        }
                        ctabutton2={
                            {
                                active: false,
                                linkto: "/login",
                                btnText: "learn more"
                            }
                        }

                        codeblock={`<Doctype html>\n<html>\n<head>\n<title>Codecademy</title>\n</head>\n<body>\n<h1>Welcome to Codecademy</h1>\n<p>Learn to code interactively, for free.</p>\n</body>\n</html>`}
                        codeColor={"text-yellow-25"}

                    />
                </div>

                {/* code section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start
                                <HighlightText text={"coding in seconds "} />

                            </div>
                        }
                        subHeading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabutton1={
                            {
                                active: true,
                                linkto: "/signup",
                                btnText: "Continue Learning"
                            }

                        }
                        ctabutton2={
                            {
                                active: false,
                                linkto: "/login",
                                btnText: "learn more"
                            }
                        }

                        codeblock={`<Doctype html>\n<html>\n<head>\n<title>Codecademy</title>\n</head>\n<body>\n<h1>Welcome to Codecademy</h1>\n<p>Learn to code interactively, for free.</p>\n</body>\n</html>`}
                        codeColor={"text-yellow-25"}

                    />
                </div>

                <ExploreMore />
            </div>

            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between">
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center text-richblack-800 gap-7">
                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w[45%]">
                            Get the skills you need for a
                            <HighlightText text={"Job that is in demand"} />
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px]">
                                The modern student expects to learn anytime, anywhere, and on any device. Our platform is designed to meet the needs of today's students and instructors.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                    <TimeLineSection />

                <LearningLanguageSection />
                    
                </div>
            </div>

            {/* section 3 */}

            <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter
            bg-richblack-800 text-white">
                <InstructorSection />

                <h2 className="text-center text-4xl font-semibold mt-10">Reviews from other learners</h2>
                {/* review slider */}
            </div>

            {/* footer */}
            <Footer />
        </div>
    )
}

export default Home;