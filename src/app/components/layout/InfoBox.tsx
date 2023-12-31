type InfoBoxProps = {
  text: string,
  color: string
}

export default function InfoBox(props: InfoBoxProps) {
  return (
    <h2 className={`text-center bg-${props.color}-200 p-4 rounded-lg border-4 border-${props.color}-400 text-${props.color}-800`}>
      {props.text}
    </h2>
  )
}