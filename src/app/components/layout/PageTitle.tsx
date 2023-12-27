type PageTitleProps = {
  title: string
}

export default function PageTitle(props: PageTitleProps) {
  return (
    <h1 className="text-center text-primary text-4xl">{props.title}</h1>
  )
}