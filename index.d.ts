export type PdfSettings = {
    "margin-top"?: number,
    "margin-right"?: number,
    "margin-left"?: number,
    "margin-bottom"?: number,
    format?: string
}

export type PdfData = {
    html?: string
    background?: string,
    settings?: PdfSettings,
}

type CreatePdfResult = {
    pdf: string // Base64
}

declare module 'easyPdf' {
    const easyPdf: {
        create: (
            data: PdfData,
            cb?: (result: CreatePdfResult) => void
        ) => Promise<CreatePdfResult>

        /**
         * Download the generated pdf (browser only)
         * @param {String} filename The file name to save as (defaults to 'sample.pdf')
         * @param {String} pdf The base64 PDF string gotten from running create
         */
        download: (filename?: string, pdf?: string) => void

        /**
         * Render the generated pdf (browser only)
         * @param elementId The ID of the element to render the PDF in
         * @param pdf The base64 PDF string gotten from running create
         * @param cb Callback function that is called when rendering is complete
         */
        render: (elementId: string, pdf?: string, cb?: () => void) => void
    }

    export = easyPdf
}
