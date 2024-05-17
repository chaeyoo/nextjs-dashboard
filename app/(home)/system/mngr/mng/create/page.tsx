import Breadcrumbs from '@/app/ui/breadcrumbs';
import MngrCreateForm from '@/app/ui/system/mngr/create-form';
import { Breadcrumb } from 'antd';

export default function MngrMngCreatePage() {
  return (
    <>
      <div className="mx-20">
        <Breadcrumbs
          breadcrumbs={[
            { label: '계정관리', href: '/system/mngr/mng' },
            {
              label: '계정생성',
              href: '/dashboard/invoices/create',
              active: true,
            },
          ]}
        />
      </div>
      <MngrCreateForm />
    </>
  );
}
