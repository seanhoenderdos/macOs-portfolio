import useMobileStore from '#store/mobile'

const MobileFilePreview = () => {
  const file = useMobileStore((state) => state.file)

  if (!file) return null

  return (
    <div className="mobile-preview">
      <img src={file.imageUrl} alt={file.name} />
    </div>
  )
}

export default MobileFilePreview
