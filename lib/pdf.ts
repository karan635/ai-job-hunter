import PDFParser from "pdf2json";

export function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError",
        (errData: Error | { parserError: Error }) => {
            if ("parserError" in errData) {
                reject(errData.parserError);
            } else {
                reject(errData);
            }
        }
);

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      for (const page of pdfData.Pages) {
        for (const txt of page.Texts) {
          for (const run of txt.R) {
            try {
                text += decodeURIComponent(run.T) + " ";
            } catch {
                text += run.T + " ";
            }
          }
        }
        text += "\n";
      }

      resolve(text.trim());
    });

    pdfParser.parseBuffer(buffer);
  });
}