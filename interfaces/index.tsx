import { AnyAction } from "redux";
import { IMeetingStats, ParticipantMeetingState } from "./meeting";

declare global {
  interface Window {
    geolocation: any;
    setKey: any;
  }
}

export interface IMeeting {
  meetingId?: string;
  state?: ParticipantMeetingState;
  initialParticipantsInLounge?: string[];
  showLayoutControlButton?: boolean;
  remoteSceneId?: string;
  remoteShowHotSpotName?: string;
  remoteHideHotSpotName?: string;
  remoteProductImageSliderIndex?: number;
  isPresenter?: boolean;
  bridgeChannelOpened?: boolean;
  remotePopupAction?: AnyAction;
  clientDetailPanelParticipantId?: string;
  showClientDetailPanel?: boolean;
  advisorName?: string;
  advisorIdentityId?: string;
  advisorParticipantId?: string;
  dominantSpeakerParticipantId?: string;
  raiseHand?: {
    participantIds?: string[];
    participantInAlert?: string[];
    approved?: boolean;
  };
  stats?: IMeetingStats;
  advisorEndsMeeting?: boolean;
  serverUrl?: string;
  participantControls?: string;
  autoAdmit?: boolean;
  date?: number;
  languageCode?: string;
  statsMode?: boolean;
  joinAt?: number;
  reconnect?: {
    isReconnect?: boolean;
    meetingState?: string;
    isReconnected?: boolean;
    oldParticipantId?: string;
  };
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
  objectName?: string;
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
  AUDITORIUM = "Auditorium",
  POINT_CLOUD = "PointCloud",
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
export enum TouchType {
  touchDown = "touchDown",
  touchMove = "touchMove",
  touchUp = "touchUp",
  pinchStart = "pinchStart",
  pinchMove = "pinchMove",
  wheel = "wheel",
}

export interface ICanvasTouchState {
  type?: string;
  scale?: number;
  isPointerDown?: boolean;
}
