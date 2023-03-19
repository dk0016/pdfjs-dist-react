import { useRef, useState } from "react";
import PdfUrlViewer from "./components/pdfViewer/PdfUrlViewer";
import "./style/App.css";
import SampelPdf from "./assets/documents/sample.pdf";
const App = () => {
  const windowRef = useRef<any>();
  // const [scale, setScale] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const overallPage = (totalPage: number) => {
    setTotal(totalPage);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        marginBottom: "30px",
        overflowX: "hidden",
      }}
    >
      <h1 style={{ color: "black" }}>{total}</h1>
      <div
        id="check"
        style={{
          border: "1px solid black",
          minHeight: "300px",
          height: "100%",
          width: "70%",
          overflowX: "hidden",
        }}
      >
        <PdfUrlViewer
          overallPage={overallPage}
          scale={1}
          url={SampelPdf}
          windowRef={windowRef}
        />
      </div>
    </div>
  );
};

export default App;
