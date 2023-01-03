import { logJitsiEvent } from "./MeetingContainer";

const tryConnect = (connectionConfig: any) => {
  const connection = new JitsiMeetJS.JitsiConnection(
    null,
    undefined,
    connectionConfig
  );
  return new Promise((resolve, reject) => {
    connectionListener(connection, resolve, reject);
    connection.connect();
  });
};

const onWrongState = () => logJitsiEvent("WRONG_STATE", undefined);

const onConnectionDropped = () =>
  logJitsiEvent("CONNECTION_DROPPED_ERROR", undefined);

const onServerError = (error: any) => logJitsiEvent("SERVER_ERROR", { error });

const onOtherError = (error: any) => logJitsiEvent("OTHER_ERROR", { error });

const connectionListener = (connection: any, resolve: any, reject: any) => {
  const JitsiConnectionErrors = JitsiMeetJS.errors.connection;
  const JitsiConnectionEvents = JitsiMeetJS.events.connection;
  const handleConnectionFailed = (error: any) => {
    reject(error);
  };
  const handleConnectionEstablished = () => {
    unsubscribe();
    resolve(connection);
  };
  const unsubscribe = () => {
    connection.removeEventListener(
      JitsiConnectionEvents.CONNECTION_ESTABLISHED,
      handleConnectionEstablished
    );
    connection.removeEventListener(
      JitsiConnectionEvents.CONNECTION_FAILED,
      handleConnectionFailed
    );
  };

  connection.addEventListener(
    JitsiConnectionEvents.CONNECTION_ESTABLISHED,
    handleConnectionEstablished
  );

  connection.addEventListener(
    JitsiConnectionEvents.CONNECTION_FAILED,
    handleConnectionFailed
  );
  const handleConnectionDisconnect = () => {
    console.log("CONNECTION DISCONNECTED");
    const listeners: {
      [key: string]: Function;
    } = {
      [JitsiConnectionEvents.CONNECTION_DISCONNECTED]:
        handleConnectionDisconnect,
      [JitsiConnectionEvents.WRONG_STATE]: onWrongState,
      [JitsiConnectionErrors.CONNECTION_DROPPED_ERROR]: onConnectionDropped,
      [JitsiConnectionErrors.SERVER_ERROR]: onServerError,
      [JitsiConnectionErrors.OTHER_ERROR]: onOtherError,
    };
    for (const event in listeners) {
      connection.removeEventListener(event, listeners[event]);
    }
  };
  const listeners: {
    [key: string]: Function;
  } = {
    [JitsiConnectionEvents.CONNECTION_DISCONNECTED]: handleConnectionDisconnect,
    [JitsiConnectionEvents.WRONG_STATE]: onWrongState,
    [JitsiConnectionErrors.CONNECTION_DROPPED_ERROR]: onConnectionDropped,
    [JitsiConnectionErrors.SERVER_ERROR]: onServerError,
    [JitsiConnectionErrors.OTHER_ERROR]: onOtherError,
  };
  for (const event in listeners) {
    connection.addEventListener(event, listeners[event]);
  }
};
export default tryConnect;
