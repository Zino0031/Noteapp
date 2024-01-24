import React from 'react';
import Link from 'next/link';
import HostSessionForm from '@/components/Host/HostSessionForm';
import HostYourSession from '@/components/Host/HostYourSession';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Host = () => {
  const { t } = useTranslation('host');

  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center -mt-20 md:mt-0'>
      <div className='flex flex-col justify-center items-center absolute bottom-0 mb-10 md:mb-0 md:relative md:w-1/2 md:px-8'>
      <div className='flex md:ml-30 items-center justify-center mb-6'>
          <img className='w-80' src="/host.svg" alt="host" />
        </div>
        <div>{t('hostOneSession')}</div>
        <HostYourSession />
        <div>{t('hostAnotherSession')}</div>
        <HostSessionForm /> 
        <div className='flex flex-col justify-center items-center bottom-0'>
        <Link href="/newsession">
          <div className='bg-[#01A1E4] border-[#01A1E4] border-2 text-white py-3 px-28 mb-4 rounded-md  '>{t('newSession')}</div>
        </Link>
  
        </div>
      </div>
      <div className='text-center  md:mr-70 md:w-1/2 hidden'>
        <h1 className='text-6xl mb-10  md:ml-30 md:mb-10 font-semibold text-[#01A1E4]'>Noteline</h1>
        <div className='flex md:ml-30 items-center justify-center'>
          <img className='md:right-0 md:w-[250px]' src="/write.svg" alt="write" />
        </div>
      </div>
    </div>
  );
};

export default Host;

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ["host"])),
      },
  };
}