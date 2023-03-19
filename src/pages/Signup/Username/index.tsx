import React, { useEffect } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Stack } from '@twilio-paste/core/stack';
import { Separator } from '@twilio-paste/core/separator';
import { Paragraph } from '@twilio-paste/core/paragraph';
// import { UsernameInput } from '../../../components/Signup';
import { Button } from '@twilio-paste/core/button';
import { Toaster, useToaster } from '@twilio-paste/core/toast';
import { words } from '../words';

export interface SignupUsernameProps {
  username: string;
  usernameErrorMessage: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUsernameBlur: () => {};
  onFormSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  isDisabled: boolean;
  isSuccess: boolean;
}

export function SignupUsername(props: SignupUsernameProps): React.ReactElement {
  const toaster = useToaster();

  useEffect(() => {
    if (props.isSuccess) {
      toaster.push({
        message: words.CreateUsername.successMessage,
        variant: 'success',
        dismissAfter: 4000,
      });
    }
  }, [props.isSuccess]);

  return (
    <>
      <Toaster {...toaster} />
      <Box display="flex" justifyContent="center">
        <Box width="480px" marginY="space200">
          <Card padding="space90">
            <Heading as="h1" variant="heading30">
              Choose a username
            </Heading>
            <Stack orientation="vertical" spacing="space70">
              <Separator orientation="horizontal" />
              <Paragraph>
                Choose a username for your account. You can always change it later if you want.
              </Paragraph>
              {/* <UsernameInput
                value={props.username}
                onChange={props.onUsernameChange}
                onBlur={props.onUsernameBlur}
                errorMessage={props.usernameErrorMessage}
              /> */}
              <Button
                variant="primary"
                onClick={props.onFormSubmit}
                loading={props.isLoading}
                disabled={props.isDisabled}
                fullWidth
              >
                Assign username
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
}
