import Head from "next/head";
import React from "react";
import { basePath, ogImg } from "../Assets";
import TagManager from "react-gtm-module";
import { useAnimType } from "../hooks";

const getFavicon = () => `${basePath}images/favicon.ico`;
const HTMLHeader = () => {
  const animationType = useAnimType();
  const [state, setState] = React.useState({ title: "Web/App Developer" });
  React.useEffect(() => {
    const pathname = window?.location?.pathname.includes("/animation");

    const tagManagerArgs = {
      gtmId: "G-Z41JWLH95L",
      events: {
        animationType: pathname ? animationType : "Web/App Developer",
      },
    };
    TagManager.initialize(tagManagerArgs);
    setState((state) => {
      return {
        ...state,
        title: pathname ? animationType : "Web/App Developer",
      };
    });
  }, [animationType]);

  const description =
    "Excellent knowledge of ThreeJS, ReactJS, NodeJS, PhaserJS, and HTML5, including experience with scripting, textures, animation, GUI styles, and particle systems Experience with Application development in Web and App Strong understanding of object-oriented programming Experience";
  return (
    <Head>
      <title>{state.title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={state.title}></meta>
      <meta property="og:description" content={description}></meta>
      <meta property="og:image" content={ogImg}></meta>
      <meta property="og:site_name" content={"yogesh bangar"}></meta>
      <meta name="viewport" content={`width=device-width,initial-scale=1`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={state.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImg} />
      <meta property="twitter:site" content={"yogesh-bangar"}></meta>
      <link rel="shortcut icon" href={getFavicon()} />
      <link rel="apple-touch-icon" href={getFavicon()} />
    </Head>
  );
};

export default HTMLHeader;
