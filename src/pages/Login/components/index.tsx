import React from 'react';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';

export interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const EmailInput: React.FC<InputProps> = ({ value, onChange }) => (
  <>
    <Label htmlFor="email">Email</Label>
    <Input
      aria-describedby="email_help_text"
      id="email"
      name="email"
      type="text"
      value={value}
      onChange={onChange}
      required
      autoFocus
    />
  </>
);

export const PasswordInput: React.FC<InputProps> = ({ value, onChange }) => (
  <>
    <Label htmlFor="password">Password</Label>
    <Input
      aria-describedby="password_help_text"
      id="password"
      name="password"
      type="password"
      value={value}
      onChange={onChange}
      required
    />
  </>
);
