import { AnimType } from "../../interfaces";

export const DID_LOAD_FIBER = "DID_LOAD_FIBER";
export const SET_ANIM_TYPE = "SET_ANIM_TYPE";
export const SET_ORBIT_CONTROL = "SET_ORBIT_CONTROL";
export const actionDeposited = (isLoaded: boolean) => ({
  type: DID_LOAD_FIBER,
  payload: isLoaded,
});
export const actionAnimType = (animType: AnimType) => ({
  type: SET_ANIM_TYPE,
  payload: animType,
});
export const actionIsOrbitControl = (isOrbitControl: boolean) => ({
  type: SET_ORBIT_CONTROL,
  payload: isOrbitControl,
});
