import { BaseNFTModel } from "./api.model";

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

  commitment: number;

  constructor(data: CommunityProperties) {
    if (!data) {
      this.rolesSets = [];
    } else {
      this.market = data.market;
      this.commitment = data.commitment;
      this.rolesSets = data.rolesSets;
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
