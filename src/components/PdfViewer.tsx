import React from 'react';
import '../assets/styles/PdfViewer.scss';

interface PdfViewerProps {
    src: string;
    title?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ src, title }) => {
    // Construct full URL for PDF
    const pdfUrl = src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src.startsWith('/') ? src.slice(1) : src}`;

    return (
        <div className="pdf-viewer-container">
            {title && <h3 className="pdf-title">{title}</h3>}
            <div className="pdf-viewer-wrapper">
                <iframe
                    src={pdfUrl}
                    title={title || 'PDF Document'}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                />
            </div>
        </div>
    );
};

export default PdfViewer;
