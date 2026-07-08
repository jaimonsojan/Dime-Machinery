export interface Product {
  name: string;
  items: string[];
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  products: string[];
  specs?: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

export interface ValItem {
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export interface StepItem {
  step: string;
  title: string;
  details: string[];
}

export interface ProjectItem {
  customer: string;
  scope: string;
}

export const BRAND_COLORS = {
  primaryYellow: '#ffcc33',  // From branding manual: Hex #ffcc33 / #ffb72d
  darkGrey: '#2b2b2b',       // From branding: RGB #2b2b2b / #333333
  darkBg: '#1a1a1a',
  accentOrange: '#ff9900'
};

export const CAPACITY_STATS: StatItem[] = [
  { value: '150+', label: 'Cargo Bodies & Specialty Fabrication', subtext: 'Units / Year' },
  { value: '150+', label: 'Equipment Tankers Fabrication', subtext: 'Units / Year' },
  { value: '1200+', label: 'Garbage Skip Bins & Containers', subtext: 'Units / Year' },
  { value: '180+', label: 'Trailer Fabrication (Flatbeds & Tippers)', subtext: 'Trailers / Year' },
  { value: '2000+', label: 'Maintenance & Overhaul Services', subtext: 'Heavy Equipment Units / Year' }
];

export const CORE_VALUES: ValItem[] = [
  { title: 'Integrity & Accountability', description: 'Uphold honesty and accountability in every interaction, delivering every job with the promised quality, safety, and reliability.' },
  { title: 'Safety & Reliability', description: 'Uphold strict HSE standards to ensure safety and reliable performance in all conditions.' },
  { title: 'Excellence in Execution', description: 'Strive for excellence in every task, delivering durable, high-performance solutions through disciplined planning and strict standards.' },
  { title: 'Customer-Centric Solutions', description: 'Put our customers at the center, delivering tailored solutions that minimize downtime and create real value.' },
  { title: 'Innovation & Continuous Improvement', description: 'Adopt advanced technology and best practices to continuously improve quality, efficiency, and safety.' },
  { title: 'Teamwork & Collaboration', description: 'Believe in cross-functional collaboration, delivering integrated, one-stop solutions across maintenance, fabrication, and manufacturing.' }
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'waste',
    title: 'Waste Management Equipment',
    description: 'Engineered for uncompromising durability and high-volume waste transport. Our heavy-duty systems provide efficient collection and disposal solutions conforming strictly to QCS 2014 standards.',
    products: ['Skip Boxes (3 CBM to 12 CBM)', 'RO-RO Skip Boxes (12 CBM to 25 CBM)', 'Static Compactors (10 CBM to 20 CBM)', 'Refuse Collection Vehicles (6 CBM to 24 RCV)', 'Tippers (4 CBM to 28 CBM)', 'Garbage Bins & Waste Containers', 'Skip Loaders (12 CBM Single / 24 CBM Twin)'],
    iconName: 'Trash2',
    specs: 'ASTM A36/275JR Mild Steel, 4-6mm bottom plates, JIS channels & robust hydraulics.'
  },
  {
    id: 'transport',
    title: 'Transport & Logistics Equipment',
    description: 'Exceptionally versatile semi-trailers engineered to haul everything from standard palletized cargo to intermodal shipping containers and oversized heavy machinery.',
    products: ['Flatbed Trailers (Length 12.5m x Width 2.5m)', 'Low Bed Trailers (32 to 60 Tons carrying capacity)', 'Skeleton Trailers (20ft & 40ft container locks)', 'Turn Table Trailers (steering mechanism drawings)', 'Cargo Bodies (Open & Box type platform lengths)', 'Trolleys (Manual push/pull & mechanically towable)', 'TMA & PRU Units (Crash-absorbent safety protection vehicles)'],
    iconName: 'Truck',
    specs: 'ST 52-3 hot rolled I-beams, 4-8mm chequered flooring plates, WABCO braking, Jost landing gear.'
  },
  {
    id: 'liquid',
    title: 'Liquid Handling & Utility Vehicles',
    description: 'Multi-role liquid tankers optimized for the sanitary transport of potable water, chemicals, petroleum products, and high-pressure industrial vacuum extraction.',
    products: ['Water Tankers (2,000 to 5,500 Imperial Gallons)', 'Chemical Tankers (SS316/SS304 Hazmat rated)', 'Fuel Tankers (certified petroleum road transport)', 'Multipurpose Tanks (custom layout dual-fluid capabilities)', 'Vacuum Tanks (high-suction waste extraction)', 'Cement Bulkers (25 CBM dry bulk pneumatic discharge)'],
    iconName: 'Droplet',
    specs: 'Galvanized steel shells, anti-surge baffles, Jotun Penguard food-grade epoxies, PFA/PTFE valves.'
  },
  {
    id: 'fuel',
    title: 'Fuel Storage & Handling',
    description: 'Compact, robust, and mobile fuel deployment systems engineered for rapid site supply, off-grid equipment refueling, and maximum environment containment safety.',
    products: ['Fuel Bowsers (1,000 to 5,000 Liters with integrated pump)', 'Oil Storage Tanks (5,000 and 8,000 Liters above-ground)', 'Portable Fuel Cubes (double-walled bunded structures)'],
    iconName: 'Fuel',
    specs: 'Double-walled bunded containment steel, forklift pockets, lockable tamper-proof pump cabinets.'
  },
  {
    id: 'access',
    title: 'Access & Loading Infrastructure',
    description: 'Architecturally sound worksite structures engineered to grant personnel safe, stable, and elevated access to high-bay machinery and storage environments.',
    products: ['Work Platforms (anti-slip steel/aluminum grating)', 'Loading Ramps (mobile yard or permanent fixed-dock)', 'Industrial Access Ladders (safety-caged and uncaged)', 'Stair Towers (modular multi-level pedestrian channel structures)'],
    iconName: 'Layers',
    specs: 'OSHA-compliant handrails & toe boards, high-traction structural profiles, adjustable height cylinders.'
  },
  {
    id: 'emergency',
    title: 'Emergency & Support Vehicles',
    description: 'High-performance, hydraulically articulated recovery and support assets engineered to execute rapid, safe towing and roadside breakdown management.',
    products: ['Breakdown Recovery Units (3-ton to 20-ton platforms with tilt/slide mechanisms)'],
    iconName: 'ShieldAlert',
    specs: 'ASTM A36/275JR platform deck, 5mm chequered plate, heavy-duty hydraulic winch (16mm x 20m wire rope).'
  },
  {
    id: 'site',
    title: 'Site Facilities & Temporary Structures',
    description: 'Premium prefabricated climate-controlled structures designed to instantly deploy comfortable office, residential, or security spaces to remote infrastructure zones.',
    products: ['Portable Cabins (Polyurethane/EPS insulation panel)', 'Portable Toilets (self-contained FRP ablation blocks)', 'Security Huts (360-degree observation guard houses)', 'Storage Containers (corrugated Corten steel secure units)', 'Light Towers (telescopic mast diesel-generator illuminated units)'],
    iconName: 'Home',
    specs: 'Corrugated high-strength Corten steel, pre-wired HVAC provisions, heavy-duty steel base chassis.'
  },
  {
    id: 'safety',
    title: 'Safety & Environmental Assets',
    description: 'Unmissable regulatory and hazard assets engineered to protect worksites, delineate boundaries, and provide urgent chemical exposure relief.',
    products: ['Safety Barriers (concrete/water-filled plastic blocks)', 'Safety Signs (engineering-grade reflective sheets)', 'Eyewash Stations (OSHA compliance instant-activation relief)'],
    iconName: 'Shield',
    specs: 'OSHA-compliant eyewash basins, reflective grade sheet backing, high-visibility warning colors.'
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'plant-maint',
    title: 'Plant & Machinery Maintenance',
    subtitle: 'Industrial Diagnostics & Servicing',
    description: 'Comprehensive mechanical, electrical, and preventative maintenance for heavy industrial machinery including CNC equipment, conveyors, mixers, pumps, and production assemblies.',
    items: ['Routine inspections to detect early wear & tear', 'Mechanical & electrical diagnostics', 'Component replacement using high-quality parts', 'Calibration & alignment for optimal performance']
  },
  {
    id: 'conveyor',
    title: 'Conveyor & Cooling Tower Work',
    subtitle: 'System Overhauls & Specialist Stainless Steel Work',
    description: 'On-site conveyor system alignment, belt splicing/replacement, drive maintenance, and specialist SS work for cooling towers including descaling, scale mitigation, and leak sealing.',
    items: [
      "Conveyor belt alignment & replacement",
      "Gearbox & motor diagnostics",
      "Cooling tower SS cleaning & descaling",
      "Pump & fan system mechanical repairs"
    ]
  },
  {
    id: 'heavy-veh',
    title: 'Heavy Vehicle & Electrical Maintenance',
    subtitle: 'Commercial Truck & Fleet Support',
    description: 'Expert diagnostics, diesel engine overhaul, brake inspections, suspension tuning, wiring harness rewiring, charging systems, starter motor replacement, and ECU calibration.',
    items: ['Engine diagnostics & mechanical repairs', 'ECU & electronic system diagnostics', 'Wiring harness inspection & on-site rewiring', 'Brake checks, transmission & driveline overhauls']
  },
  {
    id: 'hydraulic',
    title: 'Hydraulic Maintenance & Servicing',
    subtitle: 'High-Pressure Precision Repairs',
    description: 'Professional troubleshooting and overhaul of hydraulic systems, including cylinder honing, piston and rod seal replacement, pump diagnostics, valve servicing, and leak detection.',
    items: ['Piston and rod seal replacement', 'Hydraulic system pressure tests & calibration', 'Cylinder rod inspection & minor scratch polishing', 'Fluid contamination control & preventative care']
  },
  {
    id: 'welding',
    title: 'Welding, Machining & Bespoke Fabrication',
    subtitle: 'Precision Engineering & Custom Solutions',
    description: 'MIG, TIG, and arc welding services for metal structural reinforcement. Bespoke parts fabrication using high-tolerance CNC milling, lathe turning, and complete engineering review.',
    items: ['Heavy-duty structural reinforcement welding', 'Bespoke repair fabrication for non-standard equipment', 'CNC milling & high-tolerance lathe turning', '3D modeling & design validation before build']
  },
  {
    id: 'surface',
    title: 'Surface Preparation & Industrial Painting',
    subtitle: 'Hazmat-Grade Coating & Finishing',
    description: 'Sandblasting (SA 2.5/SA 3) and spray painting using premium epoxy, polyurethane, and zinc-rich coatings to deliver long-lasting corrosion protection in harsh GCC environments.',
    items: ['Abrasive sandblasting & surface cleaning', 'Multi-coat epoxy & polyurethane spray painting', 'Dry Film Thickness (DFT) testing & QA certification', 'Marine & offshore anti-corrosive treatments']
  }
];

export const QAQC_STEPS: StepItem[] = [
  {
    step: '01',
    title: 'QA Planning & Document Review',
    details: ['Review custom blueprints & customer drawings', 'Prepare Project Quality Plan (PQP) & Inspection Test Plan (ITP)', 'Verify qualifications of certified welders & NDT operators']
  },
  {
    step: '02',
    title: 'Material Receipt & Traceability',
    details: ['Inspect incoming steel plates, sections, and hydraulics', 'Verify material grades & Mill Test Certificates (MTC)', 'Log & mark each material batch to maintain continuous traceability']
  },
  {
    step: '03',
    title: 'Fit-Up & Dimensional Inspection',
    details: ['Inspect fit-up of subframes and chassis mounting brackets', 'Perform thorough dimension, squareness, and alignment checks', 'Rectify any deviations immediately prior to welding engagement']
  },
  {
    step: '04',
    title: 'Welding & NDT Inspection',
    details: ['Monitor welding parameters in accordance with approved WPS', 'Conduct 100% visual inspection of completed weld joints', 'Carry out Non-Destructive Testing (VT/PT/MT/UT) with logged results']
  },
  {
    step: '05',
    title: 'Body Shell & Assembly Inspection',
    details: ['Inspect panel thickness and structural forming accuracy', 'Verify proper assembly of doors, locks, ladders, and hinges', 'Confirm hydraulic cylinder mountings & safety structural integrations']
  },
  {
    step: '06',
    title: 'Surface Prep & Painting Verification',
    details: ['Ensure sandblasting conforms strictly to SA 2.5/SA 3 profiles', 'Verify primer and top-coat applications match specifications', 'Measure dry film thickness (DFT) & verify coating continuity']
  },
  {
    step: '07',
    title: 'Functional Testing & Final Inspection',
    details: ['Perform final dimensional validation against master drawing', 'Conduct active hydraulic, pressure, and electrical loop tests', 'Test moving components under simulated heavy operating loads']
  },
  {
    step: '08',
    title: 'NCR Control & Handover Pack',
    details: ['Ensure all non-conformances (NCR) are fully corrected and closed', 'Compile the full QA/QC document dossier (MTC, NDT, and test sheets)', 'Acquire official client sign-off and formal asset handover']
  }
];

export const COMPLETED_PROJECTS: ProjectItem[] = [
  { customer: 'Elegancia Imar Lavajet JV', scope: 'Fabrication & supply of 20 CBM horizontal static compactors, 12-ton recovery beds, and skip boxes' },
  { customer: 'Gulf Asia Contracting W.L.L', scope: 'Fabrication, painting, and electrical of Skip Loaders (Double Skip type, 7m3) and multi-unit 4500 Gln Sweet Water Tank units' },
  { customer: 'Pacific International', scope: 'Fabrication of multi-purpose 5000 USG sewage vacuum tanks & 2000 USG sweet water tanks' },
  { customer: 'Triad Equipment Rental W.L.L', scope: 'Custom fabrication, sandblasting, and electrical assembly of 5500 Gallon sewage vacuum tanks' },
  { customer: 'Al Doha Maintenance & Services', scope: 'Specialist fabrication of custom Hardox plate brackets for industrial screw conveyors' },
  { customer: 'Al Hamad Automobiles Co. W.L.L', scope: '7-Meter heavy cargo body fabrication including structural chassis extensions' },
  { customer: 'Mosanada Facilities Management', scope: 'Compactor conveyor belt replacement and heavy-duty scissor lift hydraulic cylinder overhaul' },
  { customer: 'Ali Bin Naser Al Misnad Transport', scope: '120 units of 2300-Liter fuel storage tanks (5mm thickness) built to Woqod regulations' },
  { customer: 'Jaidah Motors & Trading Co.', scope: '12-Ton breakdown recovery unit body builds and full electrical/hydraulic installation' }
];
