import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import CreateNewShorten from './CreateNewShorten';

type ShortenPopUpProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void;
};

const ShortenPopUp: React.FC<ShortenPopUpProps> = ({ open, setOpen, refetch }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex justify-center items-center h-full w-full">
                <CreateNewShorten setOpen={setOpen} refetch={refetch} />
            </div>
        </Modal>
    );
};

export default ShortenPopUp;
