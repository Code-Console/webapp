import React from 'react';
import Script from 'next/script';
import HTMLHeader from './HTMLHeader';
const HTMLMeetingHeader = () => {
  
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://146.190.118.136/libs/lib-jitsi-meet.min.js"
        strategy="beforeInteractive"
      ></Script>
      <HTMLHeader />
    </>
  );
};

export default HTMLMeetingHeader;
