import { Card } from '@twilio-paste/core/card';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';

interface FormCardProps {
  heading: string;
  children: React.ReactElement;
}

export const FormCard = ({ heading, children }: FormCardProps) => (
  <Box display="flex" justifyContent="center">
    <Box width="500px" marginY="space200" marginX="space50" boxShadow="shadow">
      <Card padding="space90">
        <Heading as="h1" variant="heading30">
          {heading}
        </Heading>
        {children}
      </Card>
    </Box>
  </Box>
);
