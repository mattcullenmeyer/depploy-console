import React from 'react';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { HelpText } from '@twilio-paste/core/help-text';
import { Anchor, Button } from '@twilio-paste/core';

export interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  errorMessage?: string;
  readonly?: boolean;
}

export const EmailAddressInput: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  errorMessage,
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
    />
    {errorMessage && (
      <HelpText variant="error" id="email_help_text">
        {errorMessage}
      </HelpText>
    )}
  </>
);

export const CodeInput: React.FC<InputProps> = ({ value, onChange }) => (
  <>
    <Label htmlFor="code">Verification code</Label>
    <Input
      aria-describedby="code_help_text"
      id="code"
      name="code"
      type="text"
      value={value}
      onChange={onChange}
      required
    />
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
    />
    <HelpText variant={props.errorMessage ? 'error' : 'default'} id="password_help_text">
      {props.errorMessage ? props.errorMessage : 'Password must be at least 10 characters.'}
    </HelpText>
  </>
);

// export const UsernameInput: React.FC<InputProps> = (props) => (
//   <>
//     <Label htmlFor="username">Username</Label>
//     <Input
//       aria-describedby="username_help_text"
//       id="username"
//       name="username"
//       type="text"
//       value={props.value}
//       onChange={props.onChange}
//       onBlur={props.onBlur}
//       required
//     />
//     <HelpText variant={props.errorMessage ? 'error' : 'default'} id="username_help_text">
//       {props.errorMessage
//         ? props.errorMessage
//         : 'Username may only contain alphanumeric characters.'}
//     </HelpText>
//   </>
// );
