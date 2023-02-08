import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import Configuration3D from "../components/Fiber/Configuration";
import { useConfigurationType, useIsOrbitControl } from "../components/hooks";
import Styles from "../components/Styles";
import MensCasualShirtUI from "../components/UI/ConfigurationUI/MensCasualShirtUI";
import HTMLHeader from "../components/UI/HTMLHeader";
import { ConfigurationType } from "../interfaces";
import { actionConfigurationType, actionIsOrbitControl } from "../redux/action";

const Configuration = () => {
  const configurationType = useConfigurationType();
  const isOrbitControl = useIsOrbitControl();
  const router = useRouter();
  const dispatch = useDispatch();
  const getUI = () => {
    switch (configurationType) {
      case ConfigurationType.MENS_CASUAL_SHIRT:
        return <MensCasualShirtUI />;
    }
    return null;
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [configurationType]);
  console.log("isOrbitControl~~~~~~~~~", isOrbitControl);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(router);
      const configurationType = router?.query?.type as ConfigurationType;
      const orbitControl = router?.query?.orbit;
      if (configurationType)
        dispatch(actionConfigurationType(configurationType));
      if (orbitControl) dispatch(actionIsOrbitControl(orbitControl === "true"));
      // dispatch(actionConfigurationType(configurationType));
      // setTimeout(() => {
      //   const isOrbit = orbitControl !== undefined;
      //   dispatch(actionIsOrbitControl(isOrbit));
      //   console.log('isOrbit ',isOrbit);
      // }, 100);
    }
  }, [router]);
  return (
    <>
      <HTMLHeader />
      {getUI()}
      <Configuration3D
        configurationType={configurationType}
        isOrbitControl={isOrbitControl}
      />
      <Styles />
    </>
  );
};

export default Configuration;
