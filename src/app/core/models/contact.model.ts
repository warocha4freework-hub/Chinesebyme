export interface ContactInquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  campId?: string; // Dropdown option
  message: string;
}

export interface ContactInfo {
  lineId: string;
  lineLink: string;
  igId: string;
  igLink: string;
  facebookId: string;
  facebookLink: string;
  tiktokLink: string;
  xLink: string;
  phone: string;
  email: string;
  address: string;
  taxId: string;
}
