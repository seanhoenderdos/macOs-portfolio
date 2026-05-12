import { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const MobileResume = () => {
  const containerRef = useRef(null)
  const [pageWidth, setPageWidth] = useState(320)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const updateWidth = () => {
      setPageWidth(Math.min(container.clientWidth, 720))
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="mobile-resume" ref={containerRef}>
      <a href="/files/sean_hoenderdos_may26.pdf" download>
        <Download size={18} />
        Download
      </a>

      <Document file="/files/sean_hoenderdos_may26.pdf">
        <Page
          pageNumber={1}
          width={pageWidth}
          renderTextLayer
          renderAnnotationLayer
        />
      </Document>
    </div>
  )
}

export default MobileResume
