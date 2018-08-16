import * as Ajv from "ajv";
import { PrivatApiResponse } from "../../application/parsers/parsePrivatApi";
import { validatePrivatApi } from "../../application/validators/validatePrivatApi";

export type ValidatePrivatApiFactory = (response: any) => boolean;

export const validatePrivatApiFactory: ValidatePrivatApiFactory = (
  response
): response is PrivatApiResponse => validatePrivatApi(response, Ajv);
