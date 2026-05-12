import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { Download } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const Resume = () => {
  const [pageRatio, setPageRatio] = useState(0.773)
  const [pageWidth, setPageWidth] = useState(560)

  const updatePageWidth = useCallback(() => {
    const resumeWindow = document.getElementById('resume')
    const header = resumeWindow?.querySelector('#window-header')
    const windowTop = resumeWindow?.getBoundingClientRect().top ?? 64
    const headerHeight = header?.getBoundingClientRect().height ?? 48
    const bottomClearance = 124
    const horizontalClearance = 48

    const availableHeight =
      window.innerHeight - windowTop - headerHeight - bottomClearance
    const availableWidth = window.innerWidth - horizontalClearance * 2
    const widthFromHeight = Math.max(1, availableHeight * pageRatio)

    setPageWidth(Math.min(620, availableWidth, widthFromHeight))
  }, [pageRatio])

  useEffect(() => {
    const initialMeasurement = requestAnimationFrame(updatePageWidth)
    window.addEventListener('resize', updatePageWidth)

    return () => {
      cancelAnimationFrame(initialMeasurement)
      window.removeEventListener('resize', updatePageWidth)
    }
  }, [updatePageWidth])

  const handleLoadSuccess = async (pdf) => {
    const firstPage = await pdf.getPage(1)
    const viewport = firstPage.getViewport({ scale: 1 })

    setPageRatio(viewport.width / viewport.height)
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="files/sean_hoenderdos_may26.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <Document
        className="resume-document"
        file="files/sean_hoenderdos_may26.pdf"
        onLoadSuccess={handleLoadSuccess}
      >
        <Page
          pageNumber={1}
          width={pageWidth}
          renderTextLayer
          renderAnnotationLayer
        />
      </Document>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow
