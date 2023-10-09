import Confirmation from "../../components/Confirmation";

interface JoinMeetingConfirmation {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onOk: () => void;
}

const JoinMeetingConfirmation = ({ isOpen, loading, onClose, onOk }: JoinMeetingConfirmation) => {
  return (
    <Confirmation
      onOk={onOk}
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      title="Join Meeting"
      description="Are you sure to join meeting?"
    />
  );
};

export default JoinMeetingConfirmation;
