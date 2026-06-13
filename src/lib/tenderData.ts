export interface Tender {
  id: string;
  title: string;
  ref: string;
  org: string;
  closing: string;
  opening: string;
  value: string;
  location: string;
  category: string;
}

export const latestTenders: Tender[] = [
  {
    id: "T-2026-0421",
    title:
      "Engagement of enlisted Supply Labours for complete cleaning of ash, dust, oil, grease etc. of BTPS B Plant buildings — Bokaro",
    ref: "2600001523",
    org: "Damodar Valley Corporation",
    closing: "19-May-2026 10:00 AM",
    opening: "20-May-2026 10:00 AM",
    value: "₹ 1,28,40,000",
    location: "Bokaro, Jharkhand",
    category: "Services",
  },
  {
    id: "T-2026-0398",
    title: "Job work facility for Pilot scale extraction unit — CSIR-IIIM Jammu",
    ref: "CSIR/IIIM/2026/048",
    org: "Council of Scientific & Industrial Research",
    closing: "22-May-2026 03:00 PM",
    opening: "23-May-2026 11:00 AM",
    value: "₹ 84,00,000",
    location: "Jammu, J&K",
    category: "Works",
  },
  {
    id: "T-2026-0377",
    title:
      "Supply, Installation and Commissioning of 33/11 kV GIS substation equipment package — UPPCL",
    ref: "UPPCL/GIS/2026/77",
    org: "UP Power Corporation Ltd.",
    closing: "28-May-2026 02:00 PM",
    opening: "29-May-2026 11:00 AM",
    value: "₹ 42,15,00,000",
    location: "Lucknow, UP",
    category: "Goods",
  },
  {
    id: "T-2026-0356",
    title:
      "Construction of 4-lane bypass road on NH-44 with structures, drainage and signage — NHAI",
    ref: "NHAI/PIU-NGP/2026/12",
    org: "National Highways Authority of India",
    closing: "30-May-2026 04:00 PM",
    opening: "02-Jun-2026 11:00 AM",
    value: "₹ 286,40,00,000",
    location: "Nagpur, Maharashtra",
    category: "Works",
  },
  {
    id: "T-2026-0341",
    title:
      "Procurement of high-end medical imaging equipment for AIIMS Bhopal — including 3T MRI and 128-slice CT",
    ref: "AIIMS-BPL/MED/2026/19",
    org: "AIIMS Bhopal",
    closing: "03-Jun-2026 05:00 PM",
    opening: "04-Jun-2026 02:00 PM",
    value: "₹ 38,90,00,000",
    location: "Bhopal, MP",
    category: "Goods",
  },
  {
    id: "T-2026-0325",
    title: "Annual Maintenance Contract for IT infrastructure — Ministry of Finance HQ",
    ref: "MoF/IT/AMC/2026/07",
    org: "Ministry of Finance",
    closing: "05-Jun-2026 11:00 AM",
    opening: "06-Jun-2026 11:00 AM",
    value: "₹ 4,20,00,000",
    location: "New Delhi",
    category: "Services",
  },
  {
    id: "T-2026-0312",
    title: "Hiring of vehicles for field officers — Department of Posts, Tamil Nadu Circle",
    ref: "DOP-TN/VEH/2026/03",
    org: "Department of Posts",
    closing: "08-Jun-2026 03:00 PM",
    opening: "09-Jun-2026 11:00 AM",
    value: "₹ 1,80,00,000",
    location: "Chennai, TN",
    category: "Services",
  },
];

export const latestCorrigendums = [
  {
    title: "Pre Bid Commercial Clarifications No.1 dtd 28.04.2026",
    ref: "NIB No.488 dtd 27.02.2026",
    closing: "01-May-2026 02:00 PM",
    opening: "04-May-2026 02:00 PM",
  },
  {
    title: "RFP — Operational support for western region biomass plants",
    ref: "NHLML/WSA/2026/WEST/01/DBOT",
    closing: "09-Jun-2026 03:00 PM",
    opening: "10-Jun-2026 03:30 PM",
  },
  {
    title: "Tender Submission date Extension — ZW7MS26001",
    ref: "ZW7MS26001",
    closing: "21-May-2026 03:00 PM",
    opening: "22-May-2026 03:30 PM",
  },
  {
    title: "NHAI / Pinjore-Baddi-Nalagarh / Addendum-2",
    ref: "NHAI/PIU-CHD/2026/04",
    closing: "12-Jun-2026 11:00 AM",
    opening: "13-Jun-2026 11:00 AM",
  },
];

export const tenderResults = [
  {
    title: "Supply of laboratory consumables — IIT Madras",
    ref: "IITM/CHEM/2026/19",
    awarded: "Sigma Scientific Pvt. Ltd.",
    value: "₹ 88,40,000",
    date: "12-Apr-2026",
  },
  {
    title: "Construction of staff quarters — Indian Railways, NCR",
    ref: "NCR/CON/2026/22",
    awarded: "Bharat Infra Solutions",
    value: "₹ 14,80,00,000",
    date: "08-Apr-2026",
  },
  {
    title: "Cloud hosting services — UIDAI",
    ref: "UIDAI/IT/2026/05",
    awarded: "NextGen Cloud India Ltd.",
    value: "₹ 22,50,00,000",
    date: "02-Apr-2026",
  },
];
