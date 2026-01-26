import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react';
import AboutMe from '../components/home/AboutMe';
import ReactLenis from 'lenis/react';
import HorizontalScrollCarousel from '../components/home/HorizontalScrollCarousel';
import ContactInfo from '../components/home/ContactInfo';
import Location from '../components/home/Location';
import Workspace from '../components/home/Workspace';
import ParallaxImages from '../components/home/ParallaxImages';

const Home = () => {
    return (  
        <div className="">
            <Hero/>
        </div>
    );
}

export const sectionHeight = 1500

const Hero = () => {
    return(
        <ReactLenis root>
            <section id='intro' 
                className='relative w-full bg-[rgb(11,11,11)]'
                style={{
                    height: `calc(${sectionHeight}px + 100vh) `,
                    backgroundImage: 'url("valeria-reverdo-dwy2meBFqW8-unsplash.jpg")',
                    backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    
                }}    
            >
                <CenterImage/>
                <ParallaxImages p1="pic1.png" p2="pic2.png" p3="pic3.png" p4="pic4.png"/>
                <div className='absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-[rgb(11,11,11)]'/>
            </section>
            <section id='about'>
                <AboutMe/>
                <HorizontalScrollCarousel/>
            </section>
            <section id='location'>
                <Location/>
                <Workspace/>
            </section>
            <section id='contact'>
                <ContactInfo/>
            </section>
        </ReactLenis>
    ) 
}

const CenterImage = () => {
    const { scrollY } = useScroll()

    //fade out effect
    const opacity = useTransform(scrollY, [sectionHeight, sectionHeight + 500], [1, 0]);

    //zoom out effect
    // const bgSize = useTransform(scrollY, [20, sectionHeight + 500], ["100%", "120%"])

    const clip1 = useTransform(scrollY, [0, sectionHeight], [25, 0]);
    const clip2 = useTransform(scrollY, [0, sectionHeight], [75, 100]);

    //rectangular effect:
    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`

    return (
        <motion.div
            className='sticky top-0 h-screen w-full'
            style={{
                opacity,
                clipPath,
                backgroundImage: "url(https://images.unsplash.com/photo-1660917096269-1f7155cba68f?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover'
            }}
       />
    )
}

export const ImgComponent = ({className, alt, src, start, end}: {className?: string, alt?: string, src?: string, start: number, end: number}) => {
    const ref = useRef(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${(end - 200) * -1}px`]
    })

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    
    const speed = 1; // try 1.3 – 2.5
    const y = useTransform(scrollYProgress, [0, 1], [start, end * (-speed)])

    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85])
    
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`

    return (
        <motion.img 
            style={{opacity, transform}}
            ref={ref}
            src={src} 
            alt={alt} 
            className={className}
        />
    )
}

export default Home;