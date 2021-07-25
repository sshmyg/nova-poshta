export type RequestProps<RequestData = unknown> = RequestData & {
  modelName: string;
  calledMethod: string;
};

export interface MethodPropertiesWrapper<Data = unknown> {
  methodProperties: Data;
}

export interface ResponseProps<ResponseData> {
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

type PayerType = 'Sender' | 'Recipient';

interface BackwardDeliveryProps {
  PayerType: PayerType;
  CargoType: 'Documents' | 'Money' | 'CreditDocuments';
  RedeliveryString: string;
  Services?: {
    Attorney: boolean;
    WaybillNewPostWithStamp: boolean;
    UserActions: 'UserCallSender';
  };
}

export interface CreateTtnRequest {
  PayerType: PayerType;
  PaymentMethod: 'Cash';
  DateTime: string;
  CargoType: 'Cargo' | 'Parcel';
  VolumeGeneral: string;
  Weight: string;
  ServiceType: 'WarehouseWarehouse';
  SeatsAmount: string;
  Description: string;
  Cost: string;
  CitySender: string;
  Sender: string;
  SenderAddress: string;
  ContactSender: string;
  SendersPhone: string;
  CityRecipient: string;
  Recipient: string;
  RecipientAddress: string;
  ContactRecipient: string;
  RecipientsPhone: string;
  BackwardDeliveryData?: BackwardDeliveryProps[];
}

export interface CreateTtnResponse {
  Ref: string;
  CostOnSite: number;
  EstimatedDeliveryDate: string;
  IntDocNumber: string;
  TypeDocument: 'InternetDocument';
}
