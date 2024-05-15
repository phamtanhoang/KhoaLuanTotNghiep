interface TrasactionModel {
  id: string;
  invoice_id: string;
  created: Date;
  updated: Date;
  fromDate: Date;
  toDate: Date;
  price: number;
  vip: VipModel;
  employer: EmployerModel;
}
