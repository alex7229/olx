import { ErrorObject } from "ajv";
import { PrivatApiResponse } from "../parsers/parsePrivatApi";

interface IAjv {
  new (): {
    validate: (schema: object, data: unknown) => void;
    errors?: ErrorObject[];
  };
}

export type ValidatePrivatApi = (
  response: unknown,
  Ajv: IAjv
) => response is PrivatApiResponse;

export const validatePrivatApi: ValidatePrivatApi = (
  response: unknown,
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
