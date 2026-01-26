import { motion } from 'framer-motion'

const Location = () => {
    return (  
        <div className="flex flex-col justify-center items-center p-40 gap-10 ">
            <motion.h1 className="text-4xl font-bold text-white">Location</motion.h1>
            <p className='text-white it max-sm:w-[250px]'>BLK 8 Lt 4 James St. Sarmiento Townville Poblacion , San Jose del Monte, Philippines</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.445378691158!2d121.04219781039365!3d14.80658341100272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397afb8e5394a47%3A0xf63da576c4574594!2sTOTATS%20SKIN%20ART%20TATTOO!5e1!3m2!1sen!2sph!4v1768895306392!5m2!1sen!2sph" style={{border:0}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl max-sm:w-[250px] w-[600px] max-sm:h-[250px] h-[450px]"></iframe>
        </div>
    );
}
 
export default Location;
