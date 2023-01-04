import { DisconnectReason } from "../../interfaces/meeting";

export type LogEvent = (
  category?: string,
  action?: string,
  payload?: any,
  noDelay?: boolean
) => void;
export const logEvent: LogEvent = (
  category = "",
  action = "",
  payload = null,
  noDelay?: boolean
) => {
  console.log(category, action, payload, noDelay);
};
export const logDisconnect = ({
  reason,
  server,
  sceneBeforeDisconnected,
}: {
  reason: DisconnectReason;
  server?: string;
  sceneBeforeDisconnected?: string;
}) => {
  logEvent(
    "STREAM_DISCONNECTED",
    "STREAM_DISCONNECTED",
    {
      server,
      sceneBeforeDisconnected,
      reason,
    },
    true
  );
};
