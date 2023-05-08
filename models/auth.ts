export interface LoginRequest {
  email: string;
  password: string;
}

export interface ErrorValidations {
  errors: object;
}

export interface StateModel {
  isSuccess: boolean;
  isValidationError: boolean;
}

export interface LoginErrorResponse {
  email: string;
  password: string;
}

export interface UserData {
  data: {
    id: string;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    birth_date: Date | null;
    birth_place: string;
    nik: string;
    npwp: string;
    mother_name: string;
    gender: Gender;
    address: string;
    subdistrict: Subdistrict | null;
    occupation_id: string;
    company_name: string;
    company_address: string | null;
    company_subdistrict: Subdistrict | null;
    line_of_business_id: string;
    job_title_id: string;
    gross_income_id: string;
    income_free_text: string;
    source_of_fund_id: string;
    source_of_fund_free_text: string;
  };
}

export interface Gender {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Subdistrict {
  id: string;
  district_id: string;
  code: string;
  name: string;
  postal_code: string;
  status: boolean;
  tsv: string;
  district: District;
}

export interface District {
  id: string;
  city: City;
  code: string;
  name: string;
  status: boolean;
}

export interface City {
  id: string;
  code: string;
  name: string;
  status: boolean;
  mapping_name: string;
  type: Int16Array;
  province: Province;
}

export interface Province {
  id: string;
  city: Object;
  code: string;
  name: string;
  status: boolean;
  cirt_mapping: string;
  cirt_mapping_name: string;
  type: Int16Array;
  country: Country;
}

export interface Country {
  id: string;
  city: Object;
  code: string;
  name: string;
  status: boolean;
  mapping_name: string;
  is_high_risk_country: string;
  type: Int16Array;
  min_phone_digit: Int16Array;
  max_phone_digit: Int16Array;
}

export interface UserLanding {
  need_update_phone: boolean;
  need_update_email: boolean;
  need_update_bank: boolean;
  need_update_personal_data: boolean;
  need_update_home_address: boolean;
  need_update_employment: boolean;
  need_update_additional_information: boolean;
}

export interface GenderModel {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface GenderResponse {
  status: boolean;
  data: GenderModel[];
}

export interface ApiResponse {
  status: boolean;
  data: any[];
}

export interface SubdistrictResponse {
  id: string;
  zipcode: string;
  sub_district: string;
  district: string;
  city: string;
  province: string;
  tsv: string;
  q: string;
}

export interface HomeAddressPayload {
  address: string;
  subdistrict_id: string;
}

export interface Occupations {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  free_text: boolean;
  fill_relation_data: boolean;
  is_government_employee: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sort: string;
}

export interface LineOfBusiness {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  free_text: boolean;
  fill_relation_data: boolean;
  is_government_employee: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sort: string;
}

export interface JobTitle {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  free_text: boolean;
  fill_relation_data: boolean;
  is_government_employee: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sort: string;
}

export interface SourceOfFund {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  free_text: boolean;
  fill_relation_data: boolean;
  is_government_employee: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sort: string;
}

export interface Income {
  id: string;
  name: {
    id: string;
    en: string;
  };
  mapping_name: string;
  free_text: boolean;
  min_value: number;
  max_value: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface EmploymentPayload {
  occupation_id: string;
  company_name: string;
  company_address: string;
  company_subdistrict_id: string;
  line_of_business_id: string;
  job_title_id: string;
  source_of_fund_id: string;
  source_of_fund_free_text: string;
  gross_income_free_text: string;
  gross_income_id: string;
}

export const InitUserData = <UserData>{data: {
  id: "",
  name: "",
  email: "",
  email_verified_at: "",
  created_at: "",
  updated_at: "",
  birth_date:  null,
  birth_place: "",
  nik: "",
  npwp: "",
  mother_name: "",
  gender: {} as Gender,
  address: "",
  subdistrict: null,
  occupation_id: "",
  company_name: "",
  company_address: "",
  company_subdistrict: null,
  line_of_business_id: "",
  job_title_id: "",
  gross_income_id: "",
  income_free_text: "",
  source_of_fund_id: "",
  source_of_fund_free_text: "",
}}

// let person: IPerson | Record<string, never> = {};