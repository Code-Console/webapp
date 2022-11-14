import { useSelector } from "react-redux";
import { IMainState } from "../../interfaces";

export const useIsAllModelLoadedState = () => {
  const isAllModelLoaded = useSelector(
    (state: IMainState) => state.clientState.isAllModelLoaded
  );

  return isAllModelLoaded;
};
export const useAnimType = () => {
  const animType = useSelector(
    (state: IMainState) =>
      state.clientState.animType// || AnimType.DISPLACEMENT_SHADER
  );
  return animType;
};
