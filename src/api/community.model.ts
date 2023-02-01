import { BaseNFTModel } from "./api.model";
import { AutSocial, DefaultSocials } from "./social.model";

export interface Role {
  roleName: string;
  id: number;
}
export interface RoleSet {
  roleSetName: string;
  roles: Role[];
}

export class CommunityProperties {
  market: number | string;

  rolesSets: RoleSet[];

  socials: AutSocial[];

  commitment: number;

  constructor(data: CommunityProperties) {
    if (!data) {
      this.rolesSets = [];
      this.socials = DefaultSocials;
    } else {
      this.market = data.market;
      this.commitment = data.commitment;
      this.rolesSets = data.rolesSets;
      this.socials = data.socials;
    }
  }
}

export class Community extends BaseNFTModel<CommunityProperties> {
  constructor(data: Community = {} as Community) {
    super(data);
    this.properties = new CommunityProperties(data.properties);
  }
}

export const DefaultRoles: Role[] = [
  {
    id: 4,
    roleName: "Core Team"
  },
  {
    id: 5,
    roleName: "Advisor"
  },
  {
    id: 6,
    roleName: "Investor"
  }
];
