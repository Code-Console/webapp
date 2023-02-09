import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import Configuration3D from "../components/Fiber/Configuration";
import { useConfigurationType, useIsOrbitControl } from "../components/hooks";
import Styles from "../components/Styles";
import MensCasualShirtUI from "../components/UI/ConfigurationUI/MensCasualShirt";
import HTMLHeader from "../components/UI/HTMLHeader";
import { ConfigurationModel } from "../interfaces";
import { actionConfigurationType, actionIsOrbitControl } from "../redux/action";

const Configuration = () => {
  const configurationModel = useConfigurationType();
  const isOrbitControl = useIsOrbitControl();
  const router = useRouter();
  const dispatch = useDispatch();
  const getUI = () => {
    switch (configurationModel) {
      case ConfigurationModel.MENS_CASUAL_SHIRT:
        return <MensCasualShirtUI />;
    }
    return null;
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [configurationModel]);
  console.log("isOrbitControl~~~~~~~~~", isOrbitControl);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(router);
      const configurationType = router?.query?.type as ConfigurationModel;
      const orbitControl = router?.query?.orbit;
      if (configurationType)
        dispatch(actionConfigurationType(configurationType));
      if (orbitControl) dispatch(actionIsOrbitControl(orbitControl === "true"));
    }
  }, [router]);
  return (
    <>
      <HTMLHeader />
      {getUI()}
      <Configuration3D
        configurationType={configurationModel}
        isOrbitControl={isOrbitControl}
      />
      <Styles />
    </>
  );
};

export default Configuration;
