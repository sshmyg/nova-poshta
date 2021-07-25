import { makeRequest } from './helpers';
import {
  NovaPoshtaProps,
  CreatePersonProps,
  Counterparty,
  ContactPerson,
  NewContactPerson,
  CreateTtnRequest,
  CreateTtnResponse,
  MethodPropertiesWrapper,
} from './types';

export class NovaPoshta {
  props: NovaPoshtaProps;

  constructor(props: NovaPoshtaProps) {
    this.props = props;
  }

  async getCounterparties(CounterpartyProperty: 'Sender' | 'Recipient') {
    const req = {
      modelName: 'Counterparty',
      calledMethod: 'getCounterparties',
      methodProperties: {
        CounterpartyProperty,
      },
    };

    type RequestData = MethodPropertiesWrapper<{
      CounterpartyProperty: 'Sender' | 'Recipient';
    }>;

    return makeRequest<Counterparty[], RequestData>(this.props.apiKey, req);
  }

  async getCounterpartyContactPersons(CounterpartyRef: string) {
    const req = {
      modelName: 'Counterparty',
      calledMethod: 'getCounterpartyContactPersons',
      methodProperties: {
        Ref: CounterpartyRef,
      },
    };

    type RequestData = MethodPropertiesWrapper<{
      Ref: string;
    }>;

    return makeRequest<ContactPerson[], RequestData>(this.props.apiKey, req);
  }

  async createContactPerson(methodProperties: CreatePersonProps) {
    const req = {
      modelName: 'ContactPerson',
      calledMethod: 'save',
      methodProperties,
    };

    return makeRequest<
      NewContactPerson[],
      MethodPropertiesWrapper<CreatePersonProps>
    >(this.props.apiKey, req);
  }

  async createTtn() {
    const req = {
      modelName: 'InternetDocument',
      calledMethod: 'save',
      methodProperties: {
        PayerType: 'Recipient' as const,
        PaymentMethod: 'Cash' as const,
        DateTime: '28.11.2020',
        CargoType: 'Parcel' as const,
        ServiceType: 'WarehouseWarehouse' as const,
        SeatsAmount: '1',
        Description: 'Іграшки',

        Cost: '436',
        VolumeGeneral: '0.007986',
        Weight: '2',

        CitySender: 'db5c88d0-391c-11dd-90d9-001a92567626',
        Sender: 'db5c88d0-391c-11dd-90d9-001a92567626',
        SendersPhone: '380971234567',
        ContactSender: '1692286e-e1c2-11e3-8c4a-0050568002cf',
        SenderAddress: '1692286e-e1c2-11e3-8c4a-0050568002cf',

        Recipient: 'db5c88d0-391c-11dd-90d9-001a92567626',
        ContactRecipient: 'db5c88d0-391c-11dd-90d9-001a92567626',
        CityRecipient: '74f00b52-b7b6-11e9-8c22-005056b24375',
        RecipientAddress: 'f0062d37-cfed-11e9-b0c5-005056b24375',
        RecipientsPhone: '380971234567',

        BackwardDeliveryData: [
          {
            PayerType: 'Recipient' as const,
            CargoType: 'Money' as const,
            RedeliveryString: '436',
          },
        ],
      },
    };

    return makeRequest<
      CreateTtnResponse,
      MethodPropertiesWrapper<CreateTtnRequest>
    >(this.props.apiKey, req);
  }

  private async getSenderData() {
    const senderCounterparties = await this.getCounterparties('Sender');
    const senderCounterpartiesContactPersons =
      await this.getCounterpartyContactPersons(
        senderCounterparties.data[0].Ref
      );

    return {
      Sender: senderCounterparties.data[0].Ref,
      SenderFirstName: senderCounterpartiesContactPersons.data[0].FirstName,
      SenderLastName: senderCounterpartiesContactPersons.data[0].LastName,
      SendersPhone: senderCounterpartiesContactPersons.data[0].Phones,
      ContactSender: senderCounterpartiesContactPersons.data[0].Ref,
    };
  }

  private async getRecipientData() {
    const recipientCounterparties = await this.getCounterparties('Recipient');

    // Find contact person among existing (this step could be skipped and just create new one)
    /* const recipientCounterpartiesContactPersons =
      await this.getCounterpartyContactPersons(
        recipientCounterparties.data[0].Ref
      ); */

    // Or create new contact person
    const newContactPerson = await this.createContactPerson({
      CounterpartyRef: recipientCounterparties.data[0].Ref,
      FirstName: 'Test',
      LastName: 'Test 2',
      Phone: '380971234567',
    });

    return {
      Recipient: recipientCounterparties.data[0].Ref,
      ContactRecipient: newContactPerson.data[0].Ref,
    };
  }
}
