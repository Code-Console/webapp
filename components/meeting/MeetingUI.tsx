import React from "react";

const MeetingUI = () => {
  return (
    <div className="ui-wrapper">
      <div id="p-parent">
        <div className="progress" id="loading">
          <div className="progress-value"></div>
        </div>
        <button className="start-btn" id="join-meeting">
          Start
        </button>
      </div>
      <div id="meeting-ui">
        <div className="meeting-control">
          <div style={{ display: "contents" }}>
            <input
              type="text"
              placeholder="message"
              className="msg-input"
              id="msg-txt"
            />
            <div id="send-but" className="meeting-btn">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="send-svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.462 3.772c-1.79-.826-3.7.885-3.077 2.754l1.745 5.237a.75.75 0 0 1 0 .474l-1.745 5.237c-.623 1.87 1.288 3.58 3.077 2.754l14.877-6.866c1.162-.536 1.162-2.188 0-2.724L6.462 3.772Zm-1.654 2.28a.75.75 0 0 1 1.026-.918L20.71 12 5.834 18.866a.75.75 0 0 1-1.026-.918L6.54 12.75H15a.75.75 0 0 0 0-1.5H6.54L4.808 6.052Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </div>
          <div className="divider"></div>
          <div id="mute-but" className="meeting-btn">
            <svg
              width="71"
              height="70"
              viewBox="0 0 71 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="70"
                height="70"
                transform="translate(0.426758)"
              ></rect>
              <path
                d="M50.4167 34.4209C50.4167 33.6922 49.8261 33.1018 49.0976 33.1018C48.3691 33.1018 47.7785 33.6922 47.7785 34.4209C47.7785 41.6278 41.9152 47.4911 34.7083 47.4911C27.5015 47.4911 21.6382 41.6276 21.6382 34.4209C21.6382 33.6922 21.0476 33.1018 20.3191 33.1018C19.5906 33.1018 19 33.6922 19 34.4209C19 42.6384 25.3426 49.4011 33.3892 50.0733V54.7405H27.5136C26.7851 54.7405 26.1945 55.3309 26.1945 56.0596C26.1945 56.7882 26.7851 57.3787 27.5136 57.3787H41.9029C42.6314 57.3787 43.222 56.7882 43.222 56.0596C43.222 55.3309 42.6314 54.7405 41.9029 54.7405H36.0273V50.0733C44.0739 49.4011 50.4167 42.6384 50.4167 34.4209Z"
                fill="white"
              ></path>
              <path
                d="M34.7085 42.934C39.403 42.934 43.2223 39.1148 43.2223 34.4204V21.8886C43.2223 17.1942 39.403 13.375 34.7085 13.375C30.0141 13.375 26.1948 17.1942 26.1948 21.8886V34.4204C26.1948 39.115 30.0141 42.934 34.7085 42.934ZM28.833 21.8886C28.833 18.6489 31.4688 16.0132 34.7085 16.0132C37.9483 16.0132 40.5841 18.6489 40.5841 21.8886V34.4204C40.5841 37.6601 37.9483 40.2958 34.7085 40.2958C31.4688 40.2958 28.833 37.6601 28.833 34.4204V21.8886V21.8886Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.3745 12.1768C48.0364 12.5492 48.2712 13.3876 47.8989 14.0495L23.1471 58.0527C22.7748 58.7146 21.9363 58.9494 21.2744 58.577C20.6125 58.2047 20.3778 57.3663 20.7501 56.7044L45.5019 12.7012C45.8742 12.0393 46.7126 11.8045 47.3745 12.1768Z"
                fill="white"
                style={{ display: "none" }}
                id="mute-line"
              ></path>
            </svg>
          </div>
          <div className="divider"></div>
          <div className="meeting-btn" id="end-but">
            <svg
              width="71"
              height="70"
              viewBox="0 0 71 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="70"
                height="70"
                transform="translate(0.573242)"
              ></rect>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M41.8363 16.2971C42.0173 15.7027 42.6459 15.3676 43.2402 15.5486C52.3533 18.3237 59 26.5924 59 36.4004C59 48.5 48.8934 58.2498 36.5 58.2498C24.1066 58.2498 14 48.5 14 36.4004C14 27.419 19.5757 19.7262 27.5112 16.3646C28.0833 16.1223 28.7435 16.3896 28.9859 16.9617C29.2282 17.5338 28.9609 18.194 28.3888 18.4364C21.2259 21.4707 16.25 28.3852 16.25 36.4004C16.25 47.1923 25.2832 55.9998 36.5 55.9998C47.7168 55.9998 56.75 47.1923 56.75 36.4004C56.75 27.6492 50.8159 20.2076 42.5848 17.701C41.9904 17.52 41.6553 16.8915 41.8363 16.2971Z"
                fill="#D14545"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.373 11C35.9944 11 36.498 11.5037 36.498 12.125V34.625C36.498 35.2463 35.9944 35.75 35.373 35.75C34.7517 35.75 34.248 35.2463 34.248 34.625V12.125C34.248 11.5037 34.7517 11 35.373 11Z"
                fill="#D14545"
              ></path>
            </svg>
          </div>
          <div className="divider"></div>
          <div className="meeting-btn" id="share-btn">
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.0347 19.3525C21.0347 19.9172 20.5798 20.376 20.0171 20.376C19.4556 20.376 19 19.9172 19 19.3525V16.0235C19 15.4588 19.455 15 20.0171 15H61.9812C62.545 15 63 15.4588 63 16.0235V42.977C63 43.5418 62.545 44 61.9812 44H58.7023C58.1409 44 57.6847 43.5424 57.6847 42.977C57.6847 42.4093 58.1409 41.9523 58.7023 41.9523H60.9625L60.9618 17.0478H21.0349L21.0347 19.3525Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.9687 22H56.032C56.596 22 57.0521 22.4532 57.0521 23.0149V49.3419L61.7218 54.2895C62.3379 54.9414 61.8599 55.9953 60.9805 55.9953L9.02001 56C8.08596 56 7.65422 54.8583 8.32673 54.24L12.9489 49.3419V23.0149C12.9483 22.4532 13.4044 22 13.9683 22L13.9687 22ZM55.0103 24.0303H14.989V48.7213H55.0103V24.0303ZM55.5932 50.7531H14.4059L11.3736 53.9682H58.6247L55.5932 50.7531Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.2764 26.2955C22.6693 25.9015 23.3111 25.9015 23.7045 26.2955C24.0985 26.6913 24.0985 27.3289 23.7045 27.7235L18.724 32.7032C18.3294 33.0989 17.6893 33.0989 17.2959 32.7032C16.9014 32.3092 16.9014 31.6698 17.2959 31.2752L22.2764 26.2955Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.302 27.315C28.6902 26.895 29.3199 26.895 29.7093 27.315C30.0969 27.7356 30.0969 28.4159 29.7093 28.8371L19.6969 39.686C19.307 40.1047 18.679 40.1047 18.2907 39.686C17.9031 39.2642 17.9031 38.5814 18.2907 38.1626L28.302 27.315Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div id="chatPanel" className="meeting-chat">
          <div id="chatContainer" className="chat-container">
            <div id="chatMessages" className="chat-messages"></div>
          </div>
        </div>
      </div>
      <div id="meeting-end">
        <h1>Thanks for the Meeting</h1>
      </div>
      <style jsx>{`
        :root {
          --load-end-width: 10%;
        }

        #c {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          /* z-index: -1; */
        }
        #video-container {
          z-index: -10;
          position: absolute;
          top: 0;
          bottom: 0;
          max-width: 800px;
          max-height: 800px;
          overflow: hidden;
        }
        .video-back {
          width: 100px;
          height: auto;
        }
        #p-parent {
          justify-content: center;
          align-items: center;
          background: #000a;
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          display: none;
        }

        .progress {
          background: rgba(255, 255, 255, 0.1);
          justify-content: flex-start;
          border-radius: 100px;
          align-items: center;
          position: relative;
          padding: 0 5px;
          display: flex;
          height: 40px;
          width: 500px;
        }

        .progress-value {
          animation: load 3s normal forwards;
          box-shadow: 0 10px 40px -10px #fff;
          border-radius: 100px;
          background: #fff;
          height: 30px;
          width: 0;
        }

        @keyframes load {
          0% {
            width: 0;
          }
          100% {
            width: var(--load-end-width);
          }
        }
        .start-btn {
          background-color: green;
          width: 150px;
          height: 40px;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          border-radius: 20px;
          display: none;
        }
        #meeting-ui {
          display: flex;
          position: fixed;
          align-items: flex-end;
          justify-content: center;
          left: 0px;
          right: 0px;
          bottom: 0px;
          flex-direction: row;
          left: 10px;
          right: 10px;
        }
        svg {
          width: 50px;
          height: 50px;
        }
        .divider {
          background: white;
          width: 1px;
          margin: 10px;
          height: 20px;
        }
        .meeting-btn {
          margin: 5px 0;
          border-radius: 100px;
        }
        #meeting-end {
          justify-content: center;
          align-items: center;
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          background-image: url("Twinkle.svg");
          display: none;
        }
        .msg-input {
          background: transparent;
          border: 1px solid #fff;
          min-width: 250px;
          height: 30px;
          color: white;
          padding: 0 8px;
        }
        .msg-input::placeholder {
          color: #fff7;
        }
        #send-but {
          width: 32px;
          height: 32px;
          padding: 5px;
          background: green;
          margin-left: 5px;
        }
        #send-svg {
          width: 24px;
          height: 24px;
        }
        .meeting-control {
          display: flex;
          align-items: center;
          margin-left: auto;
          background: #00000055;
          padding: 0 10px;
          border-radius: 10px;
        }
        .meeting-chat {
          height: 200px;
          overflow: auto;
          width: 300px;
          margin-left: auto;
          background: #00000066;
          padding: 10px 10px;
          color: white;
        }
        @media (max-width: 680px) {
          #meeting-ui {
            flex-direction: column;
            align-items: center;
          }
          .meeting-chat {
            margin-left: unset;
            width: 100%;
            order: 1;
          }
          .meeting-control {
            margin-left: unset;
            order: 2;
          }
          .divider {
            width: 0px;
            margin: 0px;
            height: 20px;
          }
          .msg-input {
            min-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetingUI;
