import { ErrorObject } from "ajv";
import { PrivatApiResponse } from "../parsers/parsePrivatApi";

interface IAjv {
  new (): {
    validate: (schema: object, data: any) => boolean | PromiseLike<any>;
    errors?: ErrorObject[];
  };
}

export type ValidatePrivatApi = (response: any, Ajv: IAjv) => boolean;

export const validatePrivatApi: ValidatePrivatApi = (
  response: any,
  Ajv: IAjv
): response is PrivatApiResponse => {
  const ajv = new Ajv();
  const stringNumber = {
    pattern: "^\\d+.?\\d*$",
    type: "string"
  };
  const schema = {
    items: {
      additionalProperties: false,
      properties: {
        base_ccy: {
          type: "string"
        },
        buy: stringNumber,
        ccy: {
          type: "string"
        },
        sale: stringNumber
      },
      type: "object"
    },
    type: "array"
  };
  ajv.validate(schema, response);
  return !ajv.errors;
};
