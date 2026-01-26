import { motion} from 'framer-motion';

const buttonsVariants = {
    rest: {
        y: 48, opacity: 0
    },
    hover: {
        scale: [1, 1.1, 1, 1.1, 1],
        transition: {
            repeat: Infinity,
            duration: 2
        }
    }
}

const ContactInfo = () => {
    return (  
        <div className="flex flex-col justify-center items-center p-30 h-[100vhs] gap-5">
            <h1 className="max-sm:text-xl text-4xl text-white font-bold">Contact Us:</h1>
            
            <div className='flex justify-center items-center gap-10'>
                <motion.a className="flex flex-col justify-center items-center gap-3" href='https://www.facebook.com/tototattooist' variants={buttonsVariants} whileHover="hover" target='_blank'>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" />
                    <p className="text-white text-2xl leading-none">@tototattooist</p>
                </motion.a>
            </div> 
        </div>
    );
}
 
export default ContactInfo;