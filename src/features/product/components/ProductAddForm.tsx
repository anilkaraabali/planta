import {
  Alert,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Form,
  Input,
  addToast,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface FormData {
  coverImage: string;
  expectedHumidity: string;
  name: string;
  type: string;
  weeklyWaterNeed: string;
}

interface ProductAddFormProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ProductAddForm: FC<ProductAddFormProps> = ({ isOpen, onOpenChange }) => {
  const t = useTranslations('Product');

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const schema: ZodType<FormData> = z.object({
    coverImage: z.string().min(1, { message: t('form.required') }),
    expectedHumidity: z.string().min(1, { message: t('form.required') }),

    name: z.string().min(1, { message: t('form.required') }),
    type: z.string().min(1, { message: t('form.required') }),
    weeklyWaterNeed: z.string().min(1, { message: t('form.required') }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      coverImage: '',
      expectedHumidity: '',
      name: '',
      type: '',
      weeklyWaterNeed: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/product/add', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await response.json();

    if (!response.ok) {
      setErrorMessage(result.error);
    } else {
      onOpenChange();
      addToast({
        color: 'success',
        description: t('addForm.success.description'),
        shouldShowTimeoutProgress: true,
        timeout: 3000,
        title: t('addForm.success.title'),
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className='flex flex-col gap-1'>
              {t('addForm.title')}
            </DrawerHeader>
            <DrawerBody>
              <p className='text-sm text-gray-500'>
                {t('addForm.description')}
              </p>
              {errorMessage && <Alert color='danger' title={errorMessage} />}
              <Form
                className='gap-4'
                onSubmit={handleSubmit(onSubmit)}
                validationBehavior='aria'
              >
                <Controller
                  control={control}
                  name='name'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name?.message}
                      isRequired
                      label={t('addForm.name.label')}
                      placeholder={t('addForm.name.placeholder')}
                      size='md'
                      type='text'
                      variant='flat'
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='type'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.type?.message}
                      isInvalid={!!errors.type?.message}
                      isRequired
                      label={t('addForm.type.label')}
                      placeholder={t('addForm.type.placeholder')}
                      size='md'
                      type='text'
                      variant='flat'
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='coverImage'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.coverImage?.message}
                      isInvalid={!!errors.coverImage?.message}
                      isRequired
                      label={t('addForm.coverImage.label')}
                      placeholder={t('addForm.coverImage.placeholder')}
                      size='md'
                      type='text'
                      variant='flat'
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='expectedHumidity'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.expectedHumidity?.message}
                      isInvalid={!!errors.expectedHumidity?.message}
                      isRequired
                      label={t('addForm.expectedHumidity.label')}
                      placeholder={t('addForm.expectedHumidity.placeholder')}
                      size='md'
                      type='text'
                      variant='flat'
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='weeklyWaterNeed'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.weeklyWaterNeed?.message}
                      isInvalid={!!errors.weeklyWaterNeed?.message}
                      isRequired
                      label={t('addForm.weeklyWaterNeed.label')}
                      placeholder={t('addForm.weeklyWaterNeed.placeholder')}
                      size='md'
                      type='text'
                      variant='flat'
                    />
                  )}
                />
                <Button color='primary' type='submit'>
                  {t('cta.add')}
                </Button>
              </Form>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export { ProductAddForm };
export type { ProductAddFormProps };
