export interface AutSocial {
  type: string;
  link: string;
}

export const socialUrls = {
  ens: {
    prefix: "",
    placeholder: ""
  },
  twitter: {
    prefix: "",
    placeholder: ""
  },
  github: {
    prefix: "",
    placeholder: ""
  }
};

export const DefaultSocials: AutSocial[] = [
  {
    type: "ens",
    link: ""
  },
  {
    type: "twitter",
    link: ""
  },
  {
    type: "github",
    link: ""
  }
];
