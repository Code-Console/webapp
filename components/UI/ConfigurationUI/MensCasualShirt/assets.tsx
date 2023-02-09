import { fabricBaseUrl } from "../../../Assets";

export interface ShirtDetail {
  img: string;
  type?: string;
  description?: string;
  id: string;
}
export enum MENS_ITEM {
  FIT = "Fit",
  FABRIC = "Fabric",
  COLLAR = "Collar",
  CUF = "Cuf",
  BUTTONS = "Buttons",
  FRONT = "Front",
  SLEEVE = "Sleeve",
  SHOULDER = "Shoulder",
  COLLAR_STAND = "Collar stand",
}
export const configType = [
  {
    img: "900",
    title: MENS_ITEM.FIT,
  },
  {
    img: "901",
    title: MENS_ITEM.FABRIC,
  },
  {
    img: "902",
    title: MENS_ITEM.COLLAR,
  },
  {
    img: "903",
    title: MENS_ITEM.CUF,
  },
  {
    img: "90C",
    title: MENS_ITEM.BUTTONS,
  },
  {
    img: "904",
    title: MENS_ITEM.SLEEVE,
  },
  {
    img: "905",
    title: MENS_ITEM.FRONT,
  },
  {
    img: "907",
    title: MENS_ITEM.SHOULDER,
  },
  {
    img: "90A",
    title: MENS_ITEM.COLLAR_STAND,
  },
  // {
  //   img: "906",
  //   title: "Pockets",
  // },
  // {
  //   img: "908",
  //   title: "Elbow patch",
  // },
  // {
  //   img: "90A",
  //   title: "Contrast",
  // },
  // {
  //   img: "90B",
  //   title: "Embroidery",
  // },
  // {
  //   img: "90D",
  //   title: "Buttons Thread",
  // },
  // {
  //   img: "90E",
  //   title: "Buttons Stitch",
  // },
];
export const fabricDetail: ShirtDetail[] = [
  {
    img: `${fabricBaseUrl}Abingdon.jpg`,
    type: `Abingdon`,
    description: `$1.38`,
    id: "fab01",
  },
  {
    img: `${fabricBaseUrl}Barnet.jpg`,
    type: `Barnet`,
    description: `$2.16`,
    id: "fab02",
  },
  {
    img: `${fabricBaseUrl}Belgravia.jpg`,
    type: `Belgravia`,
    description: `$1.30`,
    id: "fab03",
  },
  {
    img: `${fabricBaseUrl}Belgravita.jpg`,
    type: `Belgravita`,
    description: `$3.38`,
    id: "fab04",
  },
  {
    img: `${fabricBaseUrl}Bermondsey.jpg`,
    type: `Bermondsey`,
    description: `$1.58`,
    id: "fab05",
  },
  {
    img: `${fabricBaseUrl}Brook.jpg`,
    type: `Brook`,
    description: `$2.15`,
    id: "fab06",
  },
  {
    img: `${fabricBaseUrl}Buxton.jpg`,
    type: `Buxton`,
    description: `$1.33`,
    id: "fab07",
  },
  {
    img: `${fabricBaseUrl}Camden.jpg`,
    type: `Camden`,
    description: `$1.55`,
    id: "fab08",
  },
  {
    img: `${fabricBaseUrl}Cortwilblue.jpg`,
    type: `Cortwilblue`,
    description: `$1.99`,
    id: "fab09",
  },
  {
    img: `${fabricBaseUrl}Finsbury.jpg`,
    type: `Finsbury`,
    description: `$0.99`,
    id: "fab10",
  },
  {
    img: `${fabricBaseUrl}Fitzroy.jpg`,
    type: `Fitzroy`,
    description: `$1.11`,
    id: "fab11",
  },
  {
    img: `${fabricBaseUrl}Fulham.jpg`,
    type: `Fulham`,
    description: `$2.11`,
    id: "fab12",
  },
  {
    img: `${fabricBaseUrl}Grind.jpg`,
    type: `Grind`,
    description: `$1.85`,
    id: "fab13",
  },
  {
    img: `${fabricBaseUrl}Hanworth.jpg`,
    type: `Hanworth`,
    description: `$1.77`,
    id: "fab14",
  },
  {
    img: `${fabricBaseUrl}Hoxton.jpg`,
    type: `Hoxton`,
    description: `$0.38`,
    id: "fab15",
  },
  {
    img: `${fabricBaseUrl}Pamlico.jpg`,
    type: `Pamlico`,
    description: `$1.18`,
    id: "fab16",
  },
];

export const fitType: ShirtDetail[] = [
  {
    img: "/img/193.jpg",
    type: "Slim Fit",
    description: "Tile description",
    id: "fit01",
  },
  {
    img: "/img/193.jpg",
    type: "Athletic",
    description: "Tile description",
    id: "fit02",
  },
  {
    img: "/img/193.jpg",
    type: "Classic",
    description: "Tile description",
    id: "fit03",
  },
  {
    img: "/img/193.jpg",
    type: "Standard",
    description: "Tile description",
    id: "fit04",
  },
];
