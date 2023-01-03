import React from 'react';
import Script from 'next/script';
import HTMLHeader from './HTMLHeader';
const HTMLMeetingHeader = () => {
  
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.6.3.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/libs/lib-jitsi-meet.min.js"
        strategy="beforeInteractive"
      ></Script>
      <HTMLHeader />
    </>
  );
};

export default HTMLMeetingHeader;
