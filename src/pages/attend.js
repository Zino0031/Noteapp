import Attend from '@/containers/Attend'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const attend = () => {
  return (
    <div>
        <Attend/>
    </div>
  )
}

export default attend

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ["attend"])),
      },
  };
}