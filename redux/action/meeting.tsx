import { IUser } from "../../interfaces";
import { JitsiLocalTrack, JitsiRemoteTrack } from "../../interfaces/meeting";
export const SET_MEETING_ID = "MEETING.SET_MEETING_ID";
export const DID_LEAVE_MEETING = "MEETING.DID_LEAVE_MEETING";
export const DID_UPDATE_LOCAL_USER = "MEETING.DID_UPDATE_LOCAL_USER";
export const DID_ADD_LOCAL_TRACK = "MEETING.DID_ADD_LOCAL_TRACK";
export const DID_ADD_REMOTE_TRACK = "MEETING.DID_ADD_REMOTE_TRACK";
export const LOCAL_TRACK_AUDIO_MUTE_DID_CHANGE =
  "MEETING.LOCAL_TRACK_AUDIO_MUTE_DID_CHANGE";
export const REMOTE_TRACK_AUDIO_MUTE_DID_CHANGE =
  "MEETING.REMOTE_TRACK_AUDIO_MUTE_DID_CHANGE";
export const LOCAL_TRACK_VIDEO_MUTE_DID_CHANGE =
  "MEETING.LOCAL_TRACK_VIDEO_MUTE_DID_CHANGE";
export const REMOTE_TRACK_VIDEO_MUTE_DID_CHANGE =
  "MEETING.REMOTE_TRACK_VIDEO_MUTE_DID_CHANGE";

export const actionDidLeaveMeeting = () => ({
  type: DID_LEAVE_MEETING,
  payload: null,
});
export const actionUpdateLocalUser = (user: IUser) => ({
  type: DID_UPDATE_LOCAL_USER,
  payload: user,
});
export const actionDidAddLocalTrack = (payload: JitsiLocalTrack[]) => ({
  type: DID_ADD_LOCAL_TRACK,
  payload,
});
export const actionDidAddRemoteTrack = (payload: JitsiRemoteTrack) => ({
  type: DID_ADD_REMOTE_TRACK,
  payload,
});

export const actionLocalTrackAudioMuteDidChange = (
  isMuted: boolean,
  restoreLater?: boolean
) => ({
  type: LOCAL_TRACK_AUDIO_MUTE_DID_CHANGE,
  payload: { isMuted, restoreLater },
});

export const actionRemoteTrackAudioMuteDidChange = (
  participantId: string,
  isMuted: boolean
) => ({
  type: REMOTE_TRACK_AUDIO_MUTE_DID_CHANGE,
  payload: { participantId, isMuted },
});

export const actionLocalTrackVideoMuteDidChange = (isMuted: boolean) => ({
  type: LOCAL_TRACK_VIDEO_MUTE_DID_CHANGE,
  payload: { isMuted },
});

export const actionRemoteTrackVideoMuteDidChange = (
  participantId: string,
  isMuted: boolean
) => ({
  type: REMOTE_TRACK_VIDEO_MUTE_DID_CHANGE,
  payload: { participantId, isMuted },
});
export const actionSetMeetingId = (meetingId: string) => ({
  type: SET_MEETING_ID,
  payload: meetingId
});
