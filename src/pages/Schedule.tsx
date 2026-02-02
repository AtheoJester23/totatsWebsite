import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { schedTypes } from '../components/dashboard/Schedules';
import { compareTimeToNow, compareToToday, minimalTime, to12Hour, toReadableDate } from '../utils/time';
import { ClipLoader } from 'react-spinners';

const Schedule = () => {
    const [loading, setLoading] = useState(false)
    
    const test = [
        {
            title: 'Open',
            start: new Date(),
            allDay: true,
            // display: 'background',
            backgroundColor: 'rgb(11,11,11)',
            
        },
    ]
    
    const currentTime = new Date();
    
    const closed = [{
        title: "Close",
        start: new Date(),
        allDay: true,
        backgroundColor: 'rgb(11,11,11)'
    }]
    
    const [future, setFuture] = useState<schedTypes>([])
    const [today, setToday] = useState<schedTypes>([])

    useEffect(() => {
        const getScheds = async () => {
            try {
                setLoading(true)
                const {data, error} = await supabase.from('schedules').select();

                if(error){
                    throw new Error(`${error.message}`)
                }

                //today:
                setToday(data.filter(item => compareToToday(item.date) == 0 ).sort((a, b) => a.time.split(":")[0] - b.time.split(":")[0]));

                console.log(data);
                setFuture(data.filter(item => compareToToday(item.date) == 1));
            } catch (error) {
                console.error((error as Error).message)
            } finally{
                setLoading(false)
            }
        }

        getScheds();
    }, [])

    // console.log(today[0].time.split(":")[0])


    return (  
         <div className="flex flex-col mt-30 items-center min-h-screen">
            <h1 className='text-center text-2xl text-yellow-500 px-5'><strong>Note:</strong> The scedule below is not yet fully implemented, for more accurate schedule, please contact us through facebook messenger.</h1>
            
            <div className="w-full max-sm:h-[400px] max-w-4xl h-[500px] text-white p-4 rounded-lg shadow max-sm:m-5">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height="100%"
                    events={currentTime.getHours() > 21 || currentTime.getHours() > 5 ? test : closed}
                    eventDisplay="block"
                />
            </div>

            <div className='w-full p-5 rounded flex justify-center items-center '>
                <div className='border border-gray-500 rounded  max-md:w-[100%] w-[62%] p-5 flex flex-col gap-5'>
                    {!loading ? (
                        <>
                            <h1 className='text-center text-gray-500 p-5 text-4xl font-bold'>Today's Schedule</h1>
                            {today.length > 0 ? (
                                <div className='flex flex-col gap-1 h-[50vh] overflow-y-auto p-3 '>
                                    {today.map((item, index) => (
                                        <div key={item.id} className={`border border-gray-500 rounded text-white p-5 ${compareTimeToNow(item.time, (index + 1 < today.length ? today[index + 1].time : minimalTime(item.time) || item.time)) == 1 ? 'bg-white text-black!' : 'bg-none'}`}>
                                            <h1 className='text-xl font-bold'>{item.category}</h1>
                                            <p className='text-[16px]'>{toReadableDate(item.date)}</p>
                                            <p className='text-[14px]'>{to12Hour(item.time)}</p>
                                        </div>
                                    ))}
                                </div>
                            ):(
                                <h1 className='text-center text-5xl text-[rgb(23,23,23)]'>Nothing Scheduled Today</h1>
                            )}
                        </>
                    ):(
                        <div className='h-[50vh] flex justify-center items-center'>
                            <ClipLoader size={30} color='yellow'/>
                        </div>
                    )}
                </div>
                
            </div>

            <div className='w-full p-5 rounded flex justify-center items-center '>
                <div className='border border-gray-500 rounded  max-md:w-[100%] w-[62%] p-5 flex flex-col gap-5'>
                    {!loading ? (
                        <>
                            <h1 className='text-center text-gray-500 p-5 text-4xl font-bold'>Upcoming Schedule</h1>
                            {future.length > 0 ? (
                                <div className='flex flex-col gap-1 h-[50vh] overflow-y-auto p-3'>
                                    {future.map((item, index) => (
                                        <div key={item.id} className='border border-gray-500 rounded text-white p-5'>
                                            <h1 className='text-xl font-bold'>{item.category}</h1>
                                            <p className='text-[16px]'>{toReadableDate(item.date)}</p>
                                            <p className='text-[14px]'>{to12Hour(item.time)}</p>
                                            <small>Next one: {future[(index + 1 < future.length ? index + 1 : index)].name}</small>
                                        </div>
                                    ))}
                                </div>
                            ):(
                                <h1 className='text-center text-5xl text-[rgb(23,23,23)]'>Nothing Scheduled Today</h1>
                            )}
                        </>
                    ):(
                        <div className='h-[50vh] flex justify-center items-center'>
                            <ClipLoader size={30} color='yellow'/>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}
 
export default Schedule;