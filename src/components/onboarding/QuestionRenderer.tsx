import React from 'react';
import OptionGroup from './OptionGroup';
import DropdownSelect from './DropdownSelect';
import AddList from './AddList';
import CurrencyInput from './CurrencyInput';
import CalendarPicker from './CalendarPicker';

type Question = {
  id: string;
  type?: 'chat' | 'dropdown' | 'options' | 'addlist' | 'currency' | 'calendar';
  text: string;
  options?: string[];
  placeholder?: string;
};

type Props = {
  question: Question;
  value?: string;
  onChange?: (v: string) => void;
  onSelectNext?: (v: string) => void;
};

export default function QuestionRenderer({ question, value, onChange, onSelectNext }: Props) {
  switch (question.type) {
    case 'dropdown':
      return <DropdownSelect options={question.options || []} value={value} onChange={onChange} onSelectNext={onSelectNext} />;
    
    case 'options':
      return <OptionGroup options={question.options || []} onSelect={onChange || (() => {})} selected={value} />;
    
    case 'addlist':
      return <AddList items={value ? (value.split('|') || []) : []} onChange={(items) => onChange?.(items.join('|'))} />;
    
    case 'currency':
      return <CurrencyInput value={value} onChange={onChange} placeholder={question.placeholder} />;
    
    case 'calendar':
      return <CalendarPicker value={value} onChange={onChange} />;
    
    default:
      return <div className="mt-2"><div className="bg-white/10 text-white px-6 py-3 rounded-md">{question.text}</div></div>;
  }
}