import { useSelector } from "react-redux";
import { AnimType, ConfigurationModel, IMainState } from "../../interfaces";

export const useIsAllModelLoadedState = () => {
  const isAllModelLoaded = useSelector(
    (state: IMainState) => state.clientState.isAllModelLoaded
  );

  return isAllModelLoaded;
};
export const useConfigurationType = () => {
  const type = useSelector(
    (state: IMainState) =>
      state.clientState.configuration?.model ||
      ConfigurationModel.MENS_CASUAL_SHIRT
  );
  return type;
};
export const useConfigurationDetail = () => {
  const detail = useSelector(
    (state: IMainState) => state.clientState.configuration?.details
  );
  return detail;
};
export const useConfiguration = () => {
  const configuration = useSelector(
    (state: IMainState) => state.clientState.configuration
  );
  return configuration;
};

export const useAnimType = () => {
  const animType = useSelector(
    (state: IMainState) => state.clientState.animType || AnimType.MAKERS_FUND
  );
  return animType;
};

export const useIsOrbitControl = () => {
  const isAllModelLoaded = useSelector(
    (state: IMainState) => state.clientState.isOrbitControl
  );
  return isAllModelLoaded;
};
export const useObjectName = () => {
  return useSelector((state: IMainState) => state.clientState.objectName);
};
