interface DifferentTextProps {
  color: string;
  children: string;
}

const DifferentText: React.FC<DifferentTextProps> = ({ color, children }) => (
  <span className={`text-[${color}]`}>{children}</span>
);

export default DifferentText;
