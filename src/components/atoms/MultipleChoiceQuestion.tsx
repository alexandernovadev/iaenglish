import React from 'react';

interface MultipleChoiceQuestionProps {
  title: string;
  options: string[];
  onChange: (selected: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ title, options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(so => so !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <div>
        {options.map(option => (
          <label key={option} className="block mb-2">
            <input type="checkbox" value={option} onChange={() => handleOptionChange(option)} className="mr-2" />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
