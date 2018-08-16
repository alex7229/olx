import { InsertWriteOpResult } from "mongodb";
import { parsePrivatApi } from "../application/parsers/parsePrivatApi";
import { updateCurrencyRate } from "../application/updateCurrencyRate";
import { addCurrencyRateQueryFactory } from "./database/queries/currencyRates/addCurrencyRateQueryFactory";
import { fetchFactory } from "./network/utils/fetchFactory";
import { validatePrivatApiFactory } from "./validators/validatePrivatApiFactory";

export type UpdateCurrencyRateFactory = () => Promise<InsertWriteOpResult>;

export const updateCurrencyRateFactory: UpdateCurrencyRateFactory = () =>
  updateCurrencyRate(
    fetchFactory,
    validatePrivatApiFactory,
    parsePrivatApi,
    addCurrencyRateQueryFactory
  );
