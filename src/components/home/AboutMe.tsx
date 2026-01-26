import { motion } from 'framer-motion'

const parentVariants = {
    hidden: {
        y: 48, opacity: 0
    },
    visible: {
        y: 0, 
        opacity: 1,
        transition: {
            duration: 0.5,
            when: 'beforeChildren',
            staggerChildren: 0.3
        }
    },
}

const childVariants = {
    hidden: {
        y: 48, opacity: 0
    },
    visible: {
        y: 0, 
        opacity: 1,
    }
}

const AboutMe = () => {
    return (  
        <motion.div
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            className='mx-auto max-w-5xl px-4 py-30 text-white flex flex-col gap-5'
        >
            <motion.div
                variants={childVariants}
            className='flex flex-col gap-5 max-sm:p-5'>
                <motion.p variants={childVariants} className='text-xl'>Ang TOTATS ay itinatag noong 2010 sa San Jose del Monte, Bulacan. Gayunpaman, si <strong>Ismael</strong>—ang tattoo artist—ay aktibo na sa industriya ng tattoo mula pa noong 1990s. Mahigit kumulang <motion.span animate={{scale: [1, 1.1, 1]}} transition={{ repeat: Infinity}} className='inline-block  [text-shadow:0_0_8px_rgba(255,255,255,0.7)]'>1k+</motion.span> na ang naging kliyente at patuloy na hinahasa at pinauunlad ang kanyang kasanayan sa sining ng tattoo. Layunin ng TOTATS na maghatid ng de-kalidad na tattoo sa abot-kayang halaga at bumuo ng tiwala sa pamamagitan ng husay, integridad, at maingat na proseso.</motion.p>
            </motion.div>
        </motion.div>
    );
}
 
export default AboutMe;