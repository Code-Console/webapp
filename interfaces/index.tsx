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
