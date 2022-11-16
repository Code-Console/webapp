declare global {
  interface Window {
    geolocation: any;
    setKey: any;
  }
}
export interface IMainState {
  clientState: ClientState;
}
export interface ClientState {
  isAllModelLoaded: boolean;
  animType?: AnimType;
}
export enum MenuItem {
  ABOUT = "About",
  HOME = "Home",
  SEND_CRYPTO = "Send Crypto",
  EXPERTISE = "EXPERTISE",
  CONTACT = "CONTACT",
}
export enum AnimType {
  BIRD = "BIRD",
  WATCH = "WATCH",
  TOY_SHADER = "ToyShader",
  DISPLACEMENT_SHADER = "DisplacementShader",
  SPACE_DUST = "SpaceDust",
  TEXT_DUST_ANIM = "Text Dust Anim",
  MAKERS_FUND = "Makers Fund",
  BlockXYZ = "BlockXYZ",
}
export interface IUser {
  _id: string;
  name?: string;
  email?: string;
}

export interface IShader {
  vertex: string;
  fragment: string;
}
