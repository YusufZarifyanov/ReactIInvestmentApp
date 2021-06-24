import { createSelector } from "@reduxjs/toolkit";

export const upsDownsData = createSelector(
    state => state,
    state => state.securities.upsDowns?.finance?.result[0]?.quotes
)

export const ups = createSelector(upsDownsData, quotes => quotes?.filter(quote => quote.regularMarketChangePercent > 0))
export const downs = createSelector(upsDownsData, quotes => quotes?.filter(quote => quote.regularMarketChangePercent < 0))

