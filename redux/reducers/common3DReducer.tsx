import { AnyAction } from "redux";
import { MENS_ITEM } from "../../components/UI/ConfigurationUI/MensCasualShirt/assets";
import { ClientState, IConfiguration } from "../../interfaces";
import {
  DID_LOAD_FIBER,
  SET_ANIM_TYPE,
  SET_CONFIGURATION_DETAIL,
  SET_CONFIGURATION,
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
    case SET_CONFIGURATION: {
      const configurationObj = (
        payload: any,
        _configuration: IConfiguration | undefined
      ): IConfiguration | undefined => {
        console.log("~payload~~~~~", payload);
        switch (payload?.details) {
          case MENS_ITEM.FABRIC:
            return { ..._configuration, fabricId: payload.configuration };
          case MENS_ITEM.BUTTONS:
            return { ..._configuration, butId: payload.configuration };
          case MENS_ITEM.COLLAR:
            return { ..._configuration, collarId: payload.configuration };
          case MENS_ITEM.CUF:
            return { ..._configuration, cufId: payload.configuration };
          case MENS_ITEM.FIT:
            return { ..._configuration, fitId: payload.configuration };
          case MENS_ITEM.FRONT:
            return { ..._configuration, frontId: payload.configuration };
          case MENS_ITEM.SLEEVE:
            return { ..._configuration, sleeveId: payload.configuration };
          case MENS_ITEM.SHOULDER:
            return { ..._configuration, shoulderId: payload.configuration };
          case MENS_ITEM.COLLAR_STAND:
            return { ..._configuration, collarStandId: payload.configuration };
          case MENS_ITEM.PAINT_COLOR:
            return { ..._configuration, paintId: payload.configuration };
          default:
            return _configuration;
        }
      };

      return {
        ...state,
        configuration: configurationObj(action.payload, state.configuration),
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
