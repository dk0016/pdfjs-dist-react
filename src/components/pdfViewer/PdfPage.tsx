import "./Page.css";

import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import React, { useEffect, useRef } from "react";

const PdfPage = (props: any) => {
  const { page, scale } = props;

  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const canvasRef = useRef<any>();

  const textLayerRef = useRef<any>();

  useEffect(() => {
    if (!page) {
      return;
    }

    const viewport = page.getViewport({ scale });

    // Prepare canvas using PDF page dimensions
    const canvas: any = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      const renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        // console.log("Page rendered");
      });

      page.getTextContent().then((textContent: any) => {
        // console.log(textContent);
        if (!textLayerRef.current) {
          return;
        }

        // Pass the data to the method for rendering of text over the pdf canvas.
        pdfjsWorker.renderTextLayer({
          container: textLayerRef.current,
          textContentSource: textContent,
          textDivs: [],
          viewport: viewport,
        });
      });
    }
  }, [page, scale]);

  return (
    <div className="PdfPage">
      <canvas ref={canvasRef} />
      <div ref={textLayerRef} className="PdfPage__textLayer" />
    </div>
  );
};

export default PdfPage;
