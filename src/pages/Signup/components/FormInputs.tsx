import React from 'react';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { HelpText } from '@twilio-paste/core/help-text';

export interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  helpText?: string;
  readonly?: boolean;
}

export const EmailAddressInput: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  helpText,
  readonly = false,
}) => (
  <>
    <Label htmlFor="email_address">Email address</Label>
    <Input
      aria-describedby="email_help_text"
      id="email_address"
      name="email_address"
      type="email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required
      readOnly={readonly}
      autoFocus
    />
    {helpText && (
      <HelpText variant="error" id="email_help_text">
        {helpText}
      </HelpText>
    )}
  </>
);

export const CodeInput: React.FC<InputProps> = ({ value, onChange, onBlur, helpText }) => (
  <>
    <Label htmlFor="code">Verification code</Label>
    <Input
      aria-describedby="code_help_text"
      id="code"
      name="code"
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required
      autoComplete="off"
      autoFocus
    />
    {helpText && (
      <HelpText variant="error" id="code_help_text">
        {helpText}
      </HelpText>
    )}
  </>
);

export const PasswordInput: React.FC<InputProps> = (props) => (
  <>
    <Label htmlFor="password">Password</Label>
    <Input
      aria-describedby="password_help_text"
      id="password"
      name="password"
      type="password"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      required
      autoFocus
    />
    <HelpText variant={props.helpText ? 'error' : 'default'} id="password_help_text">
      {props.helpText ? props.helpText : 'Password must be at least 10 characters.'}
    </HelpText>
  </>
);
