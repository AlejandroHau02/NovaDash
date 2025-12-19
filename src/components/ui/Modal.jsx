import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {

    //cerrar con ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content*/}
            <div className="card relative z-10 w-full max-w-md mx-4 animate-in zoom-in-95 fade-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[var(--text-main)]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-[var(--bg-body)] text-[var(--text-muted)] transition-colors"
                    >

                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                {children}
            </div>
        </div>
    );
};

export default Modal;