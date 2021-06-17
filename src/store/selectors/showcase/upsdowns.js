import { createSelector } from "@reduxjs/toolkit";

export const upsdownsData = createSelector(
    state => state,
    state => state.showcase.upsdowns.data
)

export const ups = createSelector(upsdownsData, data => data?.quoteResponse?.result.filter(item => item.regularMarketChangePercent > 0))
export const downs = createSelector(upsdownsData, data => data?.quoteResponse?.result.filter(item => item.regularMarketChangePercent < 0))