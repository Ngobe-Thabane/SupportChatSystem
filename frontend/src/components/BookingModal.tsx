import React from 'react';

interface BookingModalProps {
  isOpen: boolean;
  cinemaName: string;
  selectedCount: number;
  onConfirm: () => void;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  cinemaName,
  selectedCount,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <input type="checkbox" className="modal-toggle" checked readOnly />
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Your Booking</h3>
          <p className="py-4">
            You're booking {selectedCount} seat{selectedCount > 1 ? 's' : ''} at {cinemaName}.
          </p>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
