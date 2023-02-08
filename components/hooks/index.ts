import { useSelector } from "react-redux";
import { AnimType, ConfigurationType, IMainState } from "../../interfaces";

export const useIsAllModelLoadedState = () => {
  const isAllModelLoaded = useSelector(
    (state: IMainState) => state.clientState.isAllModelLoaded
  );

  return isAllModelLoaded;
};
export const useConfigurationType = () => {
  const animType = useSelector(
    (state: IMainState) =>
      state.clientState.configurationType || ConfigurationType.MENS_CASUAL_SHIRT
  );
  return animType;
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
