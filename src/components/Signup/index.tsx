import React from 'react';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { HelpText } from '@twilio-paste/core/help-text';

export interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMessage: string;
  value: string;
}

export const EmailAddressInput: React.FC<InputProps> = (props) => (
  <>
    <Label htmlFor="email_address" required>
      Email address
    </Label>
    <Input
      aria-describedby="email_help_text"
      id="email_address"
      name="email_address"
      type="email"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      required
    />
    {props.errorMessage && (
      <HelpText variant="error" id="email_help_text">
        {props.errorMessage}
      </HelpText>
    )}
  </>
);

export const PasswordInput: React.FC<InputProps> = (props) => (
  <>
    <Label htmlFor="password" required>
      Password
    </Label>
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
    <HelpText
      variant={props.errorMessage ? 'error' : 'default'}
      id="password_help_text"
    >
      {props.errorMessage
        ? props.errorMessage
        : 'Password must be at least 10 characters.'}
    </HelpText>
  </>
);

export const UsernameInput: React.FC<InputProps> = (props) => (
  <>
    <Label htmlFor="username" required>
      Username
    </Label>
    <Input
      aria-describedby="username_help_text"
      id="username"
      name="username"
      type="text"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      required
    />
    {props.errorMessage && (
      <HelpText variant="error" id="username_help_text">
        {props.errorMessage}
      </HelpText>
    )}
  </>
);
