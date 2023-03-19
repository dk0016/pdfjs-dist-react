import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import PdfViewer from "./PdfViewer";

const PdfUrlViewer = (props: any) => {
  const { url, scale, overallPage, ...others } = props;
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const pdfRef = useRef<any>();

  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    const loadingTask: any = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      (pdf: any) => {
        pdfRef.current = pdf;

        setItemCount(pdf._pdfInfo.numPages);

        // Fetch the first page
        const pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page: any) {
          //   console.log(itemCount);
          console.log(page);
        });
      },
      (reason: any) => {
        // PDF loading error
        console.error(reason);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleGetPdfPage = useCallback((index: number) => {
    overallPage(pdfRef.current.numPages);
    return pdfRef.current.getPage(index + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PdfViewer
      {...others}
      itemCount={itemCount}
      scale={scale}
      getPdfPage={handleGetPdfPage}
    />
  );
};

PdfUrlViewer.propTypes = {
  overallPage: PropTypes.any.isRequired,
  scale: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  windowRef: PropTypes.any.isRequired,
};

export default PdfUrlViewer;
