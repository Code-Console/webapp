import { IUser } from "../../interfaces";

export const DID_LEAVE_MEETING = "MEETING.DID_LEAVE_MEETING";
export const DID_UPDATE_LOCAL_USER = "MEETING.DID_UPDATE_LOCAL_USER";
export const actionDidLeaveMeeting = () => ({
  type: DID_LEAVE_MEETING,
  payload: null,
});
export const actionUpdateLocalUser = (user: IUser) => ({
  type: DID_UPDATE_LOCAL_USER,
  payload: user,
});
