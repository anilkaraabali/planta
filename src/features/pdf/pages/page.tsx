import { DynamicTranslationKey, PageProps } from '@/types';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

import { PdfReader } from '../components/PdfReader';

interface PdfPageProps extends PageProps {
  fileName: string;
  title: string;
}

const PdfPage: NextPage<PdfPageProps> = ({ fileName, title }) => {
  const t = useTranslations('Footer');

  return (
    <main>
      <h1 className='page-title text-center'>
        {t(title as DynamicTranslationKey)}
      </h1>
      <PdfReader fileName={fileName} />
    </main>
  );
};

export default PdfPage;
export type { PdfPageProps };
