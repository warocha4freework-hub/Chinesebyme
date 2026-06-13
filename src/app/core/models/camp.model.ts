export interface Camp {
  id: string;
  name: string;      // e.g., "รอบตุลาคม | ระยะ 2 สัปดาห์"
  type: 'summer' | 'autumn' | 'winter';
  title: string;     // e.g., "AUTUMN CAMP"
  duration: string;  // e.g., "2 สัปดาห์"
  startDate: string; // e.g., "11 ตุลาคม 2026"
  endDate: string;   // e.g., "24 ตุลาคม 2026"
  registrationRange: string; // e.g., "วันนี้ - 31 ก.ค. 2026"
  status: 'open' | 'closed' | 'filled';
  statusText: string; // e.g., "เปิดรับสมัคร วันนี้ - 31 ก.ค. 2026" or "ปิดรับสมัครแล้ว"
  price?: number;     // e.g., 48900
  originalPrice?: number; // e.g., 52900
}

export interface DormAmenity {
  name: string;
  available: boolean;
}

export interface DormRoom {
  id: string;
  name: string;
  images: string[];
  description: string;
}

export interface ProjectDetail {
  includes: string[];
  excludes: string[];
}

export interface AdsBanner {
  tagline: string;
  title: string;
  price: number;
  originalPrice: number;
  badgeLabel: string;
  discountText: string;
  rounds: { name: string; deadline: string; }[];
  ctaText: string;
  backgroundImageUrl: string;
}
