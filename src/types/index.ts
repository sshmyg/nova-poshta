export type Request<RequestData = unknown> = RequestData & {
  modelName: string;
  calledMethod: string;
};

export interface Response<ResponseData> {
  success: boolean;
  data: ResponseData;
  errors: any[];
  warnings: any[];
  info: {
    totalCount: number;
  };
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
}

export interface NovaPoshtaProps {
  apiKey: string;
}

export interface CreatePersonProps {
  CounterpartyRef: string;
  FirstName: string;
  LastName: string;
  Phone: string;
}

export interface Counterparty {
  Description: string;
  Ref: string;
  City: string;
  Counterparty: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  CounterpartyFullName: string;
  OwnershipFormRef: string;
  OwnershipFormDescription: string;
  EDRPOU: string;
  CounterpartyType: string;
  TrustedCounterpartyType: string;
  CityDescription: string;
}

export interface ContactPerson {
  Description: string;
  Phones: string;
  Email: string;
  Ref: string;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  MarketplacePartnerDescription: string;
}

export interface NewContactPerson {
  Ref: string;
  Description: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Counterparty: string;
  OwnershipForm: string;
  OwnershipFormDescription: string;
  EDRPOU: string;
  CounterpartyType: string;
  ContactPerson: {
    success: boolean;
    data: Pick<
      ContactPerson,
      'Description' | 'Ref' | 'LastName' | 'FirstName' | 'MiddleName'
    >[];
    errors: any[];
    warnings: any[];
    info: any[];
  };
}
