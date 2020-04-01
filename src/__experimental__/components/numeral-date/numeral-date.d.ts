import * as React from 'react';

export interface NumeralDateProps {
  defaultValue?: object;
  dateFormat?: array<string>;
  errorMessage?: string;
  errorPresent?: boolean;
  placeholder: string;
  value?: object;
  id?: string;
  name?: string;
  onBlur?: () => void;
  onChange?: () => void;
}
declare const NumeralDate: React.ComponentType<NumeralDateProps>;
export default NumeralDate;