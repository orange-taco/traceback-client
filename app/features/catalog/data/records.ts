export type ArchiveEntry = {
  id: string;
  entryNumber: string;
  title: string;
  date: string;
  time: string;
  route: string;
  location: {
    lat: string;
    lng: string;
  };
  status: string;
  tags: string[];
  image: string;
  fileName: string;
};

export type Product = {
  slug: string;
  entryId: string;
  name: string;
  category: string;
  color: string;
  season: "SS" | "FW";
  gender: "MALE" | "FEMALE";
  priceLabel: string;
  status: "AVAILABLE" | "COMING SOON" | "SOLD OUT";
  sizes: string[];
  printData: string;
};

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "entry-001",
    entryNumber: "ENTRY_001",
    title: "PUBLIC TRANSPORT / PARTIAL RECOGNITION",
    date: "2026-05-10",
    time: "18:43:22",
    route: "LINE 4",
    location: {
      lat: "37.476865372 N",
      lng: "126.981594562 E",
    },
    status: "SIGNAL PARTIAL",
    tags: ["PUBLIC TRANSPORT", "PARTIAL RECOGNITION", "LINE 4"],
    image: "/records/entry-001.jpeg",
    fileName: "KakaoTalk_Photo_2026-05-10-16-29-17 001.jpeg",
  },
  {
    id: "entry-002",
    entryNumber: "ENTRY_002",
    title: "LOW RES OUTPUT / INTERIOR",
    date: "2026-05-10",
    time: "18:44:03",
    route: "LINE 4",
    location: {
      lat: "37.476865372 N",
      lng: "126.981594562 E",
    },
    status: "LOW RES OUTPUT",
    tags: ["TRANSIT", "LOW RES", "PRINT SOURCE"],
    image: "/records/entry-002.jpeg",
    fileName: "KakaoTalk_Photo_2026-05-10-16-29-17 002.jpeg",
  },
  {
    id: "entry-003",
    entryNumber: "ENTRY_003",
    title: "PARTIAL TRACE / IMAGE TEST",
    date: "2026-05-10",
    time: "18:45:11",
    route: "LINE 4",
    location: {
      lat: "37.476865372 N",
      lng: "126.981594562 E",
    },
    status: "PARTIAL TRACE",
    tags: ["HALFTONE", "OUTPUT", "TRACE"],
    image: "/records/entry-003.png",
    fileName: "KakaoTalk_Photo_2026-05-10-16-29-19 003.png",
  },
];

export const products: Product[] = [
  {
    slug: "misseen-001-tshirt",
    entryId: "entry-001",
    name: "MISSEEN_001 T-SHIRT",
    category: "T-SHIRT",
    color: "BLACK",
    season: "SS",
    gender: "MALE",
    priceLabel: "KRW 00,000",
    status: "AVAILABLE",
    sizes: ["S", "M", "L", "XL"],
    printData: "SMALL BOX PRINT / LOWER FRONT / PARTIAL OUTPUT",
  },
  {
    slug: "misseen-002-tshirt",
    entryId: "entry-002",
    name: "MISSEEN_002 T-SHIRT",
    category: "T-SHIRT",
    color: "WHITE",
    season: "SS",
    gender: "MALE",
    priceLabel: "TBD",
    status: "COMING SOON",
    sizes: ["S", "M", "L", "XL"],
    printData: "SMALL BOX PRINT / TEST PLACEMENT",
  },
];

export function getEntryById(id: string) {
  return archiveEntries.find((entry) => entry.id === id);
}

export function getEntryByNumber(entryNumber: string) {
  return archiveEntries.find(
    (entry) => entry.entryNumber.toLowerCase() === entryNumber.toLowerCase(),
  );
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductEntry(product: Product) {
  return getEntryById(product.entryId);
}
