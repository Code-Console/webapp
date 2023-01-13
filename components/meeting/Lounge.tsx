import React from "react";

const Lounge = ({
  joinMeeting,
}: {
  joinMeeting: (meetingId: string) => void;
}) => {
  const [state, setState] = React.useState({ err: false, meetingId: "" });
  return (
    <div className="ui-wrapper">
      <div className="container">
        <h1 className="title">Welcome to hututu Meet Platform</h1>
        <input
          type="text"
          placeholder="meeting Id"
          className="msg-input"
          id="msg-txt"
          style={{ border: state.err ? "2px solid #f00f" : "1px solid #fff6" }}
          value={state.meetingId}
          onChange={(e) =>
            setState((state) => {
              return { ...state, meetingId: e.target.value, err: false };
            })
          }
        />
        <span className="err">{state.err ? "Please add meeting Id" : ""}</span>
        <div
          className="btn"
          onClick={() => {
            if (state.meetingId.trim().length === 0) {
              setState((state) => {
                return { ...state, err: true };
              });
            } else {
              joinMeeting(state.meetingId);
            }
            // meetingId
          }}
        >
          Join Meeting
        </div>
      </div>
      <style jsx>{`
        .ui-wrapper {
          display: flex;
          position: fixed;
          left: 10%;
          top: 10%;
          bottom: 10%;
          right: 10%;
          justify-content: center;
          align-items: center;
        }
        .msg-input {
          background: transparent;
          border: 1px solid #fff;
          min-width: 250px;
          height: 30px;
          color: white;
          padding: 10px 8px;
        }
        .btn {
          background: green;
          padding: 12px 50px;
          margin: 20px;
          border-radius: 10px;
        }
        .btn:hover {
          background: #0a570a;
        }
        .title {
          margin-bottom: 50px;
          text-align: center;
        }
        .container {
          display: flex;
          align-items: center;
          flex-direction: column;
          background: #2d2a26f5;
          padding: 50px;
        }
        .err {
          font-size: 0.6rem;
          color: red;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default Lounge;
