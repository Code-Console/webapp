import { AnyAction } from "redux";
import { ClientState } from "../../interfaces";
import { ParticipantMeetingState } from "../../interfaces/meeting";
import {
  DID_LEAVE_MEETING,
  DID_UPDATE_LOCAL_USER,
  SET_MEETING_ID,
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

    case DID_LEAVE_MEETING: {
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          state: ParticipantMeetingState.LEFT_MEETING,
          remoteSceneId: undefined,
          remotePopupAction: undefined,
          clientDetailPanelParticipantId: undefined,
          showClientDetailPanel: undefined,
        },
      };
    }
    case SET_MEETING_ID: {
      return {
        ...state,
        meeting: {
          ...(state.meeting || {}),
          meetingId: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default meetingReducer;
