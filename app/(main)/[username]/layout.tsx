import { getUserByUsername } from '@/actions/user/get-by-username';
import UserLayoutHeader from './_components/header';
import UserLayoutNavbar from './_components/navbar';
import { getRulesByUsername } from '@/actions/rules/get-by-username';

type UserLayoutProps = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export default async function UserLayout({ children, params }: Readonly<UserLayoutProps>) {
  const username = params.username || '';
  const user = await getUserByUsername(username);
  const rules = await getRulesByUsername(username);

  return (
    <div className='w-full flex flex-col gap-y-2'>
      {!user || user.Settings[0].modder_type === 'visitor' ? (
        <div className='flex items-center justify-center h-[80dvh]'>
          <h1 className='text-2xl'>User Not Found!</h1>
        </div>
      ) : (
        <>
          <div>
            <UserLayoutHeader user={user} rules={rules} />
            <UserLayoutNavbar username={username} />
          </div>
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
