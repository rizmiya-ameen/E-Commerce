

const FormWrap = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-fit">
      <div>
        {children}
      </div>
    </div>
  )
}

export default FormWrap