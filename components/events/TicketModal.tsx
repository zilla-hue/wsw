'use client';

import { useState } from 'react';
import { EventType, TicketType } from '@/types/event';

interface TicketModalProps {
  event: EventType;
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketModal({ event, isOpen, onClose }: TicketModalProps) {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, quantity),
    }));
  };

  const calculateTotal = () => {
    return event.ticketTypes.reduce((total, ticket) => {
      return total + (ticket.price * (selectedTickets[ticket.id] || 0));
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with payment processor
    console.log('Processing ticket purchase:', {
      event,
      tickets: selectedTickets,
      total: calculateTotal(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-brand-dark border border-brand-gold/20 rounded-lg max-w-md w-full p-6">
        <h3 className="text-2xl font-semibold text-brand-gold mb-4">{event.title}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {event.ticketTypes.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{ticket.name}</h4>
                <p className="text-gray-400">${ticket.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                  className="text-brand-gold px-2 py-1"
                >
                  -
                </button>
                <span className="text-white w-8 text-center">
                  {selectedTickets[ticket.id] || 0}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                  className="text-brand-gold px-2 py-1"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="border-t border-brand-gold/20 pt-4">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span className="text-white">Total:</span>
              <span className="text-brand-gold">${calculateTotal()}</span>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-brand-gold/20 text-brand-gold rounded-md hover:bg-brand-gold/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-brand-teal text-white rounded-md hover:bg-brand-teal-light transition-colors"
              >
                Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}