import { ParseAdvertisementId } from "./parseAdvertisementId";
import { IAdvertisementPageRaw } from "./parseAdvertisementPage";
import { ParseUserLink } from "./parseUserLink";

// user is undefined if adv. is inactive
// userId is undefined if profile is private
export interface IAdvertisementDetails {
  active: boolean;
  id: number;
  user?: {
    id?: string;
    name: string;
    phoneToken: string;
  };
}

export type ParseAdvertisementDetails = (
  adv: IAdvertisementPageRaw,
  parseAdvertisementId: ParseAdvertisementId,
  parseUserLink: ParseUserLink
) => IAdvertisementDetails;

export const parseAdvertisementDetails: ParseAdvertisementDetails = (
  advertisement,
  parseAdvertisementId,
  parseUserLink
) => {
  const advDetails: IAdvertisementDetails = {
    active: advertisement.active,
    id: parseAdvertisementId(advertisement.advertisementIdText)
  };
  if (advertisement.user) {
    advDetails.user = {
      name: advertisement.user.name.replace(/[\n\t ]/g, ""),
      phoneToken: advertisement.user.phoneToken
    };
    if (advertisement.user.link) {
      advDetails.user.id = parseUserLink(advertisement.user.link);
    }
  }
  return advDetails;
};
