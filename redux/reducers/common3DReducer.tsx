import { AnyAction } from "redux";
import { ClientState } from "../../interfaces";
import {
  DID_LOAD_FIBER,
  SET_ANIM_TYPE,
  SET_CONFIGURATION_DETAIL,
  SET_CONFIGURATION_FABRIC,
  SET_CONFIGURATION_MODEL,
  SET_ORBIT_CONTROL,
  UPDATE_OBJECT_NAME,
} from "../action";
import { defaultClientState } from "./clientReducer";

const common3DReducer = (
  state: ClientState = defaultClientState,
  action: AnyAction
): ClientState => {
  switch (action.type) {
    case DID_LOAD_FIBER: {
      return {
        ...state,
        isAllModelLoaded: action.payload,
      };
    }
    case SET_ANIM_TYPE: {
      return {
        ...state,
        animType: action.payload,
      };
    }
    case SET_CONFIGURATION_MODEL: {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          model: action.payload,
        },
      };
    }
    case SET_CONFIGURATION_DETAIL: {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          details: action.payload,
        },
      };
    }
    case SET_CONFIGURATION_FABRIC: {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          fabricTex: action.payload,
        },
      };
    }
    case SET_ORBIT_CONTROL: {
      return {
        ...state,
        isOrbitControl: action.payload,
      };
    }
    case UPDATE_OBJECT_NAME: {
      console.log("action.payload", action.payload);
      return {
        ...state,
        objectName: action.payload,
      };
    }
    default:
      return state;
  }
};

export default common3DReducer;
