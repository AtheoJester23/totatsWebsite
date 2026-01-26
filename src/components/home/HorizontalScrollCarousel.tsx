import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Card from './Card';

const HorizontalScrollCarousel = () => {
    const targetRef = useRef<HTMLDivElement | null>(null)
    const {scrollYProgress} = useScroll({
        target: targetRef
    })

    const x = useTransform(scrollYProgress, [0, 1], ["150%", "-200%"]);

    return (  
        <section className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 h-screen flex items-center overflow-x-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1643984920001-dc7b2d197165?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover'}}>
                <div className='absolute top-[-2px] left-0 right-0 h-96 bg-gradient-to-t from-zinc-950/0 to-[rgb(11,11,11)]'/>
                <motion.div style={{x}} className='flex gap-4'>
                    <Card src='card1.png' text='Minimalist'/>
                    <Card src='card2.png' text='POP'/>
                    <Card src='card3.png' text='Realism'/>
                    <Card src='card4.png' text='Tribal'/>
                    <Card src='card5.png' text='Lettering'/>
                    <Card src='card6.png' text='Etc...'/>
                </motion.div>
            </div>
            <div className='absolute bottom-[-2px] left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-[rgb(11,11,11)]'/>
        </section>
    );
}
 
export default HorizontalScrollCarousel;