import { makeRequest } from './helpers';
import {
  NovaPoshtaProps,
  CreatePersonProps,
  Counterparty,
  ContactPerson,
  NewContactPerson,
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

    return makeRequest<Counterparty[], typeof req>(this.props.apiKey, req);
  }

  async getCounterpartyContactPersons(CounterpartyRef: string) {
    const req = {
      modelName: 'Counterparty',
      calledMethod: 'getCounterpartyContactPersons',
      methodProperties: {
        Ref: CounterpartyRef,
      },
    };

    return makeRequest<ContactPerson[], typeof req>(this.props.apiKey, req);
  }

  async createContactPerson(methodProperties: CreatePersonProps) {
    const req = {
      modelName: 'ContactPerson',
      calledMethod: 'save',
      methodProperties,
    };

    return makeRequest<NewContactPerson[], typeof req>(this.props.apiKey, req);
  }

  async createTtn() {
    const senderCounterparties = await this.getCounterparties('Sender');
    const senderCounterpartiesContactPersons =
      await this.getCounterpartyContactPersons(
        senderCounterparties.data[0].Ref
      );
    const recipientCounterparties = await this.getCounterparties('Recipient');

    // Find contact person among existing (this step could be skipped and just create new one)
    const recipientCounterpartiesContactPersons =
      await this.getCounterpartyContactPersons(
        recipientCounterparties.data[0].Ref
      );

    // Or create new contact person
    const newContactPerson = await this.createContactPerson({
      CounterpartyRef: recipientCounterparties.data[0].Ref,
      FirstName: 'Test',
      LastName: 'Test 2',
      Phone: '380971234567',
    });

    const data = {
      Sender: senderCounterparties.data[0].Ref,
      SenderFirstName: senderCounterpartiesContactPersons.data[0].FirstName,
      SenderLastName: senderCounterpartiesContactPersons.data[0].LastName,
      SendersPhone: senderCounterpartiesContactPersons.data[0].Phones,
      ContactSender: senderCounterpartiesContactPersons.data[0].Ref,

      Recipient: recipientCounterparties.data[0].Ref,
      ContactRecipient: newContactPerson.data[0].Ref,
    };
  }
}
