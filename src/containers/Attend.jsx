import React from 'react';
import Link from 'next/link';

const Attend = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center -mt-20 md:mt-0'>
      <div className='flex flex-col justify-center items-center absolute bottom-0 mb-10 md:mb-0 md:relative md:w-1/2 md:px-8'>
        <div className='hidden md:block -mt-30 mb-10 text-center font-semibold'>
        Elevate your educational experience with Noteline! Whether you are ready to join an engaging session or take charge as the host, its time to embark on a note-taking journey like never before. Seamlessly capture and share meaningful moments on the interactive timeline, fostering a dynamic exchange between teachers and students. Dont miss out join or host now and start taking note of the transformative learning experiences awaiting you!
        </div>
        <div className='flex flex-col justify-center items-center bottom-0'>
        <Link href="/join">
          <div className='bg-[#01A1E4] border-[#01A1E4] border-2 text-white py-3 px-40 mb-4 rounded-md  '>Join</div>
        </Link>
          <Link href="">
            <div className='border-[#01A1E4] border-2 text-[#01A1E4] py-3 px-40 rounded-md'>Host</div>
          </Link>
        </div>
      </div>
      <div className='text-center  md:mr-70 md:w-1/2'>
        <h1 className='text-6xl mb-10  md:ml-30 md:mb-10 font-semibold text-[#01A1E4]'>Noteline</h1>
        <div className='flex md:ml-30 items-center justify-center'>
          <img className='md:right-0 md:w-[250px]' src="/write.svg" alt="write" />
        </div>
      </div>
    </div>
  );
};

export default Attend;
