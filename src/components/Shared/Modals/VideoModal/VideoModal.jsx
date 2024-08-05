import React from 'react';
import './videoModal.css';

const VideoModal = ({ isOpen, onClose, content }) => {
    if (!isOpen || !content) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {content.type === 'video' ? (
                    <div className="video-container">
                        <iframe
                            width="560"
                            height="315"
                            src={content.src}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div>
                        <h2>{content.title}</h2>
                        <p>{content.description}</p>
                    </div>
                )}
                <button onClick={onClose} className="btn-close">
                    Close
                </button>
            </div>
        </div>
    );
};

export default VideoModal;