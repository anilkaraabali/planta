import { Alert, Button, Form, InputOtp, Link } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LiaArrowLeftSolid } from 'react-icons/lia';
import { useCountdown } from 'usehooks-ts';
import { ZodType, z } from 'zod';

interface FormData {
  otp: string;
}

interface AuthConfirmProps {
  email: string;
  onBack: () => void;
}

const OTP_LENGTH = 6;

const AuthConfirm: FC<AuthConfirmProps> = ({ email, onBack }) => {
  const t = useTranslations();
  const router = useRouter();

  const [count, { resetCountdown, startCountdown }] = useCountdown({
    countStart: 120,
  });

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const schema: ZodType<FormData> = z.object({
    otp: z
      .string()
      .min(OTP_LENGTH, { message: t('Common.form.required') })
      .max(OTP_LENGTH, { message: t('Common.form.required') })
      .regex(/^\d+$/, { message: t('Common.form.otp.errorMessage') }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(schema),
  });

  const handleOtpChange = (otp: string) => {
    if (otp.length === OTP_LENGTH) {
      handleSubmit(handleOtpSubmit)();
    }
  };

  const handleOtpSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/auth/confirm', {
        body: JSON.stringify({ email, otp: formData.otp }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error confirming OTP:', error);
    }
  };

  const resendOtp = async () => {
    resetCountdown();
    startCountdown();

    try {
      const response = await fetch('/api/auth/confirm', {
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error resending OTP:', error);
    }
  };

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return (
    <>
      <Button
        isIconOnly
        onPress={onBack}
        radius='full'
        size='sm'
        variant='faded'
      >
        <LiaArrowLeftSolid />
      </Button>
      <h1 className='text-center text-4xl font-bold'>
        {t('Auth.confirm.title')}
      </h1>
      <p className='text-default-500'>{t('Auth.confirm.description')}</p>
      {!!errorMessage && <Alert color='danger' title={errorMessage} />}

      <Form onSubmit={handleSubmit(handleOtpSubmit)} validationBehavior='aria'>
        <Controller
          control={control}
          name='otp'
          render={({ field }) => (
            <InputOtp
              {...field}
              description={t('Common.form.otp.placeholder')}
              errorMessage={errors.otp?.message}
              isInvalid={!!errors.otp?.message}
              isRequired
              length={OTP_LENGTH}
              onChange={(e) => {
                field.onChange(e);
                handleOtpChange((e.target as HTMLInputElement).value);
              }}
              size='lg'
              type='number'
              variant='faded'
            />
          )}
        />
      </Form>
      <div className='mt-4 flex items-center gap-1'>
        <p className='w-[200px] text-xs'>
          {t('Auth.confirm.resendIn', { time: count })}
        </p>
        <Link
          className='text-xs'
          isDisabled={count !== 0}
          onPress={resendOtp}
          size='sm'
          underline='always'
        >
          {t('Auth.confirm.resend')}
        </Link>
      </div>
    </>
  );
};

export { AuthConfirm };
