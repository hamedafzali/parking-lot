//Action Types
export const SYSTEM_INITIALED = "systemInitialed";
export const TICKET_ISSUED = "ticketIssued";

//actions
export const systemInitialed = (data) => ({
  type: SYSTEM_INITIALED,
  payload: data,
});
export const ticketIssued = (data) => ({
  type: TICKET_ISSUED,
  payload: data,
});
//reducers
export default function parkingReducer(state = [], action) {
  switch (action.type) {
    case SYSTEM_INITIALED:
      return [...action.payload];
    case TICKET_ISSUED:
      return state
        .slice(0, action.payload.index)
        .concat(action.payload.value)
        .concat(state.slice(action.payload.index + 1, state.length));
    default:
      return state;
  }
}
