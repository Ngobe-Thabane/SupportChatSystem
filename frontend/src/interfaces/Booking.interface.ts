export interface Booking{
    seats:Array<string>,    
}

export interface BookingModalProps {
  isOpen: boolean;
  cinemaName: string;
  selectedCount: number;
  onConfirm: () => void;
  onClose: () => void;
}
