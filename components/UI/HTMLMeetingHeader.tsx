import React from 'react';
import Script from 'next/script';
import HTMLHeader from './HTMLHeader';
import { ogImgMeet } from '../Assets';
const HTMLMeetingHeader = () => {
  
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="./libs/lib-jitsi-meet.min.js"
        strategy="beforeInteractive"
      ></Script>
      <HTMLHeader ogImageUrl={ogImgMeet} title={"Metaverse Meet"}/>
    </>
  );
};

export default HTMLMeetingHeader;
