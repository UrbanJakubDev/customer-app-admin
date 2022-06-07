// Typescript interface for customer
export interface ICustomer {
  id: number
  created_at?: Date
  updated_at?: Date
  ico: string
  name: string
  is_archived: boolean
  products_count?: number
  purchases_count?: number
}

export interface ICustomerForm {
   ico: string
   name: string
   is_archived: boolean
}

export interface ITrader {
   id: number
   created_at?: Date
   updated_at?: Date
   licence_num: string
   subject_name: string
   is_archived: boolean
   is_active: boolean
}

export interface IProduct {
  id: number
  created_at: Date
  updated_at: Date
  ico: string
  year: number
  pc: boolean
  pq: number
  pm: number
  ps: number
  pc_ratio: number
  pq_ratio: number
  pm_ratio: number
  ps_ratio: number
  tamnt: number
  purgastype: number
  note: string
  trader: string
  tolerance: number
  customer_id: number
  trader_id: number
  is_archived: boolean
  customer: ICustomer
}

export interface IProductForm {
   ico: string
   year: number
   pc: boolean
   pq: number
   pm: number
   ps: number
   pc_ratio: number
   pq_ratio: number
   pm_ratio: number
   ps_ratio: number
   tamnt: number
   purgastype: number
   note: string
   trader: string
   tolerance: number
   customer_id: number
   trader_id: number
   is_archived: boolean
}

export interface Purchase {
  id: number
  created_at: Date
  updated_at: Date
  ico: string
  year: number
  currency: number
  pcq: number
  pcp: number
  pq1q?: any
  pq1p?: any
  pq2q?: any
  pq2p?: any
  pq3q?: any
  pq3p?: any
  pq4q?: any
  pq4p?: any
  pm1q?: any
  pm1p?: any
  pm2q?: any
  pm2p?: any
  pm3q?: any
  pm3p?: any
  pm4q?: any
  pm4p?: any
  pm5q?: any
  pm5p?: any
  pm6q?: any
  pm6p?: any
  pm7q?: any
  pm7p?: any
  pm8q?: any
  pm8p?: any
  pm9q?: any
  pm9p?: any
  pm10q?: any
  pm10p?: any
  pm11q?: any
  pm11p?: any
  pm12q?: any
  pm12p?: any
  note?: any
  cal_pur_date: string
  q1_pur_date?: any
  q2_pur_date?: any
  q3_pur_date?: any
  q4_pur_date?: any
  m1_pur_date?: any
  m2_pur_date?: any
  m3_pur_date?: any
  m4_pur_date?: any
  m5_pur_date?: any
  m6_pur_date?: any
  m7_pur_date?: any
  m8_pur_date?: any
  m9_pur_date?: any
  m10_pur_date?: any
  m11_pur_date?: any
  m12_pur_date?: any
  spot_m1: number
  spot_m2: number
  spot_m3: number
  spot_m4: number
  spot_m5: number
  spot_m6: number
  spot_m7: number
  spot_m8: number
  spot_m9: number
  spot_m10: number
  spot_m11: number
  spot_m12: number
  spot_m1_value: number
  spot_m2_value: number
  spot_m3_value: number
  spot_m4_value: number
  spot_m5_value: number
  spot_m6_value: number
  spot_m7_value: number
  spot_m8_value: number
  spot_m9_value: number
  spot_m10_value: number
  spot_m11_value: number
  spot_m12_value: number
  customer_id: number
  is_archived: boolean
  customer: ICustomer
}
