import { AnyAction } from "redux";
import { ClientState } from "../../interfaces";
import { ParticipantMeetingState } from "../../interfaces/meeting";
import {
  DID_ADD_LOCAL_TRACK,
  DID_ADD_REMOTE_TRACK,
  DID_LEAVE_MEETING,
  DID_UPDATE_LOCAL_USER,
  LOCAL_TRACK_AUDIO_MUTE_DID_CHANGE,
  LOCAL_TRACK_VIDEO_MUTE_DID_CHANGE,
  REMOTE_TRACK_AUDIO_MUTE_DID_CHANGE,
  REMOTE_TRACK_VIDEO_MUTE_DID_CHANGE,
} from "../action/meeting";
import { defaultClientState } from "./clientReducer";

const meetingReducer = (
  state: ClientState = defaultClientState,
  action: AnyAction
): ClientState => {
  switch (action.type) {
    case DID_UPDATE_LOCAL_USER:
      return {
        ...state,
        user: {
          ...(state.user || {}),
          ...action.payload,
        },
      };

    case LOCAL_TRACK_AUDIO_MUTE_DID_CHANGE: {
      const previousMuteState = state.meeting?.localUser?.lastAudioMuted;
      const mute = action.payload.isMuted;
      const restoreLater = action.payload?.restoreLater;

      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          localUser: {
            ...(state.meeting?.localUser || {}),
            audioMuted: mute,
            lastAudioMuted: restoreLater ? previousMuteState : mute,
          },
        },
      };
    }

    case LOCAL_TRACK_VIDEO_MUTE_DID_CHANGE: {
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          localUser: {
            ...(state.meeting?.localUser || {}),
            videoMuted: action.payload.isMuted,
          },
        },
      };
    }

    case REMOTE_TRACK_AUDIO_MUTE_DID_CHANGE: {
      const remoteUsers = state.meeting?.remoteUsers || {};
      const copy = { ...remoteUsers };
      const { participantId, isMuted } = action.payload;
      copy[participantId] = {
        ...(copy[participantId] || {}),
        audioMuted: isMuted,
      };
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          remoteUsers: copy,
        },
      };
    }

    case REMOTE_TRACK_VIDEO_MUTE_DID_CHANGE: {
      const remoteUsers = state.meeting?.remoteUsers || {};
      const copy = { ...remoteUsers };
      const { participantId, isMuted } = action.payload;
      copy[participantId] = {
        ...(copy[participantId] || {}),
        videoMuted: isMuted,
      };
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          remoteUsers: copy,
        },
      };
    }

    case DID_LEAVE_MEETING: {
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          localUser: undefined,
          state: ParticipantMeetingState.LEFT_MEETING,
          remoteUsers: {},
          remoteSceneId: undefined,
          remotePopupAction: undefined,
          clientDetailPanelParticipantId: undefined,
          showClientDetailPanel: undefined,
        },
      };
    }

    case DID_ADD_REMOTE_TRACK: {
      const track = action.payload;
      const participantId = track.getParticipantId();
      const remoteUsers = state.meeting?.remoteUsers || {};
      const copy = { ...remoteUsers };
      const existingTracks = copy[participantId]?.tracks || [];
      copy[participantId] = {
        ...(copy[participantId] || {}),
        tracks: [...existingTracks, track],
      };
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          remoteUsers: copy,
        },
      };
    }

    case DID_ADD_LOCAL_TRACK: {
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          localUser: {
            ...(state.meeting?.localUser || {}),
            tracks: action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default meetingReducer;
