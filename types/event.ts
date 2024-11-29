export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface EventType {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  ticketTypes: TicketType[];
}