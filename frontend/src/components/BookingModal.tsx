import type { BookingModalProps } from "../interfaces/Booking.interface";

export default async function BookingModal({confirmBooking}:{confirmBooking:BookingModalProps}){

  if (!confirmBooking.isOpen) return null;

  return (
    <>
      <input type="checkbox" className="modal-toggle" checked readOnly />
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Your Booking</h3>
          <p className="py-4">
            You're booking {confirmBooking.selectedCount} seat{confirmBooking.selectedCount > 1 ? 's' : ''} at {confirmBooking.cinemaName}.
          </p>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={confirmBooking.onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={confirmBooking.onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
