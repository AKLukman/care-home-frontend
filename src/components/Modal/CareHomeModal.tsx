type CareHomeModalProps = {
    open: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
};

const CareHomeModal = ( { open, title, onClose, children }: CareHomeModalProps ) => {
    if ( !open ) return null;

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box w-full h-full max-w-none rounded-none p-0">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-base-100 border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold uppercase">{title}</h3>
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>
        </dialog>
    );
};

export default CareHomeModal;

