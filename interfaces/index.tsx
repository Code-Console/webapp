import { IMeetingLocalUser, IMeetingRemoteUsers } from "./meeting";

declare global {
  interface Window {
    geolocation: any;
    setKey: any;
  }
}

export interface IMeeting {
  meetingId?: string;
  localUser?: IMeetingLocalUser;
  remoteUsers?: IMeetingRemoteUsers;
  isPresenter?: boolean;
}
export interface IMainState {
  clientState: ClientState;
}
export interface ClientState {
  isAllModelLoaded: boolean;
  animType?: AnimType;
  isOrbitControl?: boolean;
  meeting: IMeeting;
  user?: IUser;
}
export enum MenuItem {
  ABOUT = "About",
  HOME = "Home",
  SEND_CRYPTO = "Send Crypto",
  EXPERTISE = "EXPERTISE",
  CONTACT = "CONTACT",
}
export enum AnimType {
  MAKERS_FUND = "Makers Fund",
  BlockXYZ = "Block XYZ",

  REVEAL = "Reveal",
  BIRD = "Bird",
  WATCH = "Watch",
  TOY_SHADER = "Toy Shader",
  DISPLACEMENT_SHADER = "Displacement Shader",
  SPACE_DUST = "Space Dust",
  TEXT_DUST_ANIM = "Text Dust Anim",
  YogForm = "Yog Form",
  TEXT_STRACE = "Text Strace",
  FACE_SELECTION = "Face Selection",
  STRIP_GLOBE = "Strip Globe",
  LEGENDARY = "Legendary",
}

export interface IUser {
  id: string;
  name?: string;
  email?: string;
}

export interface IShader {
  vertex: string;
  fragment: string;
}
