import { IUser } from ".";

/* eslint-disable no-var */
declare global {
  var JitsiMeetJS: any;
}
/* eslint-enable no-var */
export enum DevicePermissionStatus {
  GRANTED = "GRANTED",
  REJECTED = "REJECTED",
  WAITING = "WAITING",
}
export type JitsiConnectionStatus =
  | "active"
  | "inactive"
  | "interrupted"
  | "restoring";
export type JitsiConnection = any;
export type IDevicePermission = Record<
  "audio" | "video",
  DevicePermissionStatus
>;

export interface JitsiMeetingRoom {
  myUserId: () => string | undefined;
  sendEndpointMessage: (recipient: string, message: any) => void;
  selectParticipants: (participantIds: string[]) => void;
  leave: () => Promise<void>;
  setDisplayName: (displayName: string) => void;
  addTrack: (track: JitsiLocalTrack) => Promise<void>;
  on: (event: string, handler: Function) => void;
  off: (event: string, handler: Function) => void;
  getLocalTracks: () => JitsiLocalTrack[];
  setSenderVideoConstraint: (quality: number) => Promise<void>;
  muteParticipant?: (participantId: string) => void;
  kickParticipant?: (participantId: string) => void;
  isModerator?: () => boolean;
  grantOwner?: (participantId: string) => void;
  replaceTrack?: (oldTrack: JitsiTrack, newTrack: JitsiTrack) => Promise<void>;
  setLocalParticipantProperty?: (field: string, value: any) => void;
  getLocalParticipantProperty?: (field: string) => any;
}
export interface JitsiTrack {
  getId: () => string;
  getParticipantId: () => string;
  isMuted: () => boolean;
  attach: (container: any) => void;
  detach: (container: any) => void;
  isActive: () => boolean;
  getType: () => "video" | "audio";
  getOriginalStream: () => any;
  isVideoTrack?: () => boolean;
  isAudioTrack?: () => boolean;
  videoType?: "camera" | "desktop";
  stream?: MediaStream;
  track?: MediaStreamTrack;
}

export interface JitsiParticipant {
  getConnectionStatus?: () => string;
  _role?: string;
}

export interface JitsiLocalTrack extends JitsiTrack {
  mute: () => Promise<void>;
  unmute: () => Promise<void>;
  dispose: () => Promise<void>;
  addEventListener: (event: string, handler: Function) => void;
  getDeviceId: () => string;
  on?: (event: string, callback: Function) => void;
  //apply effect by swapping out the existing MediaStream on jisti track
  //pass undefined to remove the effect and restore the o.g MediaStream
  setEffect?: (effect: any | undefined) => any;
}
export interface ConfState {
  jitsiLocalTrack: JitsiLocalTrack[];
}
export enum MeetingRole {
  ADVISOR = "ADVISOR",
  CO_ADVISOR = "CO_ADVISOR",
  CLIENT = "CLIENT",
  MC = "MC",
  STUDIO = "STUDIO",
}
export interface IBandWidthStats {
  download: number | typeof NaN;
  upload: number | typeof NaN;
}
interface IPacketLoss extends IBandWidthStats {
  total: number;
}

interface IBitrate extends IBandWidthStats {
  audio?: IBandWidthStats;
  video?: IBandWidthStats;
}
export interface IMeetingStats {
  maxEnabledResolution?: number;
  resolution?: {
    [key: string]: {
      [key: string]: {
        height: number;
        width: number;
      };
    };
  };
  codec?: {
    [key: string]: {
      [key: string]: {
        audio: string;
        video: string;
      };
    };
  };
  framerate?: {
    [key: string]: {
      [key: string]: number;
    };
  };
  bitrate?: IBitrate;
  packetLoss?: IPacketLoss;
  bandwidth?: IBandWidthStats;
  bridgeCount?: number;
  connectionQuality?: number;
}
export type JitsiRemoteTrack = JitsiTrack;
export interface IMeetingRemoteUsers {
  [key: string]: {
    identityId?: string;
    role?: MeetingRole;
    audioLevel?: number;
    audioMuted?: boolean;
    videoMuted?: boolean;
    ready?: boolean;
    displayName?: string;
    tracks?: JitsiRemoteTrack[];
    connectionStatus?: JitsiConnectionStatus;
    jitsiUser?: JitsiParticipant;
    shouldShowVideo?: boolean;
    stats?: IMeetingStats;
  };
}

export interface JitsiDevice {
  deviceId?: string;
  groupId?: string;
  kind?: string;
  label?: string;
}

export interface ActiveDevices {
  microphone?: string;
  speaker?: string;
  camera?: string;
}

export interface JitsiVideoTrackEffect {
  backgroundType: "blur" | "image" | "desktop-share" | "none";
  enabled: boolean;
  blurValue?: number;
  selectedThumbnail?: string;
  url?: string;
  backgroundEffectEnabled?: boolean;
}

export interface IMeetingLocalUser {
  participantId?: string;
  role?: MeetingRole;
  audioLevel?: number;
  audioMuted?: boolean;
  lastAudioMuted?: boolean;
  videoMuted?: boolean;
  tracks?: JitsiLocalTrack[];
  availableDevices?: JitsiDevice[];
  activeDevices?: ActiveDevices;
  isInputChangeAvailable?: boolean;
  isOutputChangeAvailable?: boolean;
  kickedOut?: boolean;
  videoEffect?: {
    showDialog?: boolean;
    effect?: JitsiVideoTrackEffect | undefined;
  };
  devicePermission?: {
    audio?: DevicePermissionStatus;
    video?: DevicePermissionStatus;
  };
  isSharingScreen?: boolean;
  isOnPresenterMode?: boolean;
}
export enum DisconnectReason {
  LANDING_TIMEOUT = "LANDING_TIMEOUT",
  USER_INACTIVITY = "USER_INACTIVITY",
  PING_TIMEOUT = "PING_TIMEOUT",
  MEETING_END = "MEETING_END",
  UNKNOWN = "UNKNOWN",
}
export const createUser = ({
  identityId,
  name,
  email = "",
}: {
  identityId: string;
  name: string;
  email?: string;
}): IUser => ({
  id: identityId,
  name: name,
  email: email,
});
export enum ParticipantMeetingState {
  IN_THE_LOUNGE = 'IN_THE_LOUNGE',
  SHOW_WELCOME_VIDEO = 'SHOW_WELCOME_VIDEO',
  ENTERED_FROM_LOUNGE = 'ENTERED_FROM_LOUNGE',
  LEFT_MEETING = 'LEFT_MEETING'
}
export enum MeetingLayoutMode {
  NORMAL = 'NORMAL',
  TILE = 'TILE',
  PRESENTATION = 'PRESENTATION'
}
export interface MeetingLayout {
  mode?: MeetingLayoutMode;
  presenterIds?: string[];
  enlargedVideoParticipantId?: string;
  invisibleParticipantIds?: string[];
  pinnedParticipantIds?: string[];
  hideControls?: boolean;
  playerStatusParticipantIds?: string[];
}