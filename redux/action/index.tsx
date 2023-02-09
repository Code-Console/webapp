import { AnimType, ConfigurationModel } from "../../interfaces";

export const DID_LOAD_FIBER = "DID_LOAD_FIBER";
export const SET_ANIM_TYPE = "SET_ANIM_TYPE";
export const SET_CONFIGURATION_MODEL = "SET_CONFIGURATION_MODEL";
export const SET_CONFIGURATION_DETAIL = "SET_CONFIGURATION_DETAIL";
export const SET_ORBIT_CONTROL = "SET_ORBIT_CONTROL";
export const UPDATE_OBJECT_NAME = "UPDATE_OBJECT_NAME";
export const SET_CONFIGURATION_FABRIC = "SET_CONFIGURATION_FABRIC";
export const actionDeposited = (isLoaded: boolean) => ({
  type: DID_LOAD_FIBER,
  payload: isLoaded,
});
export const actionAnimType = (animType: AnimType) => ({
  type: SET_ANIM_TYPE,
  payload: animType,
});
export const actionConfigurationType = (
  configurationType: ConfigurationModel
) => ({
  type: SET_CONFIGURATION_MODEL,
  payload: configurationType,
});
export const actionConfigurationDetail = (
  configurationDetail: string | undefined
) => ({
  type: SET_CONFIGURATION_DETAIL,
  payload: configurationDetail,
});
export const actionConfigurationFabric = (
  configurationFabric: string | undefined
) => ({
  type: SET_CONFIGURATION_FABRIC,
  payload: configurationFabric,
});
export const actionIsOrbitControl = (isOrbitControl: boolean) => ({
  type: SET_ORBIT_CONTROL,
  payload: isOrbitControl,
});

export const actionUpdateObjectName = (objectName: string) => ({
  type: UPDATE_OBJECT_NAME,
  payload: objectName,
});
