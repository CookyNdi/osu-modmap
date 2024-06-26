'use server';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export const deleteRules = async (rulesId: string) => {
  try {
    const session = await getSession();
    if (!session) return redirect('/auth');

    await db.rules.delete({ where: { id: rulesId, userId: session.user.id } });
    return { success: 'Rules Has Been Deleted' };
  } catch (error) {
    console.log(error);
    console.log('deleteRules ISSUE');
    return { error: 'Internal server error!' };
  }
};
