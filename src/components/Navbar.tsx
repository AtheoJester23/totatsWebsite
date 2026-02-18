import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { Dialog, DialogPanel} from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, Calendar, Home, LayoutDashboard, LogIn, Menu, PhilippinePeso, Phone, Store } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../state/store';
import { supabase } from '../supabaseClient';
import { setAuthenticated } from '../state/auth/authSlice';

const DURATION = 0.15;
const STAGGER = 0.025;

const Navbar = () => {
    const opts = ["HOME", "ABOUT", "CONTACT"]
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const currentLoc = location.pathname.replace(/[//]/g, "");

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(setAuthenticated(false))
        setOpen(false);
        navigate("/")
    }

    useEffect(() => {
        const isAuthenticated = async () => {
            try {
                const {data: session} = await supabase.auth.getSession();
                
                if(!session){
                    dispatch(setAuthenticated(false));
                    return;
                }

                dispatch(setAuthenticated(true));
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        if(!authenticated){
            isAuthenticated();
        }
    }, [])

    console.log("this", currentLoc.slice(0, 9));

    return (  
        <motion.div className="z-1000 bg-white/0.01 backdrop-blur-lg top-0 inset-x-0 mx-0 max-sm:px-5 max-sm:py-2 px-40 flex justify-between items-center mx-0 fixed max-md:px-2"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 50, duration: 0.5 }}  
        >
            <div className="w-full flex flex-wrap items-center justify-between p-0">
                <a href="/" className="flex items-center justify-center max-sm:gap-2 gap-3">
                    <img src="/logo.png" className="max-sm:h-[30px] h-[35px]" alt="website-logo"/>
                    <h1 className="max-sm:text-1xl text-2xl font-bold text-white">TOTATS</h1>
                </a>

                {currentLoc.slice(0, 9) !== "dashboard" && <div className='flex gap-5 p-5 justify-center items-center max-sm:hidden'>
                    <Link to={'/schedule'}>
                        <motion.span className='text-white font-bold'
                            initial={{textShadow: '0 0 5px #fff'}}
                            animate={{textShadow: '0'}}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                delay: 5,
                                ease: 'easeInOut'
                            }}
                        >SCHEDULE</motion.span>
                    </Link>
                    
                    {/* HOME BUTTON */}
                    <motion.a
                        initial="initial"
                        whileHover="hovered"
                        className='relative block overflow-hidden whitespace-nowrap text-white font-bold cursor-pointer'
                        style={{
                            lineHeight: 1.35
                        }}
                        href={`${currentLoc !== "/" ? "/#intro" : "#intro"}`}
                    >
                        <div className='flex'>
                            {opts[0].split('').map((item, index) => (
                                <motion.p key={item}
                                    variants={{
                                        initial: {y: "-100%"},
                                        hovered: {y: 0}
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index
                                    }}
                                >{item}</motion.p>
                            ))}
                        </div>
                        <div className='absolute inset-0'>
                            {opts[0].split('').map((item, index) => (
                                <motion.p key={item}
                                    variants={{
                                        initial: {y: 0},
                                        hovered: {y: "100%"}
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index
                                    }}
                                    className='inline-block'
                                >{item}</motion.p>
                            ))}
                        </div>
                    </motion.a>

                    {/* ABOUT BUTTON */}
                    <motion.a
                        initial="initial"
                        whileHover="hovered"
                        className='relative block overflow-hidden whitespace-nowrap text-white font-bold cursor-pointer'
                        style={{
                            lineHeight: 1.35
                        }}
                        href={`${currentLoc !== "/" ? "/#about" : "#about"}`}
                    >
                        <div className='flex'>
                            {opts[1].split('').map((item, index) => (
                                <motion.p key={index}
                                    variants={{
                                        initial: {y: 0},
                                        hovered: {y: "100%"}
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index
                                    }}
                                >{item}</motion.p>
                            ))}
                        </div>
                        <div className='absolute inset-0'>
                            {opts[1].split('').map((item, index) => (
                                <motion.p key={index}
                                    variants={{
                                        initial: {y: "-100%"},
                                        hovered: {y: 0}
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index
                                    }}
                                    className='inline-block'
                                >{item}</motion.p>
                            ))}
                        </div>
                    </motion.a>
                    
                    {/* CONTACT BUTTON */}
                    <motion.a
                        initial="initial"
                        whileHover="hovered"
                        className='relative block overflow-hidden whitespace-nowrap text-white font-bold cursor-pointer'
                        style={{
                            lineHeight: 1.35
                        }}
                        href={`${currentLoc !== "/" ? "/#contact" : "#contact"}`}

                    >
                        <div className='flex'>
                            {opts[2].split('').map((item, index) => (
                                <motion.p key={index}
                                    variants={{
                                        initial: {y: 0},
                                        hovered: {y: "100%"}
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index
                                    }}
                                >{item}</motion.p>
                            ))}
                        </div>
                        <div className='absolute inset-0'>
                            {opts[2].split('').map((item, index) => (
                                <motion.p key={index}
                                    variants={{
                                        initial: {y: "-100%"},
                                        hovered: {y: 0}
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index
                                    }}
                                    className='inline-block'
                                >{item}</motion.p>
                            ))}
                        </div>
                    </motion.a>
                </div>}

                {/* Hamburger Icon */}
                <motion.button onClick={() => setOpen(true)} className="p-2 text-white cursor-pointer"
                    whileHover={{
                        scale: 1.1,
                    }}    
                >
                    <Menu className={`h-10`}/>
                </motion.button>
                
                <AnimatePresence>
                    {open && (
                        <Dialog
                            open={open}
                            onClose={setOpen}
                            className="relative z-50"
                        >
                            {/* Background overlay */}
                            <motion.div className="fixed inset-0 bg-black/60" 
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            />

                            {/* Slide-in panel */}
                            <motion.div className="fixed flex top-[20%] overflow-y-auto bg-[rgb(23,23,23)] rounded-e-xl"
                                initial={{x: "-100%"}}
                                animate={{x: 0}}
                                exit={{x: "-100%"}}
                                transition={{type: "tween", duration: 0.4, stiffness: 5}}
                            >
                                <DialogPanel className="w-auto p-6 text-white rounded-e-lg relative">
                                    <motion.button
                                        onClick={() => setOpen(false)}
                                        className="mb-6 right-5 top-5 absolute cursor-pointer"
                                        whileHover={{
                                            scale: 1.1,
                                            textShadow: "0 0 5px #fff"
                                        }}
                                    >
                                        ✕
                                    </motion.button>

                                    <nav className="space-y-6 text-lg flex flex-col mt-10">
                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                            className='hidden max-sm:block'
                                        >
                                            <a href={`${currentLoc !== "/" ? "/#" : "#"}`} onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <Home className='w-5 h-5'/>
                                                <span>
                                                    Home
                                                </span>
                                            </a>
                                        </motion.div>
                                        
                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                            className='hidden max-sm:block'
                                        >
                                            <a href={`/schedule`} onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <Calendar className='w-5 h-5'/>
                                                <span>
                                                    Schedule
                                                </span>
                                            </a>
                                        </motion.div>


                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                            className='hidden max-sm:block'
                                        >
                                            <a href={`${currentLoc !== "/" ? "/#about" : "#about"}`} onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <Book className='w-5 h-5'/>
                                                <span>
                                                    About
                                                </span>
                                            </a>
                                        </motion.div>

                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                            className='hidden max-sm:block'
                                        >
                                            <a href={`${currentLoc !== "/" ? "/#contact" : "#contact"}`} onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <Phone className='w-5 h-5'/>
                                                <span>
                                                    Contact
                                                </span>
                                            </a>
                                        </motion.div>
                                        
                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                        >
                                            <Link to="/pricing" onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <PhilippinePeso className='w-5 h-5'/>
                                                <span>
                                                    Pricing
                                                </span>
                                            </Link>
                                        </motion.div>

                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                        >
                                            <Link to="/shop" onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <Store className='w-5 h-5'/>
                                                <span>
                                                    Shop
                                                </span>
                                            </Link>
                                        </motion.div>
                                    
                                        {authenticated && (<motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                        >
                                            <Link to="/dashboard" onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                <LayoutDashboard className='w-5 h-5'/>
                                                <span>
                                                    Dashboard
                                                </span>
                                            </Link>
                                        </motion.div>)}
                                        
                                        <motion.div
                                            whileHover={{
                                                textShadow: '0 0 5px #fff',
                                                scale: 1.1
                                            }}
                                        >
                                            {!authenticated ? (
                                                <Link to="/login" onClick={() => setOpen(false)} className='inline-flex gap-2 justify-center items-center'>
                                                    <LogIn className='w-5 h-5'/>
                                                    <span>
                                                        Login
                                                    </span>
                                                </Link>
                                            ):(
                                                <motion.button onClick={() => handleLogout()} className='inline-flex gap-2 justify-center items-center cursor-pointer'
                                                    whileHover={{
                                                        textShadow: '0 0 5px #fff',
                                                        scale: 1.1
                                                    }}
                                                >
                                                    <LogIn className='w-5 h-5'/>
                                                    <span>
                                                        Logout
                                                    </span>
                                                </motion.button>

                                            )}
                                        </motion.div>
                                        
                                        
                                    </nav>
                                </DialogPanel>
                            </motion.div>
                        </Dialog>
                    )}
                </AnimatePresence>
            </div>

        </motion.div>
    );
}
 
export default Navbar;