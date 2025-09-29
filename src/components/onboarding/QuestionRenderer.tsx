import React from 'react';
import OptionGroup from './OptionGroup';
import DropdownSelect from './DropdownSelect';
import AddList from './AddList';

type Question = {
  id: string;
  type?: 'chat' | 'dropdown' | 'options' | 'addlist';
  text: string;
  options?: string[];
  placeholder?: string;
};

type Props = {
  question: Question;
  value?: string;
  onChange?: (v: string) => void;
  onSelectNext?: () => void;
};

export default function QuestionRenderer({ question, value, onChange, onSelectNext }: Props) {
  switch (question.type) {
    case 'dropdown':
      return <DropdownSelect options={question.options || []} value={value} onChange={onChange} onSelectNext={onSelectNext} />;
    case 'options':
      return <OptionGroup options={question.options || []} onSelect={onChange || (() => {})} selected={value} />;
    case 'addlist':
      return <AddList items={value ? (value.split('|') || []) : []} onChange={(items) => onChange?.(items.join('|'))} />;
    default:
      return <div className="mt-2"><div className="bg-white/10 text-white px-6 py-3 rounded-md">{question.text}</div></div>;
  }
}
