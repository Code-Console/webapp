import Head from "next/head";
import Image from "next/image";
import FiberCanvas from "../components/Fiber/FiberCanvas";
import Styles from "../components/Styles";
import UI from "../components/UI";
import HTMLHeader from "../components/UI/HTMLHeader";
import { AnimType } from "../interfaces";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <HTMLHeader />
      <FiberCanvas animationType={AnimType.WATCH} />
      <UI />
      <Styles />
    </>
  );
}
