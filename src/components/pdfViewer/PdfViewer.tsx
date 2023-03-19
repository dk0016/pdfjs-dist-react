import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { VariableSizeList } from "react-window";
import useResizeObserver from "use-resize-observer";

import Page from "./Page";
import PdfPage from "./PdfPage";

const PdfViewer = (props: any) => {
  const { width, height, itemCount, getPdfPage, scale, gap, windowRef } = props;
  const [pages, setPages] = useState([]);

  const listRef: any = useRef();

  const {
    ref,
    width: internalWidth = 400,
    height: internalHeight = 600,
  } = useResizeObserver();

  const fetchPage = useCallback(
    (index: any) => {
      if (!pages[index]) {
        getPdfPage(index).then((page: any) => {
          setPages((prev) => {
            const next: any = [...prev];
            next[index] = page;
            return next;
          });
          listRef.current.resetAfterIndex(index);
        });
      }
    },
    [getPdfPage, pages]
  );

  const handleItemSize = useCallback(
    (index: any) => {
      const page: any = pages[index];
      if (page) {
        const viewport = page.getViewport({ scale });
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return viewport.height + gap;
      }
      return 50;
    },
    [pages, scale, gap]
  );

  const handleListRef = useCallback(
    (elem: any) => {
      listRef.current = elem;
      if (windowRef) {
        windowRef.current = elem;
      }
    },
    [windowRef]
  );

  useEffect(() => {
    listRef.current.resetAfterIndex(0);
  }, [scale]);

  const style = {
    border: "1px solid #ccc",
    height,
    width,
  };

  return (
    <div ref={ref} style={style}>
      <VariableSizeList
        ref={handleListRef}
        width={internalWidth}
        height={internalHeight}
        itemCount={itemCount}
        itemSize={handleItemSize}
      >
        {({ index, style }: any) => {
          fetchPage(index);
          return (
            <Page style={style}>
              <PdfPage page={pages[index]} scale={scale} />
            </Page>
          );
        }}
      </VariableSizeList>
    </div>
  );
};

PdfViewer.propTypes = {
  gap: PropTypes.number,
  getPdfPage: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemCount: PropTypes.number.isRequired,
  scale: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  windowRef: PropTypes.object,
};

PdfViewer.defaultProps = {
  gap: 40,
  height: "700px",
  scale: 1,
  width: "100%",
};

export default PdfViewer;
