import React from "react";

const MeetingLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <style jsx global>
        {`
          body {
            background: #0e0e0e;
          }
        `}
      </style>
    </>
  );
};

export default MeetingLayoutWrapper;
