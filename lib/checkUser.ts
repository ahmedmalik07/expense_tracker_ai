import { currentUser } from '@clerk/nextjs/server';


import {db} from './db';

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Try to find user by Clerk user ID
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  // Create new user if not found
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses?.[0]?.emailAddress || '',
     
    },
  });

  return newUser;
};