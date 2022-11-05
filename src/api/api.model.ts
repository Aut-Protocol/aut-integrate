export class BaseNFTModel<Properties> {
  name: string;

  description: string;

  image: string;

  properties: Properties;

  constructor(data: BaseNFTModel<Properties>) {
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.properties = data.properties;
  }
}
