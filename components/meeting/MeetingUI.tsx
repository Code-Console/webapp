import React from "react";
import { MicIcn, QuitIcn, ScreenShareIcn, SendIcn } from "../Assets/AppIcon";
import { MeetingContext } from "./MeetingContext";
const MeetingUI = () => {
  const {
    room,
    remoteUsers,
    chat,
    addChatMsg,
    localUser,
    setLocalUser,
    switchVideo,
    onDisconnect,
  } = React.useContext(MeetingContext);
  const [state, setState] = React.useState({ msgInput: "" });
  const isChatDisable = Object.keys(remoteUsers || []).length < 1;
  const sendMessage = () => {
    if (isChatDisable) return;
    console.error(localUser, "room ", room, room?.myUserId());
    if (state.msgInput?.trim().length > 0) {
      room?.sendEndpointMessage("", {
        msg: state.msgInput,
      });
      addChatMsg?.({
        name: "you",
        msg: state.msgInput,
        id: room?.myUserId() || "",
      });
      setState((state) => {
        return { ...state, msgInput: "" };
      });
    }
  };
  const onAudioClick = () => {
    const audio = localUser?.tracks?.find((t) => t.getType() === "audio");
    if (audio?.isMuted()) {
      audio?.unmute();
      setLocalUser?.({
        ...localUser,
        lastAudioMuted: false,
      });
    } else {
      audio?.mute();
      setLocalUser?.({
        ...localUser,
        lastAudioMuted: true,
      });
    }
  };
  const onEndClick = () => {
    onDisconnect();
    setTimeout(() => {
      window.open("https://hututu.vercel.app/", "_self");
    }, 100);
  };
  return (
    <div className="MeetingUI">
      <div id="meeting-ui">
        <div className="meeting-control">
          <div style={{ display: "contents" }}>
            <input
              type="text"
              placeholder="message"
              className="msg-input"
              id="msg-txt"
              value={state.msgInput}
              disabled={isChatDisable}
              onChange={(e) =>
                setState((state) => {
                  return { ...state, msgInput: e.target.value };
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <div id="send-but" className="meeting-btn" onClick={sendMessage}>
              <SendIcn color="white" />
            </div>
          </div>
          <div className="divider"></div>
          <div id="mute-but" className="meeting-btn" onClick={onAudioClick}>
            <MicIcn color="white" />
          </div>
          <div className="divider"></div>
          <div className="meeting-btn" id="end-but" onClick={onEndClick}>
            <QuitIcn color="#D14545" />
          </div>
          <div className="divider"></div>
          <div
            className="meeting-btn"
            id="share-btn"
            onClick={() => switchVideo?.()}
          >
            <ScreenShareIcn color="white" />
          </div>
        </div>
        <div id="chatPanel" className="meeting-chat">
          <div id="chatContainer" className="chat-container">
            <div id="chatMessages" className="chat-messages">
              {chat?.map((c) => (
                <p className="chat-message">
                  💻 {c.name}: {c.msg}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="meeting-end">
        <h1>Thanks for the Meeting</h1>
      </div>
      <style jsx>{`
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
        #meeting-ui :global(svg) {
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
          border: 1px solid ${isChatDisable ? "gray" : "#fff"};
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
          background: ${isChatDisable ? "gray" : "green"};
          margin-left: 5px;
        }
        #send-but :global(svg) {
          width: 24px;
          height: 24px;
        }
        #mute-but {
          background-color: ${localUser?.lastAudioMuted
            ? "red"
            : "transparent"};
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
