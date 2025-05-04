import { CircularProgress } from '@heroui/react';
import { list, throttle } from 'radash';
import { FC, useCallback, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

interface PdfReaderProps {
  fileName: string;
}

const PdfReader: FC<PdfReaderProps> = ({ fileName }) => {
  const [numPages, setNumPages] = useState<null | number>(null);
  const [initialWidth, setInitialWidth] = useState<number | undefined>(
    undefined
  );

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  useEffect(() => {
    const listener = () => {
      const element = document.querySelector('#main');

      setInitialWidth(element?.getBoundingClientRect().width);
    };

    window.addEventListener('resize', throttle({ interval: 500 }, listener));
    listener();

    return () => {
      window.removeEventListener(
        'resize',
        throttle({ interval: 500 }, listener)
      );
    };
  }, []);

  const PageWrapper = useCallback<React.FC<{ pageNumber: number }>>(
    ({ pageNumber }) => (
      <Page pageNumber={pageNumber + 1} width={initialWidth} />
    ),
    [initialWidth]
  );

  return (
    <Document
      className='flex flex-col items-center'
      file={fileName}
      loading={<CircularProgress size='lg' />}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {numPages &&
        list(numPages - 1).map((pageNumber) => (
          <PageWrapper key={`page_${pageNumber}`} pageNumber={pageNumber} />
        ))}
    </Document>
  );
};

export type { PdfReaderProps };
export { PdfReader };
