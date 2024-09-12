interface HighLightTextProps {
  text: string;
  size: string;
  type: string;
}

const HighLightText: React.FC<HighLightTextProps> = ({ text, size, type }) => {
  return (
    <span className={`font-${type} text-customPurple ${size}`}>{text}</span>
  );
};

export default HighLightText;
