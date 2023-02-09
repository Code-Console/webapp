import { fabricBaseUrl } from "../../../Assets";

export interface ShirtDetail {
  img: string;
  type?: string;
  description?: string;
}
export const configType = [
  {
    img: "900",
    title: "Fit",
  },
  {
    img: "901",
    title: "Febric",
  },
  {
    img: "902",
    title: "Collar",
  },
  {
    img: "903",
    title: "Cuf",
  },
  {
    img: "904",
    title: "Sleeve",
  },
  {
    img: "905",
    title: "Placeket",
  },
  {
    img: "906",
    title: "Pockets",
  },
  {
    img: "907",
    title: "Bottom Cut",
  },
  {
    img: "908",
    title: "Elbow patch",
  },
  {
    img: "90A",
    title: "Contrast",
  },
  {
    img: "90B",
    title: "Embroidery",
  },
  {
    img: "90C",
    title: "Buttons",
  },
  {
    img: "90D",
    title: "Buttons Thread",
  },
  {
    img: "90E",
    title: "Buttons Stitch",
  },
];
export const fabricDetail: ShirtDetail[] = [
  {
    img: `${fabricBaseUrl}Abingdon.jpg`,
    type: `Abingdon`,
    description: `$1.38`,
  },
  { img: `${fabricBaseUrl}Barnet.jpg`, type: `Barnet`, description: `$2.16` },
  {
    img: `${fabricBaseUrl}Belgravia.jpg`,
    type: `Belgravia`,
    description: `$1.30`,
  },
  {
    img: `${fabricBaseUrl}Belgravita.jpg`,
    type: `Belgravita`,
    description: `$3.38`,
  },
  {
    img: `${fabricBaseUrl}Bermondsey.jpg`,
    type: `Bermondsey`,
    description: `$1.58`,
  },
  { img: `${fabricBaseUrl}Brook.jpg`, type: `Brook`, description: `$2.15` },
  { img: `${fabricBaseUrl}Buxton.jpg`, type: `Buxton`, description: `$1.33` },
  { img: `${fabricBaseUrl}Camden.jpg`, type: `Camden`, description: `$1.55` },
  {
    img: `${fabricBaseUrl}Cortwilblue.jpg`,
    type: `Cortwilblue`,
    description: `$1.99`,
  },
  {
    img: `${fabricBaseUrl}Finsbury.jpg`,
    type: `Finsbury`,
    description: `$0.99`,
  },
  {
    img: `${fabricBaseUrl}Fitzroy.jpg`,
    type: `Fitzroy`,
    description: `$1.11`,
  },
  { img: `${fabricBaseUrl}Fulham.jpg`, type: `Fulham`, description: `$2.11` },
  { img: `${fabricBaseUrl}Grind.jpg`, type: `Grind`, description: `$1.85` },
  {
    img: `${fabricBaseUrl}Hanworth.jpg`,
    type: `Hanworth`,
    description: `$1.77`,
  },
  { img: `${fabricBaseUrl}Hoxton.jpg`, type: `Hoxton`, description: `$0.38` },
  {
    img: `${fabricBaseUrl}Pamlico.jpg`,
    type: `Pamlico`,
    description: `$1.18`,
  },
];

export const fitType: ShirtDetail[] = [
  {
    img: "/img/193.jpg",
    type: "Slim Fit",
    description: "Tile description",
  },
  {
    img: "/img/193.jpg",
    type: "Athletic",
    description: "Tile description",
  },
  {
    img: "/img/193.jpg",
    type: "Classic",
    description: "Tile description",
  },
  {
    img: "/img/193.jpg",
    type: "Standard",
    description: "Tile description",
  },
];
