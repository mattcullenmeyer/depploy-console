import React from 'react';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';

export interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

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
      required
    />
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
      required
    />
  </>
);
