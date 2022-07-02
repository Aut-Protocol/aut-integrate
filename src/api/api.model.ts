import { TokenInput } from 'nft.storage/dist/src/lib/interface';

export class BaseNFTModel<Properties> implements Omit<TokenInput, 'image'> {
  name: string;

  description: string;

  image: File | string;

  properties: Properties;

  constructor(data: BaseNFTModel<Properties>) {
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.properties = data.properties;
  }
}
