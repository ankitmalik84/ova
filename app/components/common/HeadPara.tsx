import HighLightText from "@/app/components/common/HighLightText";

interface HeadParaProps {
  title: string;
  description?: string;
  highlightIndex?: number;
  leading?: string;
}

const HeadPara: React.FC<HeadParaProps> = ({
  title,
  description,
  highlightIndex = -1,
  leading,
}) => {
  const words = title.split(" ");

  return (
    <div className={`w-full mx-auto flex flex-col ${description && "my-16"} `}>
      <h1
        className={`text-3xl sm:text-4xl Xl:text-[4vh] font-bold ${leading || ""} text-white`}
      >
        {words.map((word, index) =>
          index === highlightIndex ? (
            <HighLightText
              key={word + index}
              text={word + " "}
              size="text-4xl Xl:text-[4vh] Xl:leading-[7vh]"
              type="bold"
            />
          ) : (
            <span key={word + index}>{word} </span>
          )
        )}
      </h1>
      {description && (
        <p className="mt-4 sm:mt-8 text-white opacity-75 text-md leading-6 sm:leading-7">
          {description}
        </p>
      )}
    </div>
  );
};

export default HeadPara;
