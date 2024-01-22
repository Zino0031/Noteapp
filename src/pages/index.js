import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center'>
      <div className='flex flex-col justify-center items-center absolute bottom-0 mb-10 md:mb-0 md:relative md:w-1/2 md:px-8'>
        <div className='hidden md:block -mt-20 mb-10 text-center font-semibold'>
        Noteline is an application that allows teachers and students to capture meaningful moments (“notes”) on a timeline, especially in a classroom setting where the teacher wants to get student feedback and the students want an easy way to communicate with the teacher and track interesting moments during the presentation
        </div>
        <Link href="/join">
          <div className='bg-[#01A1E4] text-white py-4 px-40 mb-4 rounded-md  '>Join as a guest</div>
        </Link>
        <div className='flex flex-row gap-2'>
          <Link href="">
            <div className='border-[#01A1E4] border-2 text-[#01A1E4] py-3 px-20 rounded-md'>Login</div>
          </Link>
          <Link href="">
            <div className='bg-[#01A1E4] border-[#01A1E4] border-2 text-white py-3 px-20 rounded-md'>Sign Up</div>
          </Link>
        </div>
      </div>
      <div className='text-center mb-5 md:mr-70 md:w-1/2'>
        <h1 className='text-xl -mt-20 md:ml-30  font-semibold mb-1 text-white'>Capture meaningful moments with</h1>
        <h1 className='text-6xl mb-10 md:ml-30 md:mb-10 font-extrabold text-white'>Noteline</h1>
        <div className="shape top-0 md:ml-30 right-0 -z-10"></div>
        <div className='flex md:ml-30 items-center justify-center'>
          <img className='md:right-0 md:w-[250px]' src="/note.svg" alt="note" />
        </div>
      </div>
    </div>
  );
};

export default Index;
