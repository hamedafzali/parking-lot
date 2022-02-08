//Action Types
export const SYSTEM_INITIALED = "systemInitialed";
export const TICKET_ISSUED = "ticketIssued";
export const TICKET_SELECTED = "ticketSelected";
export const TICKET_SETTLED = "ticketSettled";

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
export const ticketSettled = (data) => ({
  type: TICKET_SETTLED,
  payload: data,
});
//reducers
export default function parkingReducer(
  state = { parkingMap: [], ticket: [] },
  action
) {
  switch (action.type) {
    case SYSTEM_INITIALED:
      return { ticket: [], parkingMap: action.payload };
    case TICKET_ISSUED:
      return { ...state, ticket: [...state.ticket, action.payload] };

    case TICKET_SELECTED:
      return {
        ...state,
        parkingMap: state.parkingMap.map((i) =>
          i.no === action.payload
            ? { ...i, selected: true }
            : { ...i, selected: false }
        ),
      };
    case TICKET_SETTLED:
      return {
        ...state,
        ticket: state.ticket.map((i) =>
          i.no === action.payload.no ? { ...i, ...action.payload } : i
        ),
      };

    default:
      return state;
  }
}
