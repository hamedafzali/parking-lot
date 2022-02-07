//Action Types
export const SYSTEM_INITIALED = "systemInitialed";
export const TICKET_ISSUED = "ticketIssued";
export const TICKET_SELECTED = "ticketSelected";

//actions
export const systemInitialed = (data) => ({
  type: SYSTEM_INITIALED,
  payload: data,
});
export const ticketIssued = (data) => ({
  type: TICKET_ISSUED,
  payload: data,
});
export const ticketSelected = (data) => ({
  type: TICKET_SELECTED,
  payload: data,
});

//reducers
export default function parkingReducer(state = [], action) {
  switch (action.type) {
    case SYSTEM_INITIALED:
      return [...action.payload];
    case TICKET_ISSUED:
      return state.map((i) =>
        i.no === action.payload.no
          ? { ...i, ticketNumber: action.payload.ticketNumber, selected: true }
          : { ...i, selected: false }
      );
    case TICKET_SELECTED:
      return state.map((i) =>
        i.no === action.payload
          ? { ...i, selected: true }
          : { ...i, selected: false }
      );

    default:
      return state;
  }
}
