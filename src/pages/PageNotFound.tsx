import { Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

const parentVariants = {
    hidden: {
        opacity: 0,
        scale: 0
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            when: 'beforeChildren',
            staggerChildren: 0.5
        }
    }
}

const childVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
}

const PageNotFound = () => {
    return ( 
        <div className="page">
            <div className="flex flex-col gap-3 justify-center items-center max-sm:w-[70%]">
                <motion.div
                    variants={parentVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col justify-center items-center gap-3"
                >
                    <Frown className="text-gray-500" size={100}/>
                    <motion.div
                        variants={childVariants}
                        className="flex flex-col justify-center items-center gap-3"
                    >
                        <h1 className="font-bold text-yellow-500 text-4xl max-sm:text-2xl max-sm:text-center">404 - page not found</h1>
                        <p className="text-gray-500 text-center mb-1">The page you are looking for might have been removed, non existent, or is temporarily unavailable.</p>
                        <motion.div 
                            initial={{x: 0}}
                            animate={{x: [0 , 10, 0, 10, 0]}}
                            transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 5}}
                        >
                            <Link to={"/"} className="shadow-lg hover:shadow-none bg-blue-600 font-bold -translate-y-0.25 hover:translate-none cursor-pointer duration-300 text-white max-sm:px-4 max-sm:py-2 px-5  py-2 rounded-full">GO TO HOMEPAGE</Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
 
export default PageNotFound;