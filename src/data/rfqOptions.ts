export const SIZE_OPTIONS = [
  { value: '1/2"', label: '1/2" (DN15)' },
  { value: '3/4"', label: '3/4" (DN20)' },
  { value: '1"', label: '1" (DN25)' },
  { value: '1.5"', label: '1.5" (DN40)' },
  { value: '2"', label: '2" (DN50)' },
  { value: '3"', label: '3" (DN80)' },
  { value: '4"', label: '4" (DN100)' },
  { value: '6"', label: '6" (DN150)' },
  { value: '8"', label: '8" (DN200)' },
  { value: 'other', label: 'Other' },
  { value: 'not-sure', label: 'Not Sure' },
];

export const PRESSURE_CLASS_OPTIONS = [
  { value: 'Class 150', label: 'Class 150' },
  { value: 'Class 300', label: 'Class 300' },
  { value: 'Class 600', label: 'Class 600' },
  { value: 'Class 800', label: 'Class 800' },
  { value: 'Class 900', label: 'Class 900' },
  { value: 'Class 1500', label: 'Class 1500' },
  { value: 'other', label: 'Other' },
  { value: 'not-sure', label: 'Not Sure' },
];

export const MATERIAL_OPTIONS = [
  { value: 'Carbon Steel', label: 'Carbon Steel' },
  { value: 'Stainless Steel (SS304)', label: 'Stainless Steel (SS304)' },
  { value: 'Stainless Steel (SS316)', label: 'Stainless Steel (SS316)' },
  { value: 'Duplex Stainless Steel', label: 'Duplex Stainless Steel' },
  { value: 'Alloy Steel', label: 'Alloy Steel' },
  { value: 'other', label: 'Other' },
  { value: 'not-sure', label: 'Not Sure' },
];

export const END_CONNECTION_OPTIONS = [
  { value: 'Flanged (RF)', label: 'Flanged (RF)' },
  { value: 'Flanged (RTJ)', label: 'Flanged (RTJ)' },
  { value: 'Threaded (NPT)', label: 'Threaded (NPT)' },
  { value: 'Socket Weld', label: 'Socket Weld' },
  { value: 'Butt Weld', label: 'Butt Weld' },
  { value: 'other', label: 'Other' },
  { value: 'not-sure', label: 'Not Sure' },
];

export const APPLICATION_MEDIA_OPTIONS = [
  { value: 'Water', label: 'Water' },
  { value: 'Steam', label: 'Steam' },
  { value: 'Oil', label: 'Oil' },
  { value: 'Natural Gas', label: 'Natural Gas' },
  { value: 'Chemical / Acids', label: 'Chemical / Acids' },
  { value: 'Slurry', label: 'Slurry' },
  { value: 'other', label: 'Other' },
  { value: 'not-sure', label: 'Not Sure' },
];

export const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+60', country: 'MY', flag: '🇲🇾' },
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
];

export const COUNTRIES = [
  'Australia', 'Bahrain', 'Brazil', 'Canada', 'China', 'Egypt',
  'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan',
  'Kuwait', 'Malaysia', 'Netherlands', 'Nigeria', 'Norway', 'Oman',
  'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea',
  'Spain', 'Thailand', 'Turkey', 'UAE', 'United Kingdom', 'United States',
  'Other',
];

export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export const ACCEPTED_FILE_EXTENSIONS = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png';

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
