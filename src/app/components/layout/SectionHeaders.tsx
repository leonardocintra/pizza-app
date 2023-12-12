type SectionHeadersProps = {
  subHeader: string;
  mainHeader: string;
};

export default function SectionHeaders(props: SectionHeadersProps) {
  return (
    <div className="text-center mb-4">
      <h3 className="uppercase text-gray-600 font-semibold leading-4">
        {props.mainHeader}
      </h3>

      <h2 className="text-primary font-bold text-4xl italic">
        {props.subHeader}
      </h2>
    </div>
  );
}
